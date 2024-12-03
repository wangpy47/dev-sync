import { IsEmail, IsOptional, IsString } from 'class-validator';

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
  username?: string;

  @IsString()
  githubUrl?: string;


  @IsString()
  blogUrl?: string;

  @IsString()
  @IsOptional()
  profileImageUrl?: string; 
  
}


