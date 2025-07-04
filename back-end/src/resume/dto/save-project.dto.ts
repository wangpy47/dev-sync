import { PickType } from "@nestjs/mapped-types";
import { ProjectModel } from "../entities/project.entity";

export class SaveProjectDto extends PickType(ProjectModel,["name","description"]){}