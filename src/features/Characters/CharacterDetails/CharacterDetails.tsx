import React, { FC } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetCharacterDetailsQuery } from '../../../generated/graphql';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};
const CharacterDetails: FC<Props> = ({ navigation, route }: Props) => {
  const character = useGetCharacterDetailsQuery({
    variables: {
      id: route.params?.id,
    },
  });
  return character.loading ? (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size='large' />
    </View>
  ) : (
    <View>
      <Text>{character?.data?.character?.name}</Text>
    </View>
  );
};

export default CharacterDetails;

const styles = StyleSheet.create({
  card: {
    // height: 30,
    backgroundColor: 'white',
    // borderWidth: 1,
    // alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    borderRadius: 10,
  },
});
