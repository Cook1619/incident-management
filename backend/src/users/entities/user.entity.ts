import { Entity, PrimaryKey, Property, Collection, OneToMany } from '@mikro-orm/core';
import { Incident } from '../../incidents/entities/incident.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true, length: 100 })
  email!: string;

  @Property({ length: 100 })
  firstName!: string;

  @Property({ length: 100 })
  lastName!: string;

  @Property({ length: 50, nullable: true })
  role?: string;

  @Property({ length: 100, nullable: true })
  department?: string;

  @Property({ default: true })
  active: boolean = true;

  @OneToMany(() => Incident, incident => incident.assignedToUser)
  assignedIncidents = new Collection<Incident>(this);

  @Property({ fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ fieldName: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // Virtual property for full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
