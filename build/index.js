"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = require("mongoose");
var keys_1 = require("./config/keys");
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var routes_1 = __importDefault(require("./routes/routes"));
mongoose_1.connect(keys_1.mongoURI, {
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
app.use(routes_1.default);
app.use(authRoutes_1.default);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
