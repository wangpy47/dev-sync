import {
  IsEmail,
  IsString,
  IsUrl,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  phoneNumber: number;

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
