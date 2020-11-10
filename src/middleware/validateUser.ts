const validateUser = (prisma) => {
  return async (req, res, next) => {
    console.log('testing middleware req.use', req.user);
    try {
      if (req.user?.sub) {
        console.log('JWT token valid and is req.user');
        const dbUser = await prisma.user.findOne({
          where: { id: req.user.sub }
        });

        if (!dbUser) {
          console.log('user ISNT in the db. Adding user to DB');
          // add user to db if not there already
          const newUser = await prisma.user.create({
            data: {
              id: req.user.sub
            }
          });

          console.log('new user created', newUser);
          next();
        } else {
          console.log('user IS IN DB. DbUser =', dbUser);
          next();
        }
      } else {
        console.log('no token sent. req.user', req.user);
        next();
      }
    } catch (err) {
      console.log('error: ', err);
      next();
    }
  };
};

export default validateUser;
