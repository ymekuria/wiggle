import { PrismaClient, WiggleGetPayload } from '@prisma/client';

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

type FindWiggleInput = {
  userName: string;
  phoneNumber: string;
};
type FindWiggleResponse = Wiggle | null;
const Query = {
  dogPic: (_parent: any, _args: any, { dataSources }: any) => {
    return dataSources.dogAPI.getRandomDogPic();
  },
  dogPics: (_parent: any, _args: any, { dataSources }: any) => {
    return dataSources.dogAPI.getThreeRandomDogPics();
  },
  searchJokes: (
    _parent: any,
    { term }: { term: string },
    { dataSources }: any
  ) => {
    return dataSources.jokeAPI.searchJokes(term);
  },
  joke: (_parent: any, _args: any, context: any) => {
    console.log('context', context);
    return context.dataSources.jokeAPI.getRandomJoke();
  },
  jokes: (_parent: any, _args: any, { dataSources }: any) => {
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
};

export default Query;
