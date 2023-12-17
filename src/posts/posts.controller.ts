import { Controller, Post, Body, Get } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PostModel } from './post.model';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getPosts(): Promise<PostModel[]> {
    return await this.prisma.post.findMany();
  }

  @Post()
  @ApiBody({ type: CreatePostDto })
  async createPost(@Body() data: CreatePostDto): Promise<PostModel> {
    return await this.prisma.post.create({
      data: {
        ...data,
        author: {
          connect: { id: 1 },
        },
      },
    });
  }
}
