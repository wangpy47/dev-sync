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
Using the following GitHub profile data, generate a structured JSON object for a developer portfolio. 

### JSON Structure:
{
  "introduction": {
    "description": "" // Developer's self-introduction in Korean (400-500 characters), focusing on their experience, core skills, and career goals.
  },
  "skills": {
    "strengths": [], // List of key technical skills (e.g., React, Node.js, SQL).
    "knowledgeable": [] // List of secondary or familiar skills (e.g., Docker, TailwindCSS).
  },
  "projects": [
    {
      "name": "", // Repository name.
      "description": "", // Brief description of the project in Korean.
      "outcomes": [
        {
          "title": "", // A short title in Korean summarizing the task or achievement (e.g., "구글 인증 구현").
          "result": "" // Detailed explanation in Korean. Describe:
          // - The specific action or task performed based on the commit message (e.g., "구글 인증 기능을 구현했습니다").
          // - The tools/technologies used, if applicable (e.g., "TypeScript와 Google API를 활용").
          // - The outcome or improvement achieved (e.g., "로그인 시간을 20% 단축하여 사용자 유지율을 높였습니다").
        }
      ],
      "role": "" // Role played in the project (e.g., "Frontend Developer", "Full-Stack Developer").
    }
  ]
}

### Guidelines:
1. Use **only the information provided in the "GitHub Profile Data" section** to populate the JSON object.
2. Do not fabricate data or add anything that is not explicitly stated in the profileData.
3. For the "outcomes" section:
   - Use each entry in "Recent Commit Details" to create an individual outcome.
   - The "title" must summarize the task or feature implemented, directly reflecting the commit message.
   - The "result" must describe the action, tools/technologies used (if applicable), and the outcome of the commit in Korean.
   - If the commit message lacks detail, infer meaning conservatively based on the commit content and the repository's general purpose.
4. Include all repositories from the profileData as individual projects in the "projects" key.
5. The "description" field for each project should summarize the repository's purpose based on its name, commit history, or description in the profileData.
6. Write all descriptive fields (e.g., introduction, outcomes) in **Korean**.
7. Keep all JSON keys (e.g., description, strengths, outcomes) in **English**.

### Important Notes:
- Do not include work or outcomes that the user did not explicitly perform or commit, as detailed in the "GitHub Profile Data".
- For missing or unclear details in the profileData, leave the fields empty or use placeholders such as "N/A".
- Ensure the portfolio strictly matches the user's contributions and skills as represented in the profileData.

GitHub Profile Data:
${profileData}
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
