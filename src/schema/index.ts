import { gql } from 'apollo-server-express';

const mainSchema = gql`
  type Query {
    dogPic: DogPic
    dogPics: DogPics
    joke: Joke
    searchJokes(term: String): [Joke]
    jokes: [Joke]
    wiggle(input: FindWiggleInput!): FindWiggleResponse
    wiggles: [Wiggle]
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse
    createWiggle(input: CreateWiggleInput!): CreateWiggleResponse
  }
  input CreateUserInput {
    userName: String
  }
  type CreateUserResponse {git
    id: ID
    userName: String
    wiggles: [Wiggle]
  }
  input FindWiggleInput {
    userName: String
    phoneNumber: String
  }
  type FindWiggleResponse {
    id: ID
    user: User
    schedule: String
    contact: Contact
  }
  input CreateWiggleInput {
    userName: String
    schedule: String
    contact: ContactInput
  }
  type CreateWiggleResponse {
    id: ID
    user: User
    schedule: String
    contact: Contact
  }
  input ContactInput {
    id: ID
    phoneNumber: String
    name: String
  }

  type User {
    id: ID
    userName: String
    wiggles: [Wiggle]
  }

  type Wiggle {
    id: ID
    user: User
    schedule: String
    contact: Contact
  }

  type Contact {
    id: ID
    name: String
    phoneNumber: String
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
