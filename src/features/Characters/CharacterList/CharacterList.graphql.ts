import { gql } from '@apollo/client';

export const GET_PAGINATED_CHARACTERS = gql`
  query GetPaginatedCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        species
        image
      }
    }
  }
`;
