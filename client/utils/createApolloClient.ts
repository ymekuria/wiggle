import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  ApolloLink
} from '@apollo/client';
import { useAuth0 } from '../hooks/useAuth0';
const httpLink = new HttpLink({ uri: 'http://localhost:8088/graphql' });
const { accessToken } = useAuth0();

const getApolloClient = (accessToken: string | undefined) => {};

// add dynamic url for testing and production environments
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(checkAuth, httpLink)
});
