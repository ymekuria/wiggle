"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
// const app = express();
var PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
