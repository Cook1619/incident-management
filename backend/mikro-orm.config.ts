import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { Incident } from './src/incidents/entities/incident.entity';
import { Notification } from './src/notifications/entities/notification.entity';
import { User } from './src/users/entities/user.entity';

export default defineConfig({
  entities: [Incident, Notification, User],
  dbName: process.env.DB_NAME || 'incident_management',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  
  // Migration settings
  extensions: [Migrator],
  migrations: {
    path: './src/database/migrations',
    tableName: 'mikro_orm_migrations',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
  },

  // Enable debug mode in development
  debug: process.env.NODE_ENV !== 'production',
  
  // Schema generation settings
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: true,
  },
});
