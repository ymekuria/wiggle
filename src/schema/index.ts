import { gql } from 'apollo-server-express';

const mainSchema = gql`
  type Query {
    randomDogPic: DogPic
    threeRandomDogPics: ThreeDogPics
    randomJoke: Joke
    searchJokes(term: String): [Joke]
    multipleRandomJokes: [Joke]
    findWiggle(input: FindWiggleInput!): FindWigglePayload
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPayload
    createWiggle(input: CreateWiggleInput!): CreateWigglePayload
  }
  input CreateUserInput {
    userName: String
  }
  type CreateUserPayload {
    user: User
  }
  input FindWiggleInput {
    userName: String
    phoneNumber: String
  }
  type FindWigglePayload {
    wiggle: Wiggle
  }
  input CreateWiggleInput {
    userName: String
    schedule: String
    contact: ContactInput
  }
  type CreateWigglePayload {
    wiggle: Wiggle
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
