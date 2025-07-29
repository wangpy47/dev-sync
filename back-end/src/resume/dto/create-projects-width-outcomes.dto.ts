import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateProjectDto } from "./create-project.dto";

export class CreateProjects {
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDto)
  projects: CreateProjectDto[];
}
