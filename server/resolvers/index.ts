import Mutation from './Mutation';
import Query from './Query';
import { Resolvers } from '../__generated__/graphql_api_types';
import { ApolloServerContext } from '../';

const resolvers: Resolvers<ApolloServerContext> = {
  Query,
  Mutation
};

export default resolvers;
