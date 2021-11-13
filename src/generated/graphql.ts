import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Character = {
  __typename?: 'Character';
  /** Time at which the character was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** Episodes in which this character appeared. */
  episode: Array<Maybe<Episode>>;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  gender?: Maybe<Scalars['String']>;
  /** The id of the character. */
  id?: Maybe<Scalars['ID']>;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: Maybe<Scalars['String']>;
  /** The character's last known location */
  location?: Maybe<Location>;
  /** The name of the character. */
  name?: Maybe<Scalars['String']>;
  /** The character's origin location */
  origin?: Maybe<Location>;
  /** The species of the character. */
  species?: Maybe<Scalars['String']>;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  status?: Maybe<Scalars['String']>;
  /** The type or subspecies of the character. */
  type?: Maybe<Scalars['String']>;
};

export type Characters = {
  __typename?: 'Characters';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Character>>>;
};

export type Episode = {
  __typename?: 'Episode';
  /** The air date of the episode. */
  air_date?: Maybe<Scalars['String']>;
  /** List of characters who have been seen in the episode. */
  characters: Array<Maybe<Character>>;
  /** Time at which the episode was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** The code of the episode. */
  episode?: Maybe<Scalars['String']>;
  /** The id of the episode. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the episode. */
  name?: Maybe<Scalars['String']>;
};

export type Episodes = {
  __typename?: 'Episodes';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Episode>>>;
};

export type FilterCharacter = {
  gender?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  species?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type FilterEpisode = {
  episode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type FilterLocation = {
  dimension?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Info = {
  __typename?: 'Info';
  /** The length of the response. */
  count?: Maybe<Scalars['Int']>;
  /** Number of the next page (if it exists) */
  next?: Maybe<Scalars['Int']>;
  /** The amount of pages. */
  pages?: Maybe<Scalars['Int']>;
  /** Number of the previous page (if it exists) */
  prev?: Maybe<Scalars['Int']>;
};

export type Location = {
  __typename?: 'Location';
  /** Time at which the location was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** The dimension in which the location is located. */
  dimension?: Maybe<Scalars['String']>;
  /** The id of the location. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the location. */
  name?: Maybe<Scalars['String']>;
  /** List of characters who have been last seen in the location. */
  residents: Array<Maybe<Character>>;
  /** The type of the location. */
  type?: Maybe<Scalars['String']>;
};

export type Locations = {
  __typename?: 'Locations';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Location>>>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a specific character by ID */
  character?: Maybe<Character>;
  /** Get the list of all characters */
  characters?: Maybe<Characters>;
  /** Get a list of characters selected by ids */
  charactersByIds?: Maybe<Array<Maybe<Character>>>;
  /** Get a specific episode by ID */
  episode?: Maybe<Episode>;
  /** Get the list of all episodes */
  episodes?: Maybe<Episodes>;
  /** Get a list of episodes selected by ids */
  episodesByIds?: Maybe<Array<Maybe<Episode>>>;
  /** Get a specific locations by ID */
  location?: Maybe<Location>;
  /** Get the list of all locations */
  locations?: Maybe<Locations>;
  /** Get a list of locations selected by ids */
  locationsByIds?: Maybe<Array<Maybe<Location>>>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID'];
};


export type QueryCharactersArgs = {
  filter?: Maybe<FilterCharacter>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryCharactersByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID'];
};


export type QueryEpisodesArgs = {
  filter?: Maybe<FilterEpisode>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryEpisodesByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryLocationArgs = {
  id: Scalars['ID'];
};


export type QueryLocationsArgs = {
  filter?: Maybe<FilterLocation>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars['ID']>;
};

export type GetCharacterDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCharacterDetailsQuery = { __typename?: 'Query', character?: { __typename?: 'Character', name?: string | null | undefined, image?: string | null | undefined, episode: Array<{ __typename?: 'Episode', name?: string | null | undefined, episode?: string | null | undefined } | null | undefined> } | null | undefined };

export type GetPaginatedCharactersQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterCharacter>;
}>;


export type GetPaginatedCharactersQuery = { __typename?: 'Query', characters?: { __typename?: 'Characters', results?: Array<{ __typename?: 'Character', id?: string | null | undefined, name?: string | null | undefined, species?: string | null | undefined, image?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };


export const GetCharacterDetailsDocument = gql`
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

/**
 * __useGetCharacterDetailsQuery__
 *
 * To run a query within a React component, call `useGetCharacterDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharacterDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharacterDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCharacterDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetCharacterDetailsQuery, GetCharacterDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCharacterDetailsQuery, GetCharacterDetailsQueryVariables>(GetCharacterDetailsDocument, options);
      }
export function useGetCharacterDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCharacterDetailsQuery, GetCharacterDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCharacterDetailsQuery, GetCharacterDetailsQueryVariables>(GetCharacterDetailsDocument, options);
        }
export type GetCharacterDetailsQueryHookResult = ReturnType<typeof useGetCharacterDetailsQuery>;
export type GetCharacterDetailsLazyQueryHookResult = ReturnType<typeof useGetCharacterDetailsLazyQuery>;
export type GetCharacterDetailsQueryResult = Apollo.QueryResult<GetCharacterDetailsQuery, GetCharacterDetailsQueryVariables>;
export const GetPaginatedCharactersDocument = gql`
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

/**
 * __useGetPaginatedCharactersQuery__
 *
 * To run a query within a React component, call `useGetPaginatedCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginatedCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginatedCharactersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPaginatedCharactersQuery(baseOptions?: Apollo.QueryHookOptions<GetPaginatedCharactersQuery, GetPaginatedCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaginatedCharactersQuery, GetPaginatedCharactersQueryVariables>(GetPaginatedCharactersDocument, options);
      }
export function useGetPaginatedCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginatedCharactersQuery, GetPaginatedCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaginatedCharactersQuery, GetPaginatedCharactersQueryVariables>(GetPaginatedCharactersDocument, options);
        }
export type GetPaginatedCharactersQueryHookResult = ReturnType<typeof useGetPaginatedCharactersQuery>;
export type GetPaginatedCharactersLazyQueryHookResult = ReturnType<typeof useGetPaginatedCharactersLazyQuery>;
export type GetPaginatedCharactersQueryResult = Apollo.QueryResult<GetPaginatedCharactersQuery, GetPaginatedCharactersQueryVariables>;