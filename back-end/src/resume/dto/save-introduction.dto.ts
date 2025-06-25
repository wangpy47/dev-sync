import { PickType } from "@nestjs/mapped-types";
import { IntroductionModel } from "../entities/introduction.entity";

export class SaveIntroductionDto extends PickType(IntroductionModel,["headline", "description"]) {
}