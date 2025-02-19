import { IsInt, IsString, Length, Min } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  content: string;

  @IsString()
  category: string;

  @IsInt()
  @Min(1)
  post_id: number;
}
