import { PickType } from "@nestjs/mapped-types";
import { ProjectOutcomeModel } from "../entities/project-outcome.entity";

export class SaveProjectOutcomeDto extends PickType(ProjectOutcomeModel,["task","result"]){

}