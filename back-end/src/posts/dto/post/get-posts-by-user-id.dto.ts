import { IsEmail } from 'class-validator';

export class GetPostsByUserIdDto {
  @IsEmail()
  email:string
}