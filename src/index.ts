require('dotenv').config();
import express, { Request } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwtDecode from 'jwt-decode';
// import { connect, connection } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import authenticate from './middleware/checkJwt';
import DogAPI from './dataSources/DogAPI';
import JokeAPI from './dataSources/JokeAPI';
import mainSchema from './schema';
import resolvers from './resolvers';
import checkJwt from './middleware/checkJwt';
import createContext from './utils/createContext';

// import passport from 'passport';
// import passportJWT from 'passport-jwt';

// import './services/passport';

// import authRouter from './routes/authRoutes';
// import homeRouter from './routes/routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(passport.initialize());

// app.use(homeRouter);
// app.use(authRouter);
app.use(checkJwt);

// app.use((err, req, res, next) => {
//   console.log(err);
//   if (err.name === 'UnauthorizedError') {
//     console.error('Request without valid token');
//     res.status(401).send({ msg: 'Invalid token' });
//   } else next();
// });
const PORT = process.env.PORT || 8088;
console.log('port', PORT);
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: mainSchema,
  resolvers,
  engine: {
    reportSchema: true
  },
  context: createContext,
  // context: ({ req }) => {
  //   const user = req.user || undefined;

  //   return { user, prisma };
  // },
  dataSources: () => {
    return { dogAPI: new DogAPI(), jokeAPI: new JokeAPI() };
  }
});
// app.use('/', homeRouter);
server.applyMiddleware({
  app
});

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
