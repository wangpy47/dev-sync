import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectModel } from './project.entity';

@Entity()
export class ProjectOutcomeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column()
  result: string;

  @ManyToOne(() => ProjectModel, (resume) => resume.outcomes)
  project: ProjectModel;
}
