import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ResumeModel } from './resume.entity';
  
  @Entity()
  export class CareerModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    company: string;
  
    @Column()
    position: string;
  
    @Column()
    start_date: Date;
  
    @Column({ nullable: true })
    end_date: Date;
  
    @Column()
    description: string;
  
    @ManyToOne(() => ResumeModel, (resume) => resume.careers)
    resume: ResumeModel;
  }