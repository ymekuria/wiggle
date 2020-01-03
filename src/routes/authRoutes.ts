import { Router, Request, Response } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/signup', (req: Request, res: Response) => {
  res.send('Signup');
});

export default authRouter;
