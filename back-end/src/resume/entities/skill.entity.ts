import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ResumeModel } from './resume.entity';
import { ProjectModel } from './project.entity';

@Entity()
export class SkillModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => ResumeModel, (resume) => resume.str_skills)
  strongResumes: ResumeModel[];

  @ManyToMany(() => ResumeModel, (resume) => resume.fam_skills)
  familiarResumes: ResumeModel[];

  @ManyToMany(() => ProjectModel, (project) => project.skills)
  projects: ProjectModel[];
}
