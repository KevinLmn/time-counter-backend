import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PrismaService],
})
export class PostsModule {}
