import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Favorite, User } from './';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ default: true })
  isPublic: boolean;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updatedDate: Date;

  @OneToOne(type => User, user => user.todos, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;

  @OneToMany(type => Favorite, favorite => favorite.todo)
  favorites: Favorite[];
}
