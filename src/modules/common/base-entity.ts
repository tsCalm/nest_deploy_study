import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  static of<T>(type: { new (): T }, params: Partial<T>): T {
    const obj = new type();

    Object.assign(obj, params);

    return obj;
  }
}
