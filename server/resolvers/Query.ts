import { QueryResolvers } from '../__generated__/graphql_api_types';

const Query: QueryResolvers = {
  me: async (_parent, _args, { prisma, userToken }) => {
    if (!userToken) {
      console.log('User is not Authenticated');
      return null;
    }
    const currentUser = await prisma.user.findOne({
      where: { id: userToken.sub },
      select: {
        userName: true,
        email: true,
        wiggles: true
      }
    });

    return currentUser;
  },
  dogPic: (_parent, _args, { dataSources }) => {
    return dataSources.dogAPI.getRandomDogPic();
  },
  dogPics: (_parent, _args, { dataSources }) => {
    return dataSources.dogAPI.getRandomDogPics();
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
    if (!userToken) {
      console.log('user is not authenticated');
      return;
    }
    let result = await prisma.wiggle.findMany({
      where: {
        AND: [
          { user: { id: userToken.sub } },
          { contact: { phoneNumber: input.phoneNumber } }
        ]
      },
      select: {
        id: true,
        schedule: true,
        user: {
          select: {
            userName: true,
            email: true,
            wiggles: true
          }
        },
        contact: true
      }
    });

    return result.length ? result[0] : null;
  },
  wiggles: async (_parent, _args, { prisma, userToken }) => {
    if (!userToken) {
      console.log('user is not authenticated');
      return;
    }

    let result = await prisma.wiggle.findMany({
      where: {
        user: { id: userToken.sub }
      },
      select: {
        id: true,
        schedule: true,
        user: {
          select: {
            userName: true,
            email: true,
            wiggles: true
          }
        },
        contact: true
      }
    });
    console.log('wiggles from prisma', result);
    return result;
  }
};

export default Query;
