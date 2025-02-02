import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ResumeModule } from './resume/resume.module';
import { ContactModule } from './contact/contact.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { Category } from './posts/entities/category.entity';
import { Like } from './posts/entities/like.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev-sync.sqlite',
      entities: [User, Post, Category, Like],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    ResumeModule,
    ContactModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
