import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ResumeModel } from './resume.entity';
  
  @Entity()
  export class AchievementModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column({ nullable: true })
    organization: string;
  
    @Column()
    date: Date;
  
    @Column({ nullable: true })
    description: string;
  
    @ManyToOne(() => ResumeModel, (resume) => resume.achievements)
    resume: ResumeModel;
  }