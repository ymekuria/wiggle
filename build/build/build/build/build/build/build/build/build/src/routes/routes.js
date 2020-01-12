"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeRouter = express_1.Router();
homeRouter.get('/', (req, res) => {
    res.send('Hellow World');
});
exports.default = homeRouter;
