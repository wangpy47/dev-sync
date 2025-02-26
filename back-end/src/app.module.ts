import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ResumeModule } from './resume/resume.module';
import { ContactModule } from './contact/contact.module';
import { PostsModule } from './posts/posts.module';
import { UploadModule } from './upload/upload.module';
import { User } from './user/user.entity';
import { Post } from './posts/entities/post.entity';
import { Category } from './posts/entities/category.entity';
import { Like } from './posts/entities/like.entity';
import { Comment } from './posts/entities/comment.entity';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_DATABASE, 
      entities: [User, Post, Category, Like, Comment],
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNC === 'true', 
    }),
    UserModule,
    AuthModule,
    ResumeModule,
    ContactModule,
    PostsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
