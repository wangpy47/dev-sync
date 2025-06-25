import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { UserService } from 'src/user/user.service';
import { ResumeGenerationService } from './resumeGeneration.Service';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly userService: UserService,
    private readonly resumeService: ResumeService,
    private readonly resumeGenerationService: ResumeGenerationService,
  ) {}

  // 자소서 생성 엔드포인트
  @Post('generate')
  async generateResume(@Body('profileData') profileData: string) {
    try {
      // 입력 데이터 길이를 최대 4000자로 제한
      const limitedProfileData = profileData.slice(0, 4000);

      const resume =
        await this.resumeGenerationService.generateResume(limitedProfileData);
      return JSON.parse(resume);
    } catch {
      throw new HttpException(
        'Failed to generate resume',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 사용자 레포지토리 정보 가져오기 엔드포인트
  @Get('github/repos')
  async getAuthStatus(@Request() req) {
    if (req.isAuthenticated()) {
      return await this.resumeService.getGitHubData(
        req.user.name,
        req.user.email,
      );
    } else {
      return 'Not authenticated';
    }
  }

}
