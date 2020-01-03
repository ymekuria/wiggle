import { Router, Request, Response } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/signup', (req: Request, res: Response) => {
  res.send('Signup');
});

authRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] });

authRouter.get('/auth/google/cb', passport.authenticate('google'));  

export default authRouter;
