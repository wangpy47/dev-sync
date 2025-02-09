import { IsInt, IsString, Min } from 'class-validator';

export class UpdateCommentDto {
  @IsInt()
  @Min(1)
  comment_id: number;

  @IsString()
  comment;
}
