import { Controller } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PrismaService } from 'prisma/prisma.service';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly prisma: PrismaService) {}

  // @Get()
  // async getPosts(): Promise<PostModel[]> {
  //   return await this.prisma.post.findMany();
  // }

  // @Post()
  // @ApiBody({ type: CreatePostDto })
  // async createPost(@Body() data: CreatePostDto): Promise<PostModel> {
  //   return await this.prisma.post.create({
  //     data: {
  //       ...data,
  //       author: {
  //         connect: { id: 1 },
  //       },
  //     },
  //   });
  // }
}
