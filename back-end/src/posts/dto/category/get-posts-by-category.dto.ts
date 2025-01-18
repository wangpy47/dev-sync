import { IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetPostsByCategoryDto {
  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string;
}