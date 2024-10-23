import { Controller, Get, Request } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { UserService } from 'src/user/user.service';

@Controller('resume')
export class ResumeController {
  constructor(
    private userService: UserService,
    private resumeService: ResumeService,
  ) {}

  @Get('get-user-repo')
  async getAuthStatus(@Request() req) {
    console.log('create', req.isAuthenticated());
    if (req.isAuthenticated()) {
      const userinfo = [];

      const user = await this.userService.getUser(req.user.email);
      const username = user.githubUrl.split('/').pop();

      // 모든 레포지토리 가져오기
      const repositories = await this.resumeService.getUserRepositories(username);

      // 레포지토리를 크기순으로 내림차순 정렬 후 최대 10개 선택
      const topRepositories = repositories
        .sort((a, b) => b.size - a.size) // 크기(size) 기준으로 내림차순 정렬
        .slice(0, 7); // 상위 10개의 레포지토리만 선택

      // 상위 10개의 레포지토리에 대해 정보 수집
      for (const repository of topRepositories) {
        const repoInfo = {
          name: repository.name,
          description: repository.description,
          language: repository.language,
          size: repository.size,
          stargazers_count: repository.stargazers_count,
          forks_count: repository.forks_count,
          html_url: repository.html_url,
          readme_content: !repository.description&&await this.resumeService.getReadmeContent(username, repository.name),//레포지토리 about 없으면 readme 불러옴
        };

        const additionalData = await this.resumeService.getAdditionalRepositoryData(username, repository.name);
        userinfo.push({ ...repoInfo, ...additionalData });
      }

      console.log(userinfo);
      return userinfo;
    } else {
      return 'Not authenticated';
    }
  }
}
