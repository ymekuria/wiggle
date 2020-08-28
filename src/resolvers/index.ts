import {
  PrismaClient,
  Contact,
  WiggleGetPayload,
  UserGetPayload
} from '@prisma/client';

type User = UserGetPayload<{
  select: {
    id: true;
    userName: true;
    wiggles?: true;
  };
}>;

type Wiggle = WiggleGetPayload<{
  select: {
    id: true;
    schedule: true;
    user: true;
    contact: true;
  };
}>;

type PrismaContext = {
  prisma: PrismaClient;
};

type CreateUserInput = {
  userName: string;
};

// type CreateUserPayload = {
//   user: User;
// };
type CreateWiggleInput = {
  schedule: string;
  userName: string;
  contact: Contact;
};

// type CreateWigglePayload = {
//   wiggle: Wiggle;
// };

type FindWiggleInput = {
  userName: string;
  phoneNumber: string;
};
type FindWiggleResponse = Wiggle | null;

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
    },
    wiggle: async (
      _parent: any,
      { input }: { input: FindWiggleInput },
      { prisma }: PrismaContext
    ): Promise<FindWiggleResponse> => {
      const { userName, phoneNumber } = input;

      let result = await prisma.wiggle.findMany({
        where: {
          AND: [{ user: { userName } }, { contact: { phoneNumber } }]
        },
        select: {
          id: true,
          schedule: true,
          user: true,
          contact: true
        }
      });

      return result.length ? result[0] : null;
    }
  },
  Mutation: {
    createUser: async (
      _parent: any,
      { input }: { input: CreateUserInput },
      { prisma }: PrismaContext
    ): Promise<User> => {
      let newUser = await prisma.user.create({
        data: {
          userName: input.userName
        }
      });

      return newUser;
    },
    createWiggle: async (
      _parent: any,
      { input }: { input: CreateWiggleInput },
      { prisma }: PrismaContext
    ): Promise<Wiggle> => {
      const { schedule, userName, contact } = input;

      let newWiggle = await prisma.wiggle.create({
        data: {
          user: {
            connect: { userName }
          },
          schedule,
          contact: {
            create: { phoneNumber: contact.phoneNumber, name: contact.name }
          }
        },
        select: {
          id: true,
          schedule: true,
          user: true,
          contact: true
        }
      });

      return newWiggle;
    }
  }
};

export default resolvers;
