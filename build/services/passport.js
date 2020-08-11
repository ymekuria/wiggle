"use strict";
// import passport from 'passport';
// import { model } from 'mongoose';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { googleClientID, googleClientSecret } from '../config/keys';
// // requireing User this way to avoid testing errors and collisions
// const User = model('User');
// passport.serializeUser((user, done) => {
//   done(undefined, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(undefined, user);
// });
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: googleClientID,
//       clientSecret: googleClientSecret,
//       callbackURL: '/auth/google/cb'
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleID: profile.id });
//       if (existingUser) {
//         console.log('returning existing user: ', existingUser);
//         // return existing user from DB
//         return done(undefined, existingUser);
//       }
//       // create a new user record if not found in db
//       const newUser = await new User({ googleID: profile.id }).save();
//       console.log('newUser returned: ', newUser);
//       done(undefined, newUser);
//     }
//   )
// );
