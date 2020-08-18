import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

type singleDogResponse = {
  picture: string;
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
}

export default DogAPI;
