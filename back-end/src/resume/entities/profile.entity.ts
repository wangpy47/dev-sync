import { IsEmail, IsString, IsUrl } from 'class-validator';
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

  @IsString()
  @Column()
  username: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  phoneNumber: number;

  @IsString()
  @Column()
  address: string;

  @IsString()
  @Column({ nullable: true })
  education: string;

  @IsUrl()
  @Column({ nullable: true })
  githubUrl: string;

  @IsUrl()
  @Column({ nullable: true })
  blogUrl: string;

  @OneToOne(() => ResumeModel, (resume) => resume.profile)
  @JoinColumn()
  resume: ResumeModel;
}
