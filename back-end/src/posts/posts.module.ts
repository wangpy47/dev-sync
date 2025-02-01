import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { Post } from './entities/post.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category, User]), UserModule],
  controllers: [PostsController],
  providers: [PostsService, CategoryService],
})
export class PostsModule {}
