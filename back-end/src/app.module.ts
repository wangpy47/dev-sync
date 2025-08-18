import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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
import { CommonModule } from './common/common.module';
import { BaseModel } from './common/entity/base.entity';
import { IntroductionModel } from './resume/entities/introduction.entity';
import { ProjectModel } from './resume/entities/project.entity';
import { SkillModel } from './resume/entities/skill.entity';
import { ResumeModel } from './resume/entities/resume.entity';
import { ProjectOutcomeModel } from './resume/entities/project-outcome.entity';
import { ContactModel } from './contact/entity/contact.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ENV_DB_DATABASE_KEY, ENV_DB_HOST_KEY, ENV_DB_PASSWORD_KEY, ENV_DB_PORT_KEY, ENV_DB_SYNC_KEY, ENV_DB_USERNAME_KEY } from './common/const/env-keys.const';
import { ProfileModel } from './resume/entities/profile.entity';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env[ENV_DB_HOST_KEY], 
      port: parseInt(process.env[ENV_DB_PORT_KEY], 10) || 3306,
      username: process.env[ENV_DB_USERNAME_KEY], 
      password: process.env[ENV_DB_PASSWORD_KEY], 
      database: process.env[ENV_DB_DATABASE_KEY], 
      entities: [User, Post, Category, Like, Comment, BaseModel,IntroductionModel, ProjectModel, SkillModel, ResumeModel, ProjectOutcomeModel, ContactModel, ProfileModel],
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UserModule,
    AuthModule,
    ResumeModule,
    ContactModule,
    PostsModule,
    UploadModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService,{
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },],
})
export class AppModule {}
