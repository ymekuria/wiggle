"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const mainSchema = apollo_server_express_1.gql `
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
    createUser(userName: String): User
  }

  type User {
    id: ID
    userName: String
    wiggles: [Wiggle]
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
exports.default = mainSchema;
