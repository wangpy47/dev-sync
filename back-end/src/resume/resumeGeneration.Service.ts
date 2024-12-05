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
Generate a detailed and structured JSON object for a developer portfolio in Korean based on the following GitHub profile data.
The JSON object should include the following sections:

1. introduction: // Developer's basic introduction
   {
     name: "", // Developer's name
     description: "", // Developer's self-introduction (400 to 500 characters). Include details about their experience, core skills, and career goals.
   }

2. skills: // Developer's technical skills
   {
     strengths: [], // List of core technologies or strengths (e.g., React, Node.js, SQL, etc.)
     knowledgeable: [], // List of secondary or familiar skills (e.g., Docker, TailwindCSS, etc.)
   }

3. projects: // Developer's major projects
   [
     {
       name: "", // Project name
       description: "", // Brief description of the project (what it is, what problem it solves, or its purpose).
       outcomes: [
         //  detailed achievements. Each should include:
         // - What specific action the developer took (e.g., "Developed a feature to...").
         // - What tools or technologies were used (e.g., "using React and Redux").
         // - What result or improvement was achieved (e.g., "reduced loading time by 20%").
       ],
       role: "", // Developer's role in the project (e.g., "Frontend Developer", "Full-Stack Developer").
     },
   ]

GitHub Profile Data:
${profileData}

Ensure the following:
- The developer's self-introduction (description) includes at least 3 key points: their experience, core skills, and career goals, written in Korean and within 400-500 characters.
- Each project's outcomes must include 2-3 detailed achievements that explain specific actions, the tools/technologies used, and the impact/results of those actions.
- The JSON object should be in Korean and strictly adhere to the structure above.
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
