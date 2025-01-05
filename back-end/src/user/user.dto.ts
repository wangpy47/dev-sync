import { IsEmail, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

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
  name?: string;

  @IsString()
  githubUrl?: string;

  @IsNumber()
  age:number;

  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, {
    message: '전화번호는 010-1234-5678 형식이어야 합니다.',
  })
  phone_number: string;

  @IsString()
  blogUrl?: string;

  @IsString()
  @IsOptional()
  profile_image?: string; 
  
}

