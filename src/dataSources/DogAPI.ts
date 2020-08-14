import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class DogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dog.ceo/api/';
  }

  async getDogPic() {
    try {
      const { message } = await this.get('/breeds/image/random');
      return { picture: message };
    } catch (error) {
      return error.message;
    }
  }
}

export default DogAPI;
