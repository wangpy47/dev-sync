import { BaseModel } from 'src/common/entity/base.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IntroductionModel } from './introduction.entity';
import { SkillModel } from './skill.entity';
import { ProjectModel } from './project.entity';
import { ProfileModel } from './profile.entity';

@Entity()
export class ResumeModel extends BaseModel {
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.resumes, { onDelete: 'CASCADE' })
  author: User;

  @OneToOne(() => IntroductionModel, (introduction) => introduction.resume, { cascade: true, onDelete: 'CASCADE' })
  introduction: IntroductionModel;

  @OneToOne(() => ProfileModel, (profile) => profile.resume, { cascade: true, onDelete: 'CASCADE' })
  profile: ProfileModel;

  @ManyToMany(() => SkillModel, (skill) => skill.strongResumes)
  @JoinTable({
    name: 'resume_strong_skills',
    joinColumn: { name: 'resume_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  str_skills: SkillModel[];

  @ManyToMany(() => SkillModel, (skill) => skill.familiarResumes)
  @JoinTable({
    name: 'resume_familiar_skills',
    joinColumn: { name: 'resume_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  fam_skills: SkillModel[];

  @OneToMany(() => ProjectModel, (project) => project.resume, { cascade: true, onDelete: 'CASCADE' })
  projects: ProjectModel[];
}
