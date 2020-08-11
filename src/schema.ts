import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello: String
    test: String
    one: String
  }
`;

export default typeDefs;
