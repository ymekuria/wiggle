import axios from 'axios';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const facebookAuth = async (req: Request, res: Response, next: any) => {
  const fbToken = req.headers.token;
};

export default facbookAuth;
