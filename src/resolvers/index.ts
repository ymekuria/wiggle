import { PrismaClient, UserCreateArgs } from '@prisma/client';

type PrismaContext = {
  prisma: PrismaClient;
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
      { input }: any,
      { prisma }: PrismaContext
    ) => {
      const newUser = await prisma.user.create({
        data: {
          userName: input.userName
        }
      });

      return {
        user: newUser
      };

      return newUser;
    },
    createWiggle: async (
      _parent: any,
      { input }: any,
      { prisma }: PrismaContext
    ) => {
      const { schedule, userName, contact } = input;

      const newWiggle = await prisma.wiggle.create({
        data: {
          user: {
            connect: { userName }
          },
          schedule,
          contact: {
            create: { phoneNumber: contact.phoneNumber, name: contact.name }
          }
        },
        include: {
          user: true,
          contact: true
        }
      });

      return {
        wiggle: newWiggle
      };
    }
  }
};

export default resolvers;
//
