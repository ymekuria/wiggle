import { PrismaClient } from '@prisma/client';

type PrismaContext = {
  prisma: PrismaClient;
};
const resolvers = {
  Query: {
    randomDogPic: (_parent: any, _args: any, { dataSources }: any) => {
      return dataSources.dogAPI.getRandomDogPic();
    },
    threeRandomDogPics: (_parent: any, _args: any, { dataSources }: any) => {
      return dataSources.dogAPI.getThreeRandomDogPics();
    },
    searchJokes: (
      _parent: any,
      { term }: { term: string },
      { dataSources }: any
    ) => {
      return dataSources.jokeAPI.searchJokes(term);
    },
    randomJoke: (_parent: any, _args: any, { dataSources }: any) => {
      return dataSources.jokeAPI.getRandomJoke();
    },
    multipleRandomJokes: (_parent: any, _args: any, { dataSources }: any) => {
      return dataSources.jokeAPI.getMultipleRandomJokes();
    }
  },
  Mutation: {
    createUser: async (_parent: any, args: any, { prisma }: PrismaContext) => {
      const newUser = await prisma.user.create({
        data: {
          username: args.userName
        }
      });
      return newUser;
    }
  }
};

export default resolvers;
//
