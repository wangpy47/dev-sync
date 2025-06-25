import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ResumeService {
  // GitHub API를 통해 레포지토리 리스트 가져오기

  constructor(private readonly userService: UserService) {}

  async getGitHubData(name: string, email: string) {
    const userinfo = [];

    const user = await this.userService.getUser(email);

    const username = user.githubUrl.split('/').pop();

    // 모든 레포지토리 가져오기
    const repositories = await this.getUserRepositories(username);

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
          (await this.getReadmeContent(username, repository.name)),
      };

      const additionalData = await this.getAdditionalRepositoryData(
        username,
        repository.name,
      );
      userinfo.push({ ...repoInfo, ...additionalData });
    }

    if (userinfo.length === 0) {
      throw new Error('No repositories found for the user');
    }
    
    return userinfo;
  }

  async getUserRepositories(username: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        },
      );
      return response.data; // 레포지토리 리스트 반환
    } catch (error) {
      console.error(
        'Error fetching GitHub repositories:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch GitHub repositories');
    }
  }

  // README 파일을 가져오는 함수
  async getReadmeContent(username: string, repoName: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}/contents/README.md`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        },
      );

      // base64로 인코딩된 README 파일을 디코딩
      const content = Buffer.from(response.data.content, 'base64').toString(
        'utf-8',
      );

      // 모든 HTML 태그를 \n으로 치환
      let cleanedText = content.replace(/<\/?[^>]+(>|$)/g, '\n');

      // 이미지 태그 제거
      cleanedText = cleanedText.replace(/!\[.*?\]\(.*?\)/g, '');

      // '\n' + 같은 패턴 제거
      cleanedText = cleanedText.replace(/\\n\s*\+/g, '');

      // 여러 개의 연속된 공백을 한 개로
      cleanedText = cleanedText.replace(/\s+/g, ' ');

      // 중복된 줄바꿈을 하나로 통합
      cleanedText = cleanedText.replace(/\n+/g, '\n');

      return cleanedText.trim(); // 최종적으로 텍스트 반환
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return 'README not available';
      } else {
        console.error(
          `Error fetching README for ${repoName}:`,
          error.response?.data || error.message,
        );
        return 'Error fetching README';
      }
    }
  }

  // 커밋 메시지, 기여자 정보, 풀 리퀘스트, 릴리즈 정보 등 추가 로직들
  async getAdditionalRepositoryData(username: string, repositoryName: string) {
    const pp: any = {};

    try {
      // 커밋 메시지 가져오기
      const commitMessages = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/commits`,
        {
          headers: this.getAuthHeaders(),
        },
      );

      // username에 해당하는 사용자의 커밋만 필터링
      pp.recent_commit_messages = commitMessages.data
        .filter((commit) => commit.author && commit.author.login === username) // username 필터링
        .map((commit) => {
          let message = commit.commit.message;
          message = message.replace(/\n\s*\+/g, ''); // '\n' + 패턴 제거
          message = message.replace(/\s+/g, ' '); // 여러 공백을 한 개로
          message = message.replace(/\n+/g, '\n'); // 여러 줄바꿈을 한 줄로 통합
          return message.trim();
        })
        .filter((message, index, self) => {
          // 불필요한 메시지를 제거
          const ignorePattern =
            /^(merge( branch)?|update|initial commit|release|resolve|bump|create readme|fix conflicts)/i;
          if (ignorePattern.test(message)) return false;

          // 중복 메시지 제거
          return self.indexOf(message) === index;
        })
        .filter((message) => {
          // 의미 없는 커밋 메시지 제거 (너무 짧은 메시지)
          return message.length > 10; // 메시지가 10자 이하인 경우 제거
        });

      // 기여자 정보
      const contributorsData = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/contributors`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      const userContributions = contributorsData.data.find(
        (contributor) => contributor.login === username,
      );
      pp.contributions = userContributions
        ? userContributions.contributions
        : 0;

      // 풀 리퀘스트
      const pullRequests = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/pulls`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      pp.recent_pull_requests = pullRequests.data.slice(0, 3).map((pr) => ({
        title: pr.title,
        created_at: pr.created_at,
        status: pr.state,
      }));

      // 릴리즈 정보
      const releasesData = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/releases`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      pp.latest_release =
        releasesData.data.length > 0 ? releasesData.data[0].name : 'No release';
    } catch (error) {
      console.error(
        'Error fetching repository data:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch repository data');
    }

    return pp;
  }

  // 인증 헤더 생성 함수
  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    };
  }
}
