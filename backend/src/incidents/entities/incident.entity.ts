import { Entity, PrimaryKey, Property, Index, ManyToOne } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'incidents' })
export class Incident {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true, length: 50 })
  number!: string;

  @Property({ length: 255, fieldName: 'short_description' })
  shortDescription!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Index()
  @Property({ length: 20, default: 'Medium' })
  priority: string = 'Medium';

  @Index()
  @Property({ length: 50, default: 'New' })
  status: string = 'New';

  // Legacy field - keeping for backward compatibility during migration
  @Property({ length: 100, nullable: true, fieldName: 'assigned_to' })
  assignedTo?: string;

  // New relationship to User
  @ManyToOne(() => User, { nullable: true, fieldName: 'assigned_to_user_id' })
  assignedToUser?: User;

  @Property({ length: 100, nullable: true })
  category?: string;

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
