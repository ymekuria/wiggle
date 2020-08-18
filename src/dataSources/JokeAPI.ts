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
      console.log(result);
      return result;
    } catch (error) {
      return error.message;
    }
  }
  async getMultipleRandomJokes(): Promise<multipleJokes> {
    try {
      const { results } = await this.get('/search');

      return results;
    } catch (error) {
      return error.message;
    }
  }
}
export default JokeAPI;
