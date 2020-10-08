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
const checkAuth = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: 'Bearer ' + accessToken
    }
  });
  return forward(operation);
});
// add dynamic url for testing and production environments
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(checkAuth, httpLink)
});
