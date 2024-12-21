import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactMailDto } from './contact.dto';

@Controller('contact')
export class ContactController {
constructor(
    private readonly contactService: ContactService
  ) {}


  @Post('contact-submit')
  async submitInquiry(@Body() contact: ContactMailDto): Promise<string> {
    console.log(contact)
    return this.contactService.sendInquiryEmail(contact);
  }

}
