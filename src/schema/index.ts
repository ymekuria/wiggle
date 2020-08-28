import { gql } from 'apollo-server-express';

const mainSchema = gql`
  type Query {
    randomDogPic: DogPic
    threeRandomDogPics: ThreeDogPics
    randomJoke: Joke
    searchJokes(term: String): [Joke]
    multipleRandomJokes: [Joke]
    wiggle(input: FindWiggleInput!): FindWiggleResponse
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse
    createWiggle(input: CreateWiggleInput!): CreateWiggleResponse
  }
  input CreateUserInput {
    userName: String
  }
  type CreateUserResponse {
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
  type ThreeDogPics {
    pictures: [String]
  }
`;

export default mainSchema;
