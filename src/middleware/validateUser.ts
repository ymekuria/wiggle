import { PrismaClient } from '@prisma/client';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../';

const validateUser = (prisma: PrismaClient) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.userToken?.sub) {
        console.log('JWT token valid and is req.user');
        // check if user is in the db
        const dbUser = await prisma.user.findOne({
          where: { id: req.userToken.sub }
        });

        if (!dbUser) {
          console.log('User is not in the db. Adding user to db');
          // add user to db if not there already
          const newUser = await prisma.user.create({
            data: {
              id: req.userToken.sub
            }
          });

          console.log('new user created', newUser);
          next();
        } else {
          console.log('user is in the db. DbUser =', dbUser);
          next();
        }
      } else {
        console.log('no token sent with request. req.userToken', req.userToken);
        next();
      }
    } catch (err) {
      console.log('error: ', err);
      next();
    }
  };
};

export default validateUser;
