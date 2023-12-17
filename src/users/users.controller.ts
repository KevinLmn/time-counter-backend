import { Controller, Post, Body, Get } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { UserModel } from './users.model';
import { PostModel } from 'src/posts/post.model';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  posts?: PostModel[];
}

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    return await this.prisma.user.findMany();
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() data: CreateUserDto): Promise<UserModel> {
    return await this.prisma.user.create({
      data: {
        ...data,
        posts: {
          create: data.posts,
        },
      },
    });
  }
}
