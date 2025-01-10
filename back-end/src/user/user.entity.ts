import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({nullable: true})
  phone_number: string;

  @Column({nullable: true})
  profile_image: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  blogUrl: string;

  @Column({ type: 'varchar', nullable: true })
  educationLevel: string; 

  @Column({ type: 'varchar', nullable: true })
  universityName: string; 

  @Column({ type: 'varchar', nullable: true })
  departmentName: string; 


  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDt: Date;

   
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
