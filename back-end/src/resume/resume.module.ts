import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { UserModule } from 'src/user/user.module';
import { SessionSerializer } from 'src/auth/session.serializer';
import { ResumeService } from './resume.service';
import { ResumeGenerationService } from './resumeGeneration.Service';

@Module({
  imports: [UserModule],
  controllers: [ResumeController],
  providers: [SessionSerializer,ResumeService,ResumeGenerationService], 
})
export class ResumeModule {}
