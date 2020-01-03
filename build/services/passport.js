"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var mongoose_1 = require("mongoose");
var passport_google_oauth20_1 = require("passport-google-oauth20");
var keys_1 = require("../config/keys");
// requireing User this way to avoid testing errors and collisions
var User = mongoose_1.model('users');
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: keys_1.googleClientID,
    clientSecret: keys_1.googleClientSecret,
    callbackURL: '/auth/google/cb'
}));
