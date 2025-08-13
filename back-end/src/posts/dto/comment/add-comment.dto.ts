import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ValidateLength } from 'src/common/decorators/validate-length.decorator';

export class AddCommentDto {
  @IsInt()
  @Min(1)
  post_id: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  parent_id?: number;

  @IsString()
  @ValidateLength('COMMENT_CONTENT')
  comment: string;
}
