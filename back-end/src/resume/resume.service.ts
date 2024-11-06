import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ResumeService {
  // GitHub API를 통해 레포지토리 리스트 가져오기
  async getUserRepositories(username: string) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      return response.data; // 레포지토리 리스트 반환
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error.response?.data || error.message);
      throw new Error('Failed to fetch GitHub repositories');
    }
  }

  // README 파일을 가져오는 함수
  async getReadmeContent(username: string, repoName: string) {
    try {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/README.md`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
  
      // base64로 인코딩된 README 파일을 디코딩
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
  
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
        console.error(`Error fetching README for ${repoName}:`, error.response?.data || error.message);
        return 'Error fetching README';
      }
    }
  }
  
  


// 커밋 메시지, 기여자 정보, 풀 리퀘스트, 릴리즈 정보 등 추가 로직들
async getAdditionalRepositoryData(username: string, repositoryName: string) {
    const pp: any = {};
    
    // 커밋 메시지
    const commitMessages = await axios.get(
      `https://api.github.com/repos/${username}/${repositoryName}/commits`, {
        headers: this.getAuthHeaders(),
      });
    
    // 커밋 메시지에서 불필요한 패턴 제거
    pp.recent_commit_messages = commitMessages.data.slice(0, 10).map(commit => {
      let message = commit.commit.message;
      message = message.replace(/\\n\s*\+/g, ''); // '\n' + 패턴 제거
      message = message.replace(/\s+/g, ' '); // 여러 공백을 한 개로
      message = message.replace(/\n+/g, '\n'); // 여러 줄바꿈을 한 줄로 통합
      return message.trim();
    });
  
    // 기여자 정보
    const contributorsData = await axios.get(
      `https://api.github.com/repos/${username}/${repositoryName}/contributors`, {
        headers: this.getAuthHeaders(),
      });
    const userContributions = contributorsData.data.find(contributor => contributor.login === username);
    pp.contributions = userContributions ? userContributions.contributions : 0;
  
    // 풀 리퀘스트
    const pullRequests = await axios.get(
      `https://api.github.com/repos/${username}/${repositoryName}/pulls`, {
        headers: this.getAuthHeaders(),
      });
    pp.recent_pull_requests = pullRequests.data.slice(0, 3).map(pr => ({
      title: pr.title,
      created_at: pr.created_at,
      status: pr.state,
    }));
  
    // 릴리즈 정보
    const releasesData = await axios.get(
      `https://api.github.com/repos/${username}/${repositoryName}/releases`, {
        headers: this.getAuthHeaders(),
      });
    pp.latest_release = releasesData.data.length > 0 ? releasesData.data[0].name : 'No release';
  
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
