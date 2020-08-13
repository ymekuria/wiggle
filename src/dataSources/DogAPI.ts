import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class DogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dog.ceo/api/';
  }

  async getRandomDogPic() {
    const response = await this.get('/breeds/image/random');
    return response;
  }
}

export default DogAPI;
