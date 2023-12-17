import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { PrismaService } from 'prisma/prisma.service';
import { UserModel } from './users.model';

export class CreateUserDto {
  @ApiProperty()
  Email: string;

  @ApiProperty()
  HashedPassword: string;

  @ApiProperty()
  Username: string | null;
}

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    const users = await this.prisma.users.findMany();
    return users.map((user) => ({
      id: user.ID,
      Email: user.Email,
      Username: user.Username,
    }));
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() data: CreateUserDto): Promise<UserModel> {
    return await this.prisma.users.create({
      data,
    });
  }
}
