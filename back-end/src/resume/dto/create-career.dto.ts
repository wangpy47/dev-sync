import { IsString, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateCareerDto {
  @IsUUID()
  id: string;

  @IsString()
  company: string;

  @IsString()
  position: string;

  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsString()
  description: string;
}