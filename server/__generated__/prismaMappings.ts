import { WiggleGetPayload, UserGetPayload } from '@prisma/client';

export type Wiggle = WiggleGetPayload<{
  select: {
    id: true;
    schedule: true;
    user: {
      select: {
        userName: true;
        email: true;
        wiggles: true;
      };
    };
    contact: true;
  };
}>;

export type User = UserGetPayload<{
  select: {
    userName: true;
    email: true;
    wiggles: true;
  };
}>;

export type Wiggles = Wiggle[];
