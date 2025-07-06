import { PickType } from "@nestjs/mapped-types";
import { ContactModel } from "../entity/contact.entity";

export class CreateContactDto extends PickType(ContactModel,["name","email","title","content","password"]){}