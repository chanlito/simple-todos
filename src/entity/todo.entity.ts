import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  isDone: boolean;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updatedDate: Date;

  @OneToOne(type => User, user => user.todos, { nullable: false })
  @JoinColumn()
  user: User
}
