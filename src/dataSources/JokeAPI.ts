import { RESTDataSource } from 'apollo-datasource-rest';

class JokeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://icanhazdadjoke.com/';
  }
}
