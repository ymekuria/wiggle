import { mergeSchemas } from 'apollo-server-express';
import resolvers from '../resolvers';
import mainSchema from './mainSchema';
import createJokeSchema from './jokeSchema';

const createMergedSchema = async () => {
  const jokeSchema = await createJokeSchema();
  const mergedSchema = mergeSchemas({
    schemas: [mainSchema, jokeSchema],
    resolvers
  });
  return mergedSchema;
};

export default createMergedSchema;
