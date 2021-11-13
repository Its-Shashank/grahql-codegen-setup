import { gql } from '@apollo/client';

export const GET_CHARACTER_DETAILS = gql`
  query getCharacterDetails($id: ID!) {
    character(id: $id) {
      name
      image
      episode {
        name
        episode
      }
    }
  }
`;
