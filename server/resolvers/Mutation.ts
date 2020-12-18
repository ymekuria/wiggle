import { MutationResolvers } from '../__generated__/graphql_api_types';

const Mutation: MutationResolvers = {
  createUser: async (_parent, { input }, { prisma, userToken }) => {
    let newUser = await prisma.user.create({
      data: {
        id: userToken.sub,
        userName: input?.userName,
        email: input?.email
      }
    });

    return newUser;
  },
  createWiggle: async (_parent, { input }, { prisma, userToken }) => {
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
