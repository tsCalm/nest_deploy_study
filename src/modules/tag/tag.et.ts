import { Column, Entity, ManyToOne } from 'typeorm';
import { Card } from '../card/card.et';

import { BaseEntity } from '../common/base-entity';
import { Project } from '../project/project.et';

@Entity()
export class Tag extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
    default: null,
  })
  color: string;

  @ManyToOne(() => Card, (card) => card.tags)
  card: Card;
}
