import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { UserModule } from 'src/user/user.module';
import { SessionSerializer } from 'src/auth/session.serializer';
import { ResumeService } from './resume.service';

@Module({
  imports: [UserModule],
  controllers: [ResumeController],
  providers: [SessionSerializer,ResumeService], 
})
export class ResumeModule {}
