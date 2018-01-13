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

import { Favorite, Profile, Role, Todo } from './';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true })
  email: string;

  @Column() password: string;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updatedDate: Date;

  @OneToOne(type => Profile, profile => profile.user)
  profile: Profile;

  @OneToOne(type => Role, role => role.user, {
    onDelete: 'SET NULL',
    cascadeInsert: true,
    cascadeUpdate: true
  })
  @JoinColumn()
  role: Role;

  @OneToMany(type => Todo, todo => todo.user)
  todos: Todo[];

  @OneToMany(type => Favorite, favorite => favorite.user)
  favorites: Favorite[];
}
