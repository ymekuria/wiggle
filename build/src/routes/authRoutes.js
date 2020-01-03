"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var authRouter = express_1.Router();
authRouter.post('/signup', function (req, res) {
    res.send('Signup');
});
authRouter.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/cb', passport_1.default.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
});
authRouter.get('/login', function (req, res) {
    res.send('login');
});
exports.default = authRouter;
