import express from 'express';
import * as bodyParser from 'body-parser';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  private config(): void {
    this.app.use(bodyParser.json());
  }
}

export default new App().app;
