import { Contact, WiggleGetPayload, UserGetPayload } from '@prisma/client';
import { Context } from '../';

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
    { prisma, userToken }: Context
  ): Promise<User> => {
    let newUser = await prisma.user.create({
      data: {
        id: userToken.sub,
        userName: input?.userName,
        email: input?.email
      }
    });

    return newUser;
  },
  createWiggle: async (
    _parent: any,
    { input }: { input: CreateWiggleInput },
    { prisma, userToken }: Context
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
