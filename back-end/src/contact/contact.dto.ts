import { IsEmail, IsString } from 'class-validator';

export class ContactMailDto {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;

  @IsString()
  subject?: string;

  @IsString()
  message?: string;
}
