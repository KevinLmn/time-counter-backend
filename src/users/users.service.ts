import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.users.findUnique({
      where: {
        Email: email,
      },
    });
  }
}
