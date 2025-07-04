import { PickType } from '@nestjs/mapped-types';
import { ResumeModel } from '../entities/resume.entity';
import { SaveProjectDto } from './save-project.dto';
import { SaveSkillDto } from './save-skill.dto';
import { SaveIntroductionDto } from './save-introduction.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class SaveResumeDto extends PickType(ResumeModel, ['title']) {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  str_skills?: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fam_skills?: number[];

  @IsOptional()
  projects?:SaveProjectDto[];

  @IsOptional()
  introduction?: SaveIntroductionDto;
}
