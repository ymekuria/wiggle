import { Router, Request, Response } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/signup', (req: Request, res: Response) => {
  console.log('signup route');
  res.send('Signup');
});
authRouter.get('/signup', (req: Request, res: Response) => {
  console.log('get signup route');
  res.send('Signup');
});

authRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/auth/google/cb',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req: Request, res: Response) {
    res.redirect('/');
  }
);

authRouter.get('/login', (req: Request, res: Response) => {
  res.send('login');
});

export default authRouter;
