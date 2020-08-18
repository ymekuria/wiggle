import { gql } from 'apollo-server-express';

const mainSchema = gql`
  type Query {
    hello: String
    test: String
    randomDogPic: DogPic
    threeRandomDogPics: ThreeDogPics
  }

  type DogPic {
    picture: String
  }
  type ThreeDogPics {
    pictures: [String]
  }
`;

export default mainSchema;
