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
  githubUrl?: string;
  blogUrl?: string;
  phoneNumber: string;
  address: string;
  education?: string;
};

export type userInfo = {
  user_id: number;
  email: string;
  name: string;
  phone_number: number;
  profile_image: string;
  createdDt: string;
  githubUrl: string;
  blogUrl: string;
  universityName: string;
  departmentName: string;
  educationLevel: string;
  birthDate: string;
};

export type SkillInnerType = {
  id: number;
  name: string;
  icon: string;
};

export type SkillsTypeSection = {
  selectSkill: any;
  id: string;
  type: "skills";
  familiars: SkillInnerType[];
  strengths: SkillInnerType[];
};

export type CareerTypeSection = {
  id: string;
  type: "career";
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
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
  endDate: string;
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
