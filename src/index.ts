import express from 'express';
import bodyParser from 'body-parser';
// import { connect, connection } from 'mongoose';
import {
  ApolloServer,
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas
} from 'apollo-server-express';
import { HttpLink } from 'apollo-link-http';
// const fetch = require('node-fetch');
// import fetch from 'node-fetch';
import fetch from 'cross-fetch';
// import {
//   introspectSchema,
//   makeRemoteExecutableSchema,
//   makeExecutableSchema,
//   addMockFunctionsToSchema
// // } from 'graphql-tools';
// import passport from 'passport';
// import './models/User';
// import './services/passport';
// import { mongoURI } from './config/keys';
import authRouter from './routes/authRoutes';
import homeRouter from './routes/routes';
import resolvers from './resolvers';
import typeDefs from './schema';

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

const link = new HttpLink({ uri: 'https://icanhazdadjoke.com/graphql', fetch });

const createRemoteExecutableSchema = async () => {
  const remoteSchema = await introspectSchema(link);
  const remoteExecutableSchema = makeRemoteExecutableSchema({
    schema: remoteSchema,
    link
  });
  return remoteExecutableSchema;
};

const createNewSchema = async () => {
  const schema1 = await createRemoteExecutableSchema();
  const mergedSchema = mergeSchemas({
    schemas: [typeDefs, schema1],
    resolvers
  });
  return mergedSchema;
};

const runServer = async () => {
  const PORT = process.env.PORT || 3000;
  const schema = await createNewSchema();
  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

runServer();
