"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authRouter = express_1.Router();
authRouter.get('/signup', function (req, res) {
    res.send('Signup');
});
exports.default = authRouter;
