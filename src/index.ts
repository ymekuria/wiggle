import express from 'express';
import bodyParser from 'body-parser';
// import { connect, connection } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import DogAPI from './dataSources/DogAPI';
import JokeAPI from './dataSources/JokeAPI';
import mainSchema from './schema';
import resolvers from './resolvers';
// import passport from 'passport';

// import './services/passport';

// import authRouter from './routes/authRoutes';
// import homeRouter from './routes/routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());

// app.use(homeRouter);
// app.use(authRouter);

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const main = async () => {
  const newWiggle = await prisma.wiggle.create({
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
};

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
const server = new ApolloServer({
  typeDefs: mainSchema,
  resolvers,
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
