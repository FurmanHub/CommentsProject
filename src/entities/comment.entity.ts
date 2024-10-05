import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    homePage: string;

    @Column()
    text: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @Column( { nullable: true })
    parentCommentId: number;
}