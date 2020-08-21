import { gql } from 'apollo-server-express';

const mainSchema = gql`
  type Query {
    hello: String
    test: String
    randomDogPic: DogPic
    threeRandomDogPics: ThreeDogPics
    randomJoke: Joke
    searchJokes(term: String): [Joke]
    multipleRandomJokes: [Joke]
  }

  type Mutation {
    creatUser(userName: String): User
  }

  type User {
    id: ID
    userName: String
    wiggles: [wiggle]
  }

  type Wiggle {
    id: ID
    schedule: String
    contact: Contact
  }

  type Contact {
    id: ID
    phoneNumber: String
    name: String
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
