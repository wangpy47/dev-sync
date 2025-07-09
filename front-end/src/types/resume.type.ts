interface BasicInfoSection {
  type: "basicInfo";
  name: string;
  email: string;
  githubUrl: string;
  phoneNumber: number;
}

interface SkillsSection {
  type: "skills";
  familiar: string[];
  strengths: string[];
}

interface ProjectsSection {
  type: "projects";
  items: {
    name: string;
    role: string;
    description: string;
    outcomes: { task: string; result: string }[];
  }[];
}

interface IntroductionSection {
  type: "introduction";
  headline: string;
  description: string;
}

interface CustomSection {
  type: "custom";
  title: string;
  content: string;
}

// 🔹 유니언 타입으로 묶기
type SectionEntity =
  | BasicInfoSection
  | SkillsSection
  | ProjectsSection
  | IntroductionSection
  | CustomSection;

interface ResumeData {
  order: string[];
  entities: Record<string, SectionEntity>;
};

export type {ResumeData};