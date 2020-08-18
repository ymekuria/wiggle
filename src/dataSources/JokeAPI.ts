import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
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
  willSendRequest(request: RequestOptions) {
    request.headers.set('Accept', 'application/json');
  }
  async getRandomJoke(): Promise<singleJokeResponse> {
    try {
      const result = await this.get('/');
      console.log(result);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}
export default JokeAPI;
