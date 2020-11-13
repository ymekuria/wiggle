import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  ApolloLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// add dynamic url for testing and production environments
const httpLink = new HttpLink({ uri: 'http://localhost:8088/graphql' });

const createApolloClient = (accessToken: string | undefined) => {
  console.log('accessToken', accessToken);
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

export default createApolloClient;
