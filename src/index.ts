import express from 'express';
import bodyParser from 'body-parser';
// import { connect, connection } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import DogAPI from './dataSources/DogAPI';
import JokeAPI from './dataSources/JokeAPI';
import mainSchema from './schema';
import resolvers from './resolvers';
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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());

// app.use(homeRouter);
// app.use(authRouter);

const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs: mainSchema,
  resolvers,
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
