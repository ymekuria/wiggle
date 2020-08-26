import { PrismaClient, User, Contact, WiggleGetPayload } from '@prisma/client';

type PrismaContext = {
  prisma: PrismaClient;
};

type CreateUserInput = {
  userName: string;
};

type CreateUserPayload = {
  user: User;
};
type CreateWiggleInput = {
  schedule: string;
  userName: string;
  contact: Contact;
};

type CreateWigglePayload = {
  wiggle: Wiggle;
};
type Wiggle = WiggleGetPayload<{
  select: {
    id: true;
    schedule: true;
    user: true;
    contact: true;
  };
}>;
// prisma id types don't match graphql types
// type User = {
//   id: any;
//   userName: string;
//   wiggles?: Wiggle[];
// };
// type Wiggle = {
//   id: any;
//   user: User;
//   schedule: string;
//   contact: Contact;
// };

// type Contact = {
//   phoneNumber: string;
//   name?: string | null;
// };
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
      { input }: { input: CreateUserInput },
      { prisma }: PrismaContext
    ): Promise<CreateUserPayload> => {
      const newUser = await prisma.user.create({
        data: {
          userName: input.userName
        }
      });

      return {
        user: newUser
      };
    },
    createWiggle: async (
      _parent: any,
      { input }: { input: CreateWiggleInput },
      { prisma }: PrismaContext
    ): Promise<CreateWigglePayload> => {
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
        // include: {
        //   user: true,
        //   contact: true
        // },
        select: {
          id: true,
          schedule: true,
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
