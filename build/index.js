"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { connect, connection } from 'mongoose';
const apollo_server_express_1 = require("apollo-server-express");
const DogAPI_1 = __importDefault(require("./dataSources/DogAPI"));
const JokeAPI_1 = __importDefault(require("./dataSources/JokeAPI"));
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
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
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    dataSources: () => {
        return { dogAPI: new DogAPI_1.default(), jokeAPI: new JokeAPI_1.default() };
    }
});
// app.use('/', homeRouter);
server.applyMiddleware({
    app
});
app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
