import { IsString, IsOptional } from 'class-validator';

export class GetSearchPostsDto {
  @IsString()
  keyword: string;

  @IsOptional()
  @IsString()
  category?: string;
}
