import { BaseModel } from 'src/common/entity/base.entity';
import { User } from 'src/user/user.entity';
import {
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
import { IsString } from 'class-validator';

@Entity()
export class ResumeModel extends BaseModel {
  @IsString()
  title: string;

  @ManyToOne(() => User, (user) => user.resumes, { onDelete: 'CASCADE' })
  author: User;

  @OneToOne(() => IntroductionModel, (introduction) => introduction.resume)
  introduction: IntroductionModel;

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

  @OneToMany(() => ProjectModel, (project) => project.resume)
  projects: ProjectModel[];
}
