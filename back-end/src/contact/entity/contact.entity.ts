import { BaseModel } from 'src/common/entity/base.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class ContactModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @Column()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Column()
  @IsString({ message: 'Subject must be a string' })
  title: string;

  @Column()
  @IsString({ message: 'Content must be a string' })
  content: string;

  @Column()
  @IsOptional()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
