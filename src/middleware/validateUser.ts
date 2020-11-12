import { PrismaClient } from '@prisma/client';
import { Response, NextFunction } from 'express';
import { RequestWithToken } from '../';

const validateUser = (prisma: PrismaClient) => {
  return async (req: RequestWithToken, res: Response, next: NextFunction) => {
    console.log('testing middleware req.use', req.userToken);
    try {
      if (req.userToken?.sub) {
        console.log('JWT token valid and is req.user');
        // check if user is in the db
        const dbUser = await prisma.user.findOne({
          where: { id: req.userToken.sub }
        });

        if (!dbUser) {
          console.log('user ISNT in the db. Adding user to DB');
          // add user to db if not there already
          const newUser = await prisma.user.create({
            data: {
              id: req.userToken.sub
            }
          });

          console.log('new user created', newUser);
          next();
        } else {
          console.log('user IS IN DB. DbUser =', dbUser);
          next();
        }
      } else {
        console.log('no token sent. req.userToken', req.userToken);
        next();
      }
    } catch (err) {
      console.log('error: ', err);
      next();
    }
  };
};

export default validateUser;
