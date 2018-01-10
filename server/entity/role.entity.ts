import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Roles } from '../common';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'enum', enum: ['admin', 'user'] })
  name: Roles;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updatedDate: Date;

  @OneToOne(type => User, user => user.role)
  user: User;
}
