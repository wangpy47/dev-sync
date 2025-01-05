import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true})
  age:number;

  @Column({nullable: true})
  phone_number: string;

  @Column({nullable: true})
  profile_image: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  blogUrl: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDt: Date;
}
