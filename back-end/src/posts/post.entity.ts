import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  post_id?: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Category, (category) => category.posts, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category; 

  @ManyToOne(() => User, (user) => user.name, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User; 

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'int', default: 0 })
  viewCount: number;
}
