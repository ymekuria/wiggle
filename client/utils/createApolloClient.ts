import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  ApolloLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '../hooks/useAuth0';

// add dynamic url for testing and production environments
const httpLink = new HttpLink({ uri: 'http://localhost:8088/graphql' });
const { accessToken } = useAuth0();

const getApolloClient = (accessToken: string | undefined) => {
  const authLink = setContext(async (_, { headers }) => {
    if (!accessToken) {
      return { headers };
    }
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`
      }
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authLink, httpLink)
  });
};
