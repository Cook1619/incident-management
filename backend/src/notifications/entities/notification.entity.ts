import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'notifications' })
export class Notification {
  @PrimaryKey()
  id!: number;

  @Property({ length: 255 })
  title!: string;

  @Property({ type: 'text', nullable: true })
  message?: string;

  @Property({ length: 50 })
  type!: string;

  @Property({ default: false })
  read: boolean = false;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();
}
