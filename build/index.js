"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { connect, connection } from 'mongoose';
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./schema"));
// import passport from 'passport';
// import './models/User';
// import './services/passport';
// import { mongoURI } from './config/keys';
// import authRouter from './routes/authRoutes';
// import homeRouter from './routes/routes';
// connect(mongoURI, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// });
// connection.on('connected', () => {
//   console.log('Connected to mongo');
// });
// connection.on('error', (err) => {
//   console.error('Mongo connection error:', err);
// });
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(homeRouter);
// app.use(authRouter);
const PORT = process.env.PORT || 3000;
const runServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield schema_1.default();
    const server = new apollo_server_express_1.ApolloServer({ schema });
    server.applyMiddleware({ app });
    return app.listen(PORT);
});
runServer().then(() => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
