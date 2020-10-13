import {
  PrismaClient,
  Contact,
  WiggleGetPayload,
  UserGetPayload
} from '@prisma/client';

type User = UserGetPayload<{
  select: {
    id: true;
    auth0id: true;
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
  userName: string | undefined;
  auth0id: string;
};

type CreateWiggleInput = {
  schedule: string;
  userName: string | undefined;
  auth0id: string;
  contact: Contact;
};

const Mutation = {
  createUser: async (
    _parent: any,
    { input }: { input: CreateUserInput },
    { prisma }: PrismaContext
  ): Promise<User> => {
    let newUser = await prisma.user.create({
      data: {
        auth0id: input.auth0id,
        userName: input?.userName
      }
    });

    return newUser;
  },
  createWiggle: async (
    _parent: any,
    { input }: { input: CreateWiggleInput },
    { prisma }: PrismaContext
  ): Promise<Wiggle> => {
    const { schedule, auth0id, contact } = input;

    let newWiggle = await prisma.wiggle.create({
      data: {
        user: {
          connect: { auth0id }
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
};

export default Mutation;
