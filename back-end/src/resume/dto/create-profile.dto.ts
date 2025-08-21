import {
  IsEmail,
  IsString,
  IsUrl,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ResumeBlockType } from '../enum/resume-type.enum';

export class CreateProfileDto {

  @IsEnum(ResumeBlockType)
  type: ResumeBlockType.PROFILE;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  phoneNumber?: number;

  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  blogUrl?: string;
}
