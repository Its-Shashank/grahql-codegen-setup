import { gql } from '@apollo/client';

export const GET_PAGINATED_CHARACTERS = gql`
  query GetPaginatedCharacters($page: Int) {
    characters(page: $page){
      results {
        id
        name
        species
        image
      }
    }
  }
`;
