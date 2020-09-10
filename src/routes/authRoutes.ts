import { Router, Request, Response } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.get('/auth/facebook', (req: Request, res: Response, Next: any) => {
  // parse header for fb token
  // make graphAPI call
  // get email and maybe fb id?
  // check db for user
  // if user issue a jwt token
  // send token to user
  // if not user create new user and add to the db
  // issue jwt
  //send to user
  //attach use ro
});

// authRouter.post('/signup', (req: Request, res: Response) => {
//   console.log('signup route');
//   res.send('Signup');
// });
// authRouter.get('/signup', (req: Request, res: Response) => {
//   console.log('get signup route');
//   res.send('Signup');
// });

// authRouter.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// authRouter.get(
//   '/auth/google/cb',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function (req: Request, res: Response) {
//     res.redirect('/');
//   }
// );

// authRouter.get('/login', (req: Request, res: Response) => {
//   res.send('login');
// });

export default authRouter;
