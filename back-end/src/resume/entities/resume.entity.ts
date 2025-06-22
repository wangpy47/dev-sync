import { BaseModel } from 'src/common/entity/base.entity';
import { User } from 'src/user/user.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IntroductionModel } from './introduction.entity';
import { SkillModel } from './skill.entity';
import { ProjectModel } from './project.entity';

@Entity()
export class ResumeModel extends BaseModel {
  @ManyToOne(() => User, (user) => user.resumes,{onDelete: 'CASCADE'})
  author: User;

  @OneToOne(() => IntroductionModel, (introduction) => introduction.resume)
  introduction: IntroductionModel;


  @ManyToMany(() => SkillModel, (skills) => skills.resumes)
  @JoinTable()
  skills: SkillModel[];



  @OneToMany(() => ProjectModel, (project) => project.resume)
  projects: ProjectModel[];
}
