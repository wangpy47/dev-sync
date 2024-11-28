import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ResumeGenerationService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResume(profileData: string): Promise<string> {
    // 간결하고 직관적인 영어 프롬프트로 작성
    const prompt = `
Generate a professional resume in Korean based on this GitHub profile data. 
Include strengths, weaknesses, technical stack, project contributions, and general developer traits like teamwork and problem-solving.

GitHub Profile Data:
${profileData}

Output the resume in Korean within 2000 characters.
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500, // 최대 500 토큰으로 출력 제한
        temperature: 0.7,
      });

      // 입력 토큰과 출력 토큰을 계산하여 콘솔에 출력
      const totalTokens =
        (response.usage?.prompt_tokens || 0) +
        (response.usage?.completion_tokens || 0);
      console.log(
        `Tokens used - Input: ${response.usage?.prompt_tokens || 'N/A'}, Output: ${response.usage?.completion_tokens || 'N/A'}, Total: ${totalTokens}`,
      );

      return (
        response.choices[0]?.message?.content || '자소서 생성에 실패했습니다'
      );
    } catch (error) {
      console.error('Error generating resume:', error);
      throw new Error('자소서 생성에 실패했습니다');
    }
  }
}
