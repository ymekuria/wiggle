"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var app = express_1.default();
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
