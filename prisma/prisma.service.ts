import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService {
  constructor() {}
  users = prisma.users;
  activities = prisma.activities;
  activityParameters = prisma.activityParameters;
  timeLogs = prisma.timeLogs;
}
