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

type CreateWiggleInput = {
  schedule: string;
  userName: string;
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
};

export default Mutation;
