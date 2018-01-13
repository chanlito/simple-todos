import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Todo, User } from './';

@Entity()
export class Favorite {
  @ManyToOne(type => User, user => user.favorites, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(type => Todo, todo => todo.favorites, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn()
  todo: Todo;
}
