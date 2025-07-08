import { IsNumber, IsOptional } from 'class-validator';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

export class PaginatePostDto extends BasePaginationDto {
  @IsNumber()
  @IsOptional()
  where__likecount__more_than: number;

  @IsNumber()
  @IsOptional()
  where__title__i_like: string;
}
