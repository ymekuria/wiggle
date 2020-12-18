import {
  PrismaClient,
  WiggleGetPayload,
  UserGetPayload,
  prismaVersion
} from '@prisma/client';
import { Context } from '../';

// type DecodedJwt = {
//   iss: string;
//   sub: string;
//   aud: string[];
//   iat: number;
//   exp: number;
//   azp: string;
//   scope: string;
// };

// type Context = {
//   prisma: PrismaClient;
//   user: DecodedJwt;
//   dataSources: any;
// };
type Wiggle = WiggleGetPayload<{
  select: {
    id: true;
    schedule: true;
    user: true;
    contact: true;
  };
}>;

type User = UserGetPayload<{
  select: {
    id: true;
    userName?: true;
    email?: true;
    wiggles?: true;
  };
}>;

type FindWiggleInput = {
  phoneNumber: string;
};
type FindWiggleResponse = Wiggle | null;

type FindWigglesResponse = Wiggle[] | null;

type MeResponse = User | null;

const Query = {
  me: async (
    _parent: any,
    _args: any,
    { prisma, userToken }: Context
  ): Promise<MeResponse> => {
    const currentUser = await prisma.user.findOne({
      where: { id: userToken?.sub }
    });

    return currentUser;
  },
  dogPic: (_parent: any, _args: any, { dataSources }: Context) => {
    return dataSources.dogAPI.getRandomDogPic();
  },
  dogPics: (_parent: any, _args: any, { dataSources }: Context) => {
    return dataSources.dogAPI.getThreeRandomDogPics();
  },
  searchJokes: (
    _parent: any,
    { term }: { term: string },
    { dataSources }: any
  ) => {
    return dataSources.jokeAPI.searchJokes(term);
  },
  joke: (_parent: any, _args: any, context: Context) => {
    return context.dataSources.jokeAPI.getRandomJoke();
  },
  jokes: (_parent: any, _args: any, { dataSources }: Context) => {
    return dataSources.jokeAPI.getMultipleRandomJokes();
  },
  wiggle: async (
    _parent: any,
    { input }: { input: FindWiggleInput },
    { prisma, userToken }: Context
  ): Promise<FindWiggleResponse> => {
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
        user: true,
        contact: true
      }
    });

    return result.length ? result[0] : null;
  },
  wiggles: async (
    _parent: any,
    _args: any,
    { prisma, userToken }: Context
  ): Promise<FindWigglesResponse> => {
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
