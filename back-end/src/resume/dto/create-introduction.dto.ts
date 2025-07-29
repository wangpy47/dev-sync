import { IsString } from 'class-validator';

export class CreateIntroductionDto {
  @IsString()
  headline: string;

  @IsString()
  description: string;
}
