import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  category?: string; // 카테고리 이름

  @IsInt()
  @Min(1)
  post_id: number;
}

