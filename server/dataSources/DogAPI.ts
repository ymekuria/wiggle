import { RESTDataSource } from 'apollo-datasource-rest';

type singleDogResponse = {
  picture: string;
};

type threeRandomDogsResponse = {
  pictures: string[];
};
class DogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dog.ceo/api/';
  }

  async getRandomDogPic(): Promise<singleDogResponse> {
    try {
      const { message } = await this.get('/breeds/image/random');
      return { picture: message };
    } catch (error) {
      return error.message;
    }
  }
  async getThreeRandomDogPics(): Promise<threeRandomDogsResponse> {
    try {
      const { message } = await this.get('breeds/image/random/3');
      return { pictures: message };
    } catch (error) {
      return error.message;
    }
  }
}

export default DogAPI;
