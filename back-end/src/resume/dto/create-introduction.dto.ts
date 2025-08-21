import { IsEnum, IsString } from 'class-validator';
import { ResumeBlockType } from '../enum/resume-type.enum';

export class CreateIntroductionDto {
  
  @IsEnum(ResumeBlockType)
  type: ResumeBlockType.INTRODUCTION;

  @IsString()
  headline: string;

  @IsString()
  description: string;
}
