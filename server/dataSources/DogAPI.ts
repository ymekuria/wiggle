import { RESTDataSource } from 'apollo-datasource-rest';

type singleDogResponse = {
  picture: string;
};

type randomDogsResponse = {
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
  async getRandomDogPics(): Promise<randomDogsResponse> {
    try {
      const { message } = await this.get('breeds/image/random/8');
      return { pictures: message };
    } catch (error) {
      return error.message;
    }
  }
}

export default DogAPI;
