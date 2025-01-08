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
    } catch (error) {
      throw new HttpException(
        'Failed to generate resume',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 사용자 레포지토리 정보 가져오기 엔드포인트
  @Get('get-user-repo')
  async getAuthStatus(@Request() req) {
    if (req.isAuthenticated()) {
      const userinfo = [];

      const user = await this.userService.getUser(req.user.email);
      console.log(user);
      const username = user.githubUrl.split('/').pop();

      // 모든 레포지토리 가져오기
      const repositories =
        await this.resumeService.getUserRepositories(username);

      // 레포지토리를 크기순으로 내림차순 정렬 후 최대 7개 선택
      const topRepositories = repositories
        .sort((a, b) => b.size - a.size)
        .slice(0, 7);

      // 상위 7개의 레포지토리에 대해 정보 수집
      for (const repository of topRepositories) {
        const repoInfo = {
          name: repository.name,
          description: repository.description,
          language: repository.language,
          size: repository.size,
          stargazers_count: repository.stargazers_count,
          forks_count: repository.forks_count,
          html_url: repository.html_url,
          readme_content:
            !repository.description &&
            (await this.resumeService.getReadmeContent(
              username,
              repository.name,
            )),
        };

        const additionalData =
          await this.resumeService.getAdditionalRepositoryData(
            username,
            repository.name,
          );
        userinfo.push({ ...repoInfo, ...additionalData });
      }

      console.log(userinfo);
      return userinfo;
    } else {
      return 'Not authenticated';
    }
  }
}
