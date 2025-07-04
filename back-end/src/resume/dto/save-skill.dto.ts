import { IsArray } from "class-validator";


export class SaveSkillDto{

    @IsArray()
    str_skills?: string[];

    @IsArray()
    fam_skills?: string[];

}