import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
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
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 20 }}>
      <Image
        source={{ uri: character?.data?.character?.image }}
        style={{ height: 300, width: '80%' }}
      />
      <Text style={{ fontWeight: '700', fontSize: 30, marginTop: 10 }}>
        {character?.data?.character?.name}
      </Text>
      <Text style={{ fontSize: 15, fontWeight: '700', marginVertical: 20 }}>
        Episodes in which {character?.data?.character?.name} appeared
      </Text>
      {character?.data?.character?.episode?.map((episodeData, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginLeft: 20,
            marginBottom: 20,
          }}>
          <View
            style={{
              borderRadius: 50,
              height: 10,
              width: 10,
              backgroundColor: 'black',
              marginRight: 10,
            }}
          />
          <Text>
            {episodeData?.name} ( {episodeData?.episode} )
          </Text>
        </View>
      ))}
    </ScrollView>
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
