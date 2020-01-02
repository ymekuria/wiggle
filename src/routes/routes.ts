import { Request, Response, Express } from 'express';
module.exports = (app: Express) => {
  app.get('/', (req: Request, res: Response): void => {
    res.send('Hellow World');
  });
};
