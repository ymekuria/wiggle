import { MutationResolvers, Wiggle } from '../__generated__/graphql_api_types';
import { ApolloServerContext } from '../';

const Mutation: MutationResolvers<ApolloServerContext> = {
  createUser: async (_parent, { input }, { prisma, userToken }) => {
    let newUser = await prisma.user.create({
      data: {
        id: userToken?.sub,
        userName: input?.userName,
        email: input?.email
      }
    });

    return newUser;
  },
  createWiggle: async (
    _parent,
    { input },
    { prisma, userToken }
  ): Promise<Wiggle> => {
    const { schedule, contact } = input;
    if (!userToken) {
    }
    let newWiggle = await prisma.wiggle.create({
      data: {
        user: {
          connect: { id: userToken.sub }
        },
        schedule,
        contact: {
          create: { phoneNumber: contact?.phoneNumber, name: contact?.name }
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
};

export default Mutation;