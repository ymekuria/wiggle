import { gql } from 'apollo-server-express';

const mainSchema = gql`
  type Query {
    hello: String
    test: String
    one: String
  }
`;

export default mainSchema;
