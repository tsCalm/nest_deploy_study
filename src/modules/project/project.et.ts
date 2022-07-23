import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '../card/card.et';

import { BaseEntity } from '../common/base-entity';
import { passwordHash } from '../utils/hash';

@Entity()
export class Project extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @OneToMany(() => Card, (card) => card.project)
  cards: Card[];
  // @Column({
  //   type: 'varchar',
  // })
  // email: string;

  // @Column({
  //   type: 'varchar',
  //   select: false,
  // })
  // password: string;
}
