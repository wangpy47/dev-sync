export type ResumeData = {
  id: string;
  title: string;
  order: string[];
  entities: ResumeSection[];
};

type ResumeSection =
  | ProfileSection
  | SkillsSection
  | CareerSection
  | AchievementSection
  | ProjectSection
  | OutcomeSection
  | IntroductionSection
  | CustomSection;

type ProfileSection = {
  id: string;
  type: "profile";
  name: string;
  email: string;
  github_url?:string;
	blog_url?:string;
  phone_number: string;
  address: string;
  education?: string;
};

type SkillsSection = {
  id: string;
  type: "skills";
  familiar: string[];
  strengths: string[];
};

type CareerSection = {
  id: string;
  type: "career";
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  technologies: string[];
};

type AchievementSection = {
  id: string;
  type: "achievement";
  title: string;
  organization?: string;
  date: string;
  description: string;
};

type ProjectSection = {
  id: string;
  type: "project";
  description: string;
  start_date: string;
  end_date: string;
  technologies: string[];
};

type OutcomeSection = {
  id: string;
  type: "outcomes";
  task: string;
  result: string;
  project: string; // 연결된 project의 id
};

type IntroductionSection = {
  id: string;
  type: "introduction";
  headline: string;
  description: string;
};

type CustomSection = {
  id: string;
  type: "custom";
  title: string;
  content: string;
};
