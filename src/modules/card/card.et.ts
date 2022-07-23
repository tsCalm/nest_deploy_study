import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common/base-entity';
import { Project } from '../project/project.et';
import { CardTypeEnum } from './card.type';

@Entity()
export class Card extends BaseEntity {
  @Column({
    type: 'enum',
    enum: CardTypeEnum,
    default: CardTypeEnum.TODO,
  })
  card_type: CardTypeEnum;

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
}
