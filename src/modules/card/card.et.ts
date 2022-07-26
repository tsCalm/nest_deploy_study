import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../common/base-entity';
import { Project } from '../project/project.et';
import { Tag } from '../tag/tag.et';
import { CardTypeEnum } from './card.type';
import { DateTime } from 'luxon';

@Entity()
export class Card extends BaseEntity {
  @Column({
    type: 'enum',
    enum: CardTypeEnum,
    default: CardTypeEnum.TODO,
  })
  card_type: CardTypeEnum;

  @Column({ type: 'datetime' })
  end_date: Date;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
    default: null,
  })
  content: string;

  @ManyToOne(() => Project, (project) => project.cards)
  project: Project;

  @Column({ type: 'int', default: null })
  projectId: number;
  // @Column({
  //   type: 'varchar',
  //   select: false,
  // })
  // password: string;

  @OneToMany(() => Tag, (tag) => tag.card)
  tags: Tag[];

  @BeforeInsert()
  async convertDate() {
    if (typeof this.end_date === 'string') {
      this.end_date = DateTime.format(this.end_date, 'YYYY-MM-DD');
    }
  }
}
