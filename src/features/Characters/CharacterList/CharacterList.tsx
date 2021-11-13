import React, { FC } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import CharacterCard from '../../../components/CharacterCard';
import { useGetPaginatedCharactersQuery } from '../../../generated/graphql';
import { Character } from '../../../utils/types';

type Props = {};
const CharacterList: FC<Props> = (props: Props) => {
  const characters = useGetPaginatedCharactersQuery({
    variables: {
      page: 1,
    },
  });
  // console.log({ characters: characters.data?.characters });
  return characters.loading ? (
    <ActivityIndicator size='large' />
  ) : (
    <FlatList
      data={characters?.data?.characters?.results}
      renderItem={({ item }) => (
        <CharacterCard
          name={item?.name || ''}
          image={item?.image}
          species={item?.species}
          id={item?.id}
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
