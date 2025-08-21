import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResumeModel } from './resume.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  blogUrl: string;

  @OneToOne(() => ResumeModel, (resume) => resume.profile)
  @JoinColumn()
  resume: ResumeModel;
}
