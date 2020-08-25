import { PrismaClient, UserCreateArgs } from '@prisma/client';

type PrismaContext = {
  prisma: PrismaClient;
};

type CreateWiggleArgs = {
  schedule: string;
  userName: string;
  phoneNumber: string;
};

type CreateUserArgs = {
  userName: string;
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
    createUser: async (
      _parent: any,
      userName: CreateUserArgs,
      { prisma }: PrismaContext
    ) => {
      const newUser = await prisma.user.create({
        data: {
          userName
        }
      });
      return newUser;
    },
    createWiggle: async (
      _parent: any,
      { schedule, userName, phoneNumber }: CreateWiggleArgs,
      { prisma }: PrismaContext
    ) => {
      const newWiggle = await prisma.wiggle.create({
        data: {
          schedule,
          user: {
            connect: { userName }
          },
          contact: {
            create: { phoneNumber }
          }
        }
      });
      return newWiggle;
    }
  }
};

export default resolvers;
//
