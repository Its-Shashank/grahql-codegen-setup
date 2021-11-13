import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
  FlatListProps,
} from 'react-native';
import CharacterCard from '../../../components/CharacterCard';
import { useGetPaginatedCharactersQuery } from '../../../generated/graphql';
import { Character } from '../../../utils/types';

type Props = {
  navigation: StackNavigationProp<any>;
};
const CharacterList: FC<Props> = ({ navigation }: Props) => {
  const characters = useGetPaginatedCharactersQuery({
    variables: {
      page: 1,
    },
  });
  const scrollRef = useRef(null);
  const handleCharacterClick = (id: string) => {
    scrollRef.current?.scrollToIndex({
      animated: true,
      index: Math.floor(Number(id) / 2),
    });
    setTimeout(() => {
      navigation.navigate('Character', { id });
    }, 500);
  };
  // console.log({ characters: characters.data?.characters });
  return characters.loading ? (
    <ActivityIndicator size='large' />
  ) : (
    <FlatList
      data={characters?.data?.characters?.results}
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
        // justifyContent: 'space-between',
        marginTop: 10,
        // backgroundColor: 'red',
      }}
      columnWrapperStyle={{ justifyContent: 'space-evenly' }}
    />
  );
};
{
  /* {characters.data?.characters?.results?.map((char, idx) => (
        <CharacterDetails name={char?.name || ''} key={idx} />
      ))}
      {characters?.data?.characters?.results?.length === 0 && (
        <Text>No characters found!!</Text>
      )} */
}
export default CharacterList;
