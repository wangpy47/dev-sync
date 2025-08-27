import { IsString, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateAchievementDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  organization?: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  description?: string;
}