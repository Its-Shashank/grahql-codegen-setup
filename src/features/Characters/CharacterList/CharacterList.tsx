import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useRef, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import CharacterCard from '../../../components/CharacterCard';
import { useGetPaginatedCharactersQuery } from '../../../generated/graphql';
import { Character } from '../../../utils/types';

type Props = {
  navigation: StackNavigationProp<any>;
};
const CharacterList: FC<Props> = ({ navigation }: Props) => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const { loading, fetchMore } = useGetPaginatedCharactersQuery({
    variables: {
      page,
    },
    onCompleted: data => {
      if (data?.characters?.results?.length !== 0) {
        const newArray = [...characters, ...data?.characters?.results];
        if (newArray.length > characters.length && characters.length > 0) {
          setTimeout(() => {
            scrollRef.current?.scrollToIndex({
              animated: true,
              index:
                Number(characters?.length) % 2 !== 0
                  ? Math.floor(Number(characters?.length) / 2)
                  : Math.floor(Number(characters?.length) / 2) - 1,
            });
          }, 500);
        }
        setCharacters(newArray);
      }
    },
    notifyOnNetworkStatusChange: true,
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

  return loading ? (
    <ActivityIndicator size='large' />
  ) : (
    <FlatList
      data={characters}
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
      keyExtractor={(item: Character) => item?.id?.toString()}
      numColumns={2}
      contentContainerStyle={{
        marginTop: 10,
      }}
      columnWrapperStyle={{ justifyContent: 'space-evenly' }}
      onEndReached={handleScrollEnd}
      onEndReachedThreshold={0}
    />
  );
};

export default CharacterList;
