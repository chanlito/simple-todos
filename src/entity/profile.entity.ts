import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn() id: number;

  @Column() firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @OneToOne(type => User, user => user.profile, { cascadeAll: true })
  user: User;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updatedDate: Date;
}
