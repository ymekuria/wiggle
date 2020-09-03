require('dotenv').config();
import express, { Request } from 'express';
import bodyParser from 'body-parser';
// import { connect, connection } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import DogAPI from './dataSources/DogAPI';
import JokeAPI from './dataSources/JokeAPI';
import mainSchema from './schema';
import resolvers from './resolvers';
import passport from 'passport';
import passportJWT from 'passport-jwt';

// import './services/passport';

// import authRouter from './routes/authRoutes';
// import homeRouter from './routes/routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// app.use(homeRouter);
// app.use(authRouter);

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();
// const { Strategy, ExtractJwt } = passportJWT;
// const params = {
//   secretOrKey: process.env.JWT_SECRET,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
// };

// const strategy = new Strategy(params, (payload, done) => {
//   const user =  prisma.user.findOne()

//   return done(null, user);
// });

const server = new ApolloServer({
  typeDefs: mainSchema,
  resolvers,
  engine: {
    reportSchema: true
  },
  context: {
    prisma
  },
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
