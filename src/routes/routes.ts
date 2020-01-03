import { Router, Request, Response, Express } from 'express';

const homeRouter = Router();

homeRouter.get('/', (req: Request, res: Response): void => {
  res.send('Hellow World');
});

export default homeRouter;
