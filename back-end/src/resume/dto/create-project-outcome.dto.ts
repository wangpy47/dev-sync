import { IsString, IsNotEmpty, } from 'class-validator';

export class CreateOutcomeDto {
 
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  task: string;

  @IsString()
  @IsNotEmpty()
  result: string;

}
