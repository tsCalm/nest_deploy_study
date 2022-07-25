import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '../card/card.et';

import { BaseEntity } from '../common/base-entity';
import { User } from '../user/user.et';
import { passwordHash } from '../utils/hash';
import { DateTime } from 'luxon';

@Entity()
export class Project extends BaseEntity {
  @Column({ type: 'datetime' })
  start_date: Date;

  @Column({ type: 'datetime' })
  end_date: Date;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  content: string;

  @OneToMany(() => Card, (card) => card.project)
  cards: Card[];

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  users: User[];

  @BeforeInsert()
  async convertInputData() {
    if (typeof this.start_date === 'string') {
      this.start_date = await DateTime.fromFormat(
        this.start_date,
        'YYYY-MM-DD',
      );
    }
    if (typeof this.end_date === 'string') {
      this.end_date = await DateTime.fromFormat(this.end_date, 'YYYY-MM-DD');
    }
  }
}
