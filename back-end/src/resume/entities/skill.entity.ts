import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ResumeModel } from './resume.entity';

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
}
