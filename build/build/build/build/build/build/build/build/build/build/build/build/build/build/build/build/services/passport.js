"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = require("mongoose");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const keys_1 = require("../config/keys");
// requireing User this way to avoid testing errors and collisions
const User = mongoose_1.model('User');
passport_1.default.serializeUser((user, done) => {
    done(undefined, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(undefined, user);
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: keys_1.googleClientID,
    clientSecret: keys_1.googleClientSecret,
    callbackURL: '/auth/google/cb'
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id });
    if (existingUser) {
        console.log('returning existing user: ', existingUser);
        // return existing user from DB
        return done(undefined, existingUser);
    }
    // create a new user record if not found in db
    const newUser = await new User({ googleID: profile.id }).save();
    console.log('newUser returned: ', newUser);
    done(undefined, newUser);
}));
