import { IsInt, IsString, Min } from 'class-validator';
import { ValidateLength } from 'src/common/decorators/validate-length.decorator';

export class UpdateCommentDto {
  @IsInt()
  @Min(1)
  comment_id: number;

  @IsString()
  @ValidateLength('COMMENT_CONTENT')
  comment:string;
}
