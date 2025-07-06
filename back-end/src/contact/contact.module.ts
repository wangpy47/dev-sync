import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModel } from './entity/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactModel])],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
