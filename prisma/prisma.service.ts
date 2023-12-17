import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService {
  constructor() {}
  post = prisma.post;
  user = prisma.user;
}
