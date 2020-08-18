import { RESTDataSource } from 'apollo-datasource-rest';
type singleJoke = {
  id: string;
  joke: string;
};

type singleJokeResponse = singleJoke & { status: string };

type multipleJokesResponse = {
  jokes: singleJoke[];
  status: string;
};
class JokeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://icanhazdadjoke.com/';
  }

  async getRandomJoke(): Promise<singleJokeResponse> {
    try {
      const result = await this.get('/');
      return result;
    } catch (error) {
      return error.message;
    }
  }
}
export default JokeAPI;
