import { QueryResolvers, MeResponse } from '../__generated__/graphql_api_types';
import { ApolloServerContext } from '../';

const Query: QueryResolvers = {
  me: async (_parent, _args, { prisma, userToken }) => {
    const currentUser = await prisma.user.findOne({
      where: { id: userToken?.sub }
    });

    return currentUser;
  },
  dogPic: (_parent, _args, { dataSources }) => {
    return dataSources.dogAPI.getRandomDogPic();
  },
  dogPics: (_parent, _args, { dataSources }) => {
    return dataSources.dogAPI.getThreeRandomDogPics();
  },
  searchJokes: (_parent, { term }, { dataSources }) => {
    return dataSources.jokeAPI.searchJokes(term);
  },
  joke: (_parent, _args, context) => {
    return context.dataSources.jokeAPI.getRandomJoke();
  },
  jokes: (_parent, _args, { dataSources }) => {
    return dataSources.jokeAPI.getMultipleRandomJokes();
  },
  wiggle: async (_parent, { input }, { prisma, userToken }) => {
    let result = await prisma.wiggle.findMany({
      where: {
        AND: [
          { user: { id: userToken?.sub } },
          { contact: { phoneNumber: input.phoneNumber } }
        ]
      },
      select: {
        id: true,
        schedule: true,
        user: true,
        contact: true
      }
    });

    return result.length ? result[0] : null;
  },
  wiggles: async (_parent, _args, { prisma, userToken }) => {
    let result = await prisma.wiggle.findMany({
      where: {
        user: { id: userToken.sub }
      },
      select: {
        id: true,
        schedule: true,
        user: true,
        contact: true
      }
    });

    return result;
  }
};

export default Query;
