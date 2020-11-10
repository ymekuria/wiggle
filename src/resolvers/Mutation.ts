import {
  PrismaClient,
  Contact,
  WiggleGetPayload,
  UserGetPayload
} from '@prisma/client';

type User = UserGetPayload<{
  select: {
    id: true;
    userName?: true;
    email?: true;
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
};

type CreateUserInput = {
  userName: string | undefined;
  email: string | undefined;
};

type CreateWiggleInput = {
  schedule: string;
  userName: string | undefined;
  contact: Contact;
};

const Mutation = {
  createUser: async (
    _parent: any,
    { input }: { input: CreateUserInput },
    { prisma, user }: Context
  ): Promise<User> => {
    let newUser = await prisma.user.create({
      data: {
        id: user.sub,
        userName: input?.userName,
        email: input?.email
      }
    });

    return newUser;
  },
  createWiggle: async (
    _parent: any,
    { input }: { input: CreateWiggleInput },
    { prisma, user }: Context
  ): Promise<Wiggle> => {
    const { schedule, contact } = input;
    let newWiggle = await prisma.wiggle.create({
      data: {
        user: {
          connect: { id: user.sub }
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
