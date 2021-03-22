import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  ApolloLink
} from '@apollo/client';
import jwt_decode from 'jwt-decode';
import { setContext } from '@apollo/client/link/context';

// add dynamic url for testing and production environments
// must use current dev server ip adress instead of localhost to test on device
const httpLink = new HttpLink({ uri: 'http://192.168.1.71:8088/graphql' });

const createApolloClient = (accessToken: string | undefined) => {
  const currentTime = new Date().getTime() / 1000;
  if (accessToken) {
    const { exp } = jwt_decode(accessToken);
    console.log('exp', exp - currentTime);
  }
  // console.log('accessToken in createApolloClient', accessToken);
  const authLink = setContext(async (_, { headers }) => {
    if (!accessToken) {
      console.log('no access token in apollo client');
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
