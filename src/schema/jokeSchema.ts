import {
  introspectSchema,
  makeRemoteExecutableSchema
} from 'apollo-server-express';
import { HttpLink } from 'apollo-link-http';
import fetch from 'cross-fetch';

const link = new HttpLink({ uri: 'https://icanhazdadjoke.com/graphql', fetch });

const createJokeSchema = async () => {
  const schema = await introspectSchema(link);
  const jokeSchema = makeRemoteExecutableSchema({
    schema,
    link
  });
  return jokeSchema;
};

export default createJokeSchema;
