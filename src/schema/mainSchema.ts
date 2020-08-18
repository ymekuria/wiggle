import { gql } from 'apollo-server-express';

const mainSchema = gql`
  type Query {
    hello: String
    test: String
    randomDogPic: DogPic
    threeRandomDogPics: [DogPic]
  }

  type DogPic {
    picture: String
  }
`;

export default mainSchema;
