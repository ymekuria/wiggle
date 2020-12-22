import { WiggleGetPayload } from '@prisma/client';

export type Wiggle = WiggleGetPayload<{
  select: {
    id: true;
    schedule: true;
    user: {
      select: {
        userName: true;
        email: true;
      };
    };
    contact: true;
  };
}>;

export type Wiggles = Wiggle[];
