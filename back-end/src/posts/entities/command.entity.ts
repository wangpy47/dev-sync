import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    comment_id:number;

    @Column({type:'text', nullable:false})
    comment:string;

    @ManyToOne(()=>User, {nullable:false, onDelete:'CASCADE'})
    user:User;

    @ManyToOne(()=>Post, {nullable:false, onDelete:'CASCADE'})
    post:Post;

    @ManyToOne(()=>Comment, {nullable:true, onDelete:'CASCADE'})
    parent:Comment;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
      createdAt: Date;
}