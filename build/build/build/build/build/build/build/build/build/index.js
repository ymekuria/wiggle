"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
require("./models/User");
require("./services/passport");
const keys_1 = require("./config/keys");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const routes_1 = __importDefault(require("./routes/routes"));
mongoose_1.connect(keys_1.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose_1.connection.on('connected', () => {
    console.log('Connected to mongo');
});
mongoose_1.connection.on('error', err => {
    console.error('Mongo connection error:', err);
});
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(routes_1.default);
app.use(authRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
