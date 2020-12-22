import { MutationResolvers, Wiggle } from '../__generated__/graphql_api_types';
import { ApolloServerContext } from '../';

const Mutation: MutationResolvers = {
  createUser: async (_parent, { input }, { prisma, userToken }) => {
    if (!userToken) {
      console.log('only authenticated users can create a wiggle');
      return;
    }
    let newUser = await prisma.user.create({
      data: {
        id: userToken.sub,
        userName: input?.userName,
        email: input?.email
      },
      select: {
        userName: true,
        email: true,
        wiggles: true
      }
    });

    return newUser;
  },
  createWiggle: async (_parent, { input }, { prisma, userToken }) => {
    const { schedule, contact } = input;
    if (!userToken) {
      console.log('only authenticated users can create a wiggle');
      return null;
    }
    let newWiggle = await prisma.wiggle.create({
      data: {
        user: {
          connect: { id: userToken.sub }
        },
        schedule,
        contact: {
          create: { phoneNumber: contact.phoneNumber, name: contact?.name }
        }
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

    return newWiggle;
  }
};

export default Mutation;
