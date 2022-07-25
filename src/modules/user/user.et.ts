import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../common/base-entity';
import { Project } from '../project/project.et';
import { passwordHash } from '../utils/hash';

@Entity()
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  position: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await passwordHash(this.password);
    }
  }
}
