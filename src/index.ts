require('dotenv').config();
import express, { Request } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';

import DogAPI from './dataSources/DogAPI';
import JokeAPI from './dataSources/JokeAPI';
import mainSchema from './schema';
import resolvers from './resolvers';
import checkJwt from './middleware/checkJwt';
import validateUser from './middleware/validateUser';

type DecodedJwt = {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
};

type Context = {
  prisma: PrismaClient;
  userToken?: DecodedJwt;
};

export interface RequestWithToken extends Request {
  userToken?: DecodedJwt;
}

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// checks auth token and adds user to req.user
app.use(checkJwt);
// checks if if user is in the db and adds it if not
app.use(validateUser(prisma));

const PORT = process.env.PORT || 8088;
console.log('port', PORT);

const server = new ApolloServer({
  typeDefs: mainSchema,
  resolvers,
  engine: {
    reportSchema: true
  },
  context: ({ req }: { req: RequestWithToken }): Context => {
    const userToken = req.userToken;

    return { userToken, prisma };
  },
  dataSources: () => {
    return { dogAPI: new DogAPI(), jokeAPI: new JokeAPI() };
  }
});

server.applyMiddleware({
  app
});

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
