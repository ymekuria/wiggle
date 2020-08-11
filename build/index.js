"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { connect, connection } from 'mongoose';
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = __importDefault(require("./resolvers"));
const schema_1 = __importDefault(require("./schema"));
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
// const link = new HttpLink({ uri: 'https://icanhazdadjoke.com/graphql', fetch });
// const schema = await introspectSchema(link);
// const executableSchema = makeRemoteExecutableSchema({
//   schema,
//   link
// });
// addMockFunctionsToSchema({ schema: executableSchema });
// const baseSchema = makeExecutableSchema(typeDefs);
const PORT = process.env.PORT || 3000;
const server = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.default, resolvers: resolvers_1.default });
server.applyMiddleware({ app });
app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
