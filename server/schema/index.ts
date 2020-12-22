import { gql } from 'apollo-server-express';

const mainSchema = gql`
  type Query {
    me: User
    dogPic: DogPic
    dogPics: DogPics
    joke: Joke
    searchJokes(term: String): [Joke]
    jokes: [Joke]
    wiggle(input: FindWiggleInput!): Wiggle
    wiggles: [Wiggle]
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse
    createWiggle(input: CreateWiggleInput!): Wiggle
  }
  input CreateUserInput {
    userName: String
    email: String
  }

  type MeResponse {
    userName: String
    email: String
    wiggles: [Wiggle]
  }

  type CreateUserResponse {
    userName: String
    wiggles: [Wiggle]
  }
  input FindWiggleInput {
    userName: String
    phoneNumber: String
  }
  type FindWiggleResponse {
    id: Int
    user: User
    schedule: String
    contact: Contact
  }
  input CreateWiggleInput {
    userName: String
    schedule: String!
    contact: ContactInput!
  }
  type CreateWiggleResponse {
    wiggle: Wiggle
  }
  input ContactInput {
    id: Int
    phoneNumber: String!
    name: String
  }

  type User {
    userName: String
    email: String
    wiggles: [Wiggle]
  }

  type Wiggle {
    id: Int
    user: User!
    schedule: String
    contact: Contact!
  }

  type Contact {
    id: ID
    name: String
    phoneNumber: String!
  }

  type Joke {
    id: ID
    joke: String
  }
  type DogPic {
    picture: String
  }
  type DogPics {
    pictures: [String]
  }
`;

export default mainSchema;
