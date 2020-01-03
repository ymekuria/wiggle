import passport from 'passport';
import { model } from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { googleClientID, googleClientSecret } from '../config/keys';

// requireing User this way to avoid testing errors and collisions

const User = model('users');
passport.use(
  new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/cb'
  })
);
