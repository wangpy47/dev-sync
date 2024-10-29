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
    // 프롬프트에 글자 제한 추가
    const prompt = `Based on the following GitHub profile summary, create a professional resume for a developer (within 2000 characters):\n${profileData}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500, // 최대 500 토큰으로 출력 제한
        temperature: 0.7,
      });

      // 사용된 토큰 수를 콘솔에 출력
      console.log(`Tokens used: ${response.usage?.total_tokens || 'N/A'}`);

      return response.choices[0]?.message?.content || 'Resume generation failed';
    } catch (error) {
      console.error('Error generating resume:', error);
      throw new Error('Failed to generate resume');
    }
  }
}
