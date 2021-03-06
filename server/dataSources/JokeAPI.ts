import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

type singleJoke = {
  id: string;
  joke: string;
};

type multipleJokes = singleJoke[];

class JokeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://icanhazdadjoke.com/';
  }
  willSendRequest(request: RequestOptions) {
    request.headers.set('Accept', 'application/json');
  }

  async getRandomJoke(): Promise<singleJoke> {
    try {
      const result = await this.get('/');
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async searchJokes(term: string): Promise<multipleJokes> {
    try {
      const { results } = await this.get(`/search?limit=5&term=${term}`);
      console.log('joke results', results);
      return results;
    } catch (error) {
      return error.message;
    }
  }

  async getMultipleRandomJokes(): Promise<multipleJokes> {
    const randomPage = Math.floor(Math.random() * 90) + 1;

    try {
      // returns 8 random results
      const { results } = await this.get(`/search?limit=8&page=${randomPage}`);
      return results;
    } catch (error) {
      return error.message;
    }
  }
}
export default JokeAPI;
