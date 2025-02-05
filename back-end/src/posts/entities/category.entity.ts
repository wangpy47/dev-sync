import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'varchar', length: 255 })
  category: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}