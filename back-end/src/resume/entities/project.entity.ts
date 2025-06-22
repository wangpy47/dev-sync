import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResumeModel } from './resume.entity';
import { ProjectOutcomeModel } from './project-outcome.entity';

@Entity()
export class ProjectModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => ResumeModel, (resume) => resume.projects)
  resume: ResumeModel;

  @OneToMany(() => ProjectOutcomeModel, (outcome) => outcome.project)
  outcomes: ProjectOutcomeModel[];
}
