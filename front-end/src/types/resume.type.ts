export type ResumeData = {
  id: string;
  title: string;
  order: string[];
  entities: ResumeSection[];
};

export type ResumeSection =
  | ProfileTypeSection
  | SkillsTypeSection
  | CareerTypeSection
  | AchievementTypeSection
  | ProjectTypeSection
  | OutcomeTypeSection
  | IntroductionTypeSection
  | CustomTypeSection
  | ProjectsTypeSection;

export type ProfileTypeSection = {
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

export type SkillsTypeSection = {
  id: string;
  type: "skills";
  familiars: string[];
  strengths: string[];
};

export type CareerTypeSection = {
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

export type AchievementTypeSection = {
  id: string;
  type: "achievement";
  title: string;
  organization?: string;
  date: string;
  description: string;
};

export type ProjectTypeSection = {
  id: string;
  type: "project";
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  skills: string[];
  outcomes: OutcomeTypeSection[];
};

export type ProjectsTypeSection = {
  id: string;
  type: "projects";
  items: ProjectTypeSection[];
};

export type OutcomeTypeSection = {
  id: string;
  type: "outcome";
  task: string;
  result: string;
};

export type IntroductionTypeSection = {
  id: string;
  type: "introduction";
  headline: string;
  description: string;
};

export type CustomTypeSection = {
  id: string;
  type: "custom";
  title: string;
  content: string;
};
