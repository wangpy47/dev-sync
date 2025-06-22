import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResumeModel } from "./resume.entity";

@Entity()
export class IntroductionModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    headline: string;

    @Column()
    description: string;


    @OneToOne(() => ResumeModel, (resume) => resume.introduction)
    @JoinColumn()
    resume: ResumeModel;
}