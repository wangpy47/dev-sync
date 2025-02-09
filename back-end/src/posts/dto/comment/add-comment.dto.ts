import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class AddCommentDto {
  @IsInt()
  @Min(1)
  post_id: number;
  @IsOptional()
  parent_id?: number;

  @IsString()
  comment: string;
}
