import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResumeModel } from './resume.entity';
import { IsString } from 'class-validator';

@Entity()
export class IntroductionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  headline: string;

  @Column()
  @IsString()
  description: string;

  @OneToOne(() => ResumeModel, (resume) => resume.introduction)
  @JoinColumn()
  resume: ResumeModel;
}
