import { ImageSourcePropType } from 'react-native';

export interface Character {
  name: string;
  id: string;
  species: string;
  image: ImageSourcePropType;
}
