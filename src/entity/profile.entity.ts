import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn() id: number;

  @Column() firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updatedDate: Date;

  @OneToOne(type => User, user => user.profile, {
    onDelete: 'SET NULL',
    cascadeAll: true
  })
  @JoinColumn()
  user: User;
}
