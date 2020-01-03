import { Router, Request, Response } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/signup', (req: Request, res: Response) => {
  res.send('Signup');
});

authRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/auth/google/cb',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

authRouter.get('/login', (req: Request, res: Response) => {
  res.send('login');
});

export default authRouter;
