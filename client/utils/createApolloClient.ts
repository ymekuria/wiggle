import { ApolloClient, InMemoryCache } from '@apollo/client';

// add dynamic url for testing and production environments
export const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});
