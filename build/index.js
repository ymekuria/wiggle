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
const client_1 = require("@prisma/client");
const DogAPI_1 = __importDefault(require("./dataSources/DogAPI"));
const JokeAPI_1 = __importDefault(require("./dataSources/JokeAPI"));
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
// import passport from 'passport';
// import './services/passport';
// import authRouter from './routes/authRoutes';
// import homeRouter from './routes/routes';
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(homeRouter);
// app.use(authRouter);
const PORT = process.env.PORT || 3000;
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const newWiggle = yield prisma.wiggle.create({
        data: {
            schedule: 'help',
            user: {
                connect: { userName: 'test' }
            },
            contact: {
                create: { phoneNumber: '720334444' }
            }
        }
    });
    console.log('newWiggle', newWiggle);
});
main()
    .catch((e) => console.log(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    context: {
        prisma
    },
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
