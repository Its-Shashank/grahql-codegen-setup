import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
// import { truckDetails } from 'store/graphql/truckDetails';
// import { selectedTruck } from 'store/graphql/truckListing';
// import request from 'utils/request';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: 'https://rickandmortyapi.com/graphql' }),
});

export default apolloClient;
