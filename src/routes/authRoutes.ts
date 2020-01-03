import { Router, Request, Response } from 'express';

const authRouter = Router();

authRouter.get('/signup', (req: Request, res: Response) => {
  res.send('Signup');
});

export default authRouter;
