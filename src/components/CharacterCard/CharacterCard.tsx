import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  id: string;
  name: string;
  species: string;
  image: ImageSourcePropType;
  handleCharacterClick: (id: string) => void;
};
const CharacterDetails: FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => props.handleCharacterClick(props.id)}
      style={styles.card}>
      <Image
        source={{ uri: props.image }}
        style={{ height: 100, width: 100 }}
      />
      <Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '700' }}>
        {props.name}
      </Text>
      <Text style={{ marginTop: 10, textAlign: 'center' }}>
        Species - {props.species}
      </Text>
      {/* <Text style={{ marginTop: 10, textAlign: 'center' }}>{props.name}</Text> */}
    </TouchableOpacity>
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
