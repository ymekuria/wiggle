"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = require("mongoose");
var key_s_1 = require("./config/key`s");
mongoose_1.connect(key_s_1.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose_1.connection.on('connected', function () {
    console.log('Connected to mongo');
});
mongoose_1.connection.on('error', function (err) {
    console.error('Mongo connection error:', err);
});
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// TODO refactor from common js to imports
require('./routes/routes')(app);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
