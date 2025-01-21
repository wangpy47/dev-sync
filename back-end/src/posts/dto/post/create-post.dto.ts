import { IsString, IsInt, Min, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  content: string;

  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  user_id: number;
}
