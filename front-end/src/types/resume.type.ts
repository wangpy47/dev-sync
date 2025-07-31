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
  | CustomSection
  | ProjectsSection;

export type ProfileSection = {
  id: string;
  type: "profile";
  name: string;
  email: string;
  github_url?: string;
  blog_url?: string;
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

export type ProjectSection = {
  id: string;
  type: "project";
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  skills: string[];
  outcomes: OutcomeSection[];
};

export type ProjectsSection = {
  id: string;
  type: "projects";
  items: ProjectSection[];
};

export type OutcomeSection = {
  id: string;
  type: "outcome";
  task: string;
  result: string;
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
