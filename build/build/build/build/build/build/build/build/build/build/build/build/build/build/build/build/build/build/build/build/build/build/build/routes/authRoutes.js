"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authRouter = express_1.Router();
authRouter.post('/signup', (req, res) => {
    console.log('signup route');
    res.send('Signup');
});
authRouter.get('/signup', (req, res) => {
    console.log('get signup route');
    res.send('Signup');
});
authRouter.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/cb', passport_1.default.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
});
authRouter.get('/login', (req, res) => {
    res.send('login');
});
exports.default = authRouter;