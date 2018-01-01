import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Roles as RoleNames } from '../common';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'enum', enum: ['user', 'admin'] })
  name: RoleNames;

  @OneToOne(type => User, user => user.role)
  user: User;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updatedDate: Date;
}
