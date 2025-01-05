import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

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

  @IsDate()
  birthDate?: Date;

  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, {
    message: '전화번호는 010-1234-5678 형식이어야 합니다.',
  })
  phone_number?: string;

  @IsString()
  @IsOptional()
  githubUrl?: string;

  @IsString()
  @IsOptional()
  blogUrl?: string;

  @IsString()
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
