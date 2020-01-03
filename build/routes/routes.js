"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var homeRouter = express_1.Router();
homeRouter.get('/', function (req, res) {
    res.send('Hellow World');
});
exports.default = homeRouter;
