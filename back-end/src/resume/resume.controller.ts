import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import axios from 'axios';

@Controller('resume')
export class ResumeController {
  constructor(private userService: UserService) {}

  @Get('create-resume')
  async getAuthStatus(@Request() req) {
    console.log('create', req.isAuthenticated());
    if (req.isAuthenticated()) {
      // 세션이 유효하면 유저의 이메일만 반환
      const user = await this.userService.getUser(req.user.email);
      const username = user.githubUrl.split('/').pop();
      console.log(username);

      // GitHub API 요청을 보내 레포지토리 목록 가져오기
      const repositories = await this.getUserRepositories(username);
      console.log(repositories);
      
      return repositories;
    } else {
      // 세션이 유효하지 않으면 에러 메시지 반환
      return 'Not authenticated';
    }
  }

  // GitHub API를 통해 레포지토리 리스트 가져오기
  private async getUserRepositories(username: string) {
    console.log("t", process.env.GITHUB_TOKEN)
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',  // GitHub API 버전 설정
        },
      });

      return response.data;  // 레포지토리 리스트 반환
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error.response?.data || error.message);
      throw new Error('Failed to fetch GitHub repositories');
    }
  }
}
