import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { Profile } from './profile.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true })
  email: string;

  @Column() password: string;

  @CreateDateColumn() createdDate: Date;

  @UpdateDateColumn() updatedDate: Date;

  @OneToOne(type => Profile, profile => profile.user, {
    nullable: false,
    cascadeAll: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  profile: Profile;

  @OneToOne(type => Role, role => role.user, {
    nullable: false,
    cascadeAll: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  role: Role;
}
