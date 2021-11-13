import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, TextInput } from 'react-native';
import { debounce } from 'lodash';
import CharacterCard from '../../../components/CharacterCard';
import { useGetPaginatedCharactersQuery } from '../../../generated/graphql';
import { Character } from '../../../utils/types';

type Props = {
  navigation: StackNavigationProp<any>;
};
const CharacterList: FC<Props> = ({ navigation }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchCharacters, setSearchCharacters] = useState<Character[]>([]);
  const [value, setValue] = useState<string>('');
  const { loading, fetchMore, refetch } = useGetPaginatedCharactersQuery({
    variables: {
      page,
    },
    onCompleted: data => {
      if (data?.characters?.results?.length !== 0) {
        if (value) {
          setSearchCharacters(data?.characters?.results);
          return;
        }
        const newArray = [...characters, ...data?.characters?.results];
        setSearchCharacters([]);
        setCharacters(newArray);
      }
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });
  const scrollRef = useRef(null);
  const handleCharacterClick = (id: string) => {
    scrollRef.current?.scrollToIndex({
      animated: true,
      index:
        Number(id) % 2 !== 0
          ? Math.floor(Number(id) / 2)
          : Math.floor(Number(id) / 2) - 1,
    });
    setTimeout(() => {
      navigation.navigate('Character', { id });
    }, 500);
  };

  const handleScrollEnd = () => {
    // refetch({ page: page + 1 });
    fetchMore({ variables: { page: page + 1 } });
    setPage(prev => prev + 1);
  };

  const handleSearch = useCallback(
    debounce(async text => {
      if (!text) {
        setValue('');
      } else {
        await refetch({ filter: { name: text } });
      }
    }, 500),
    [debounce]
  );

  const onSearch = (val: string) => {
    setValue(val);
    handleSearch(val);
  };

  return loading ? (
    <ActivityIndicator size='large' />
  ) : (
    <>
      <TextInput
        value={value}
        onChangeText={onSearch}
        style={{
          backgroundColor: 'white',
          marginHorizontal: 30,
          marginVertical: 10,
          height: 40,
          paddingHorizontal: 10,
        }}
        placeholder='Which character you wanna find here!!!'
      />
      <FlatList
        data={!value ? characters : searchCharacters}
        ref={scrollRef}
        renderItem={({ item }) => (
          <CharacterCard
            name={item?.name || ''}
            image={item?.image}
            species={item?.species}
            id={item?.id}
            handleCharacterClick={handleCharacterClick}
          />
        )}
        keyExtractor={(item: Character) => item?.id}
        numColumns={2}
        contentContainerStyle={{
          marginTop: 10,
        }}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        onEndReached={handleScrollEnd}
        onEndReachedThreshold={0}
      />
    </>
  );
};

export default CharacterList;
