import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  @IsString({ message: '이름은 문자열이어야 합니다.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email?: string;

  @IsOptional()
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  title?: string;

  @IsOptional()
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  content?: string;

  @IsOptional()
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  password?: string;
}
