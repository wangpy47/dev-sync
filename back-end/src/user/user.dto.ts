import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  isPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  name: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthDate?: Date;

  @IsNumber()
  phone_number?: number;

  @IsString()
  @IsOptional()
  githubUrl?: string;

  @IsString()
  @IsOptional()
  blogUrl?: string;

  @IsString()
  @IsOptional()
  educationLevel?: string;

  @IsString()
  @IsOptional()
  universityName?: string;

  @IsString()
  @IsOptional()
  departmentName?: string;

  @IsString()
  @IsOptional()
  profile_image?: string;
}
