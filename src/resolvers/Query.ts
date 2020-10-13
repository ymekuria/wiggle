import { PrismaClient, WiggleGetPayload } from '@prisma/client';

type DecodedJwt = {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
};

type Context = {
  prisma: PrismaClient;
  user: DecodedJwt;
  dataSources: any;
};
type Wiggle = WiggleGetPayload<{
  select: {
    id: true;
    schedule: true;
    user: true;
    contact: true;
  };
}>;

type FindWiggleInput = {
  auth0id: string;
  phoneNumber: string;
};
type FindWiggleResponse = Wiggle | null;

const Query = {
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
    console.log('context.user', context.user);
    return context.dataSources.jokeAPI.getRandomJoke();
  },
  jokes: (_parent: any, _args: any, { dataSources }: any) => {
    return dataSources.jokeAPI.getMultipleRandomJokes();
  },
  wiggle: async (
    _parent: any,
    { input }: { input: FindWiggleInput },
    { prisma, user }: Context
  ): Promise<FindWiggleResponse> => {
    const { auth0id, phoneNumber } = input;

    let result = await prisma.wiggle.findMany({
      where: {
        AND: [{ user: { auth0id } }, { contact: { phoneNumber } }]
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
};

export default Query;
