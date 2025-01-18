import { IsString, Length } from 'class-validator';

export class GetPostsByCategoryDto {
  @IsString()
  @Length(1, 255)
  name: string;
}