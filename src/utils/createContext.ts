import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
const createContext = ({ req }) => {
  const user = req.user || undefined;

  return { user, prisma };
};

export default createContext;
