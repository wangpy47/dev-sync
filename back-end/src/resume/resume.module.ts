import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { UserModule } from 'src/user/user.module';
import { SessionSerializer } from 'src/auth/session.serializer';
import { ResumeService } from './resume.service';
import { ResumeGenerationService } from './resumeGeneration.Service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeModel } from './entities/resume.entity';
import { IntroductionModel } from './entities/introduction.entity';
import { ProjectModel } from './entities/project.entity';
import { ProjectOutcomeModel } from './entities/project-outcome.entity';
import { SkillModel } from './entities/skill.entity';
import { ProfileModel } from './entities/profile.entity';
import { SkillSeederService } from './skill_seeder.service';

@Module({
  imports: [UserModule,TypeOrmModule.forFeature([ResumeModel, IntroductionModel, ProjectModel, ProjectOutcomeModel, SkillModel, ProfileModel])], // 여기에 필요한 엔티티를 추가하세요
  controllers: [ResumeController],
  providers: [SessionSerializer,ResumeService,ResumeGenerationService, SkillSeederService], 
})
export class ResumeModule {}
