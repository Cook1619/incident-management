# MikroORM Migration Guide

## Overview

The project now uses MikroORM as the database mapper, which provides powerful migration support with both **up** and **down** scripts for managing database schema changes.

## Configuration

The MikroORM configuration is in `mikro-orm.config.ts` at the root of the backend directory. It includes:
- Database connection settings (from environment variables)
- Entity paths
- Migration settings (path, table name, etc.)

## Migration Commands

### Create a New Migration
```bash
npm run migration:create
```
This generates a new migration file based on changes detected between your entities and the current database schema.

### Create an Initial Migration
```bash
npm run migration:create -- --initial
```
Creates the first migration from your entities (useful for setting up a new database).

### Run Pending Migrations (Up)
```bash
npm run migration:up
```
Executes all pending migrations in chronological order. This applies schema changes to your database.

### Rollback Last Migration (Down)
```bash
npm run migration:down
```
Reverts the last executed migration. This is useful for undoing changes during development.

### List Pending Migrations
```bash
npm run migration:pending
```
Shows which migrations haven't been executed yet.

### Fresh Migration (Drop & Recreate)
```bash
npm run migration:fresh
```
Drops all tables and re-runs all migrations from scratch. **WARNING: This deletes all data!**

### Schema Commands

Drop all tables:
```bash
npm run schema:drop
```

Create schema from entities (without migrations):
```bash
npm run schema:create
```

## Migration File Structure

Each migration file contains two methods:

```typescript
import { Migration } from '@mikro-orm/migrations';

export class Migration20260127000000 extends Migration {
  
  // Apply changes (upgrade schema)
  async up(): Promise<void> {
    this.addSql('CREATE TABLE ...');
    this.addSql('ALTER TABLE ...');
  }

  // Revert changes (downgrade schema)
  async down(): Promise<void> {
    this.addSql('DROP TABLE ...');
  }
}
```

## Typical Workflow

### 1. Development Workflow
1. Modify entities (add/remove fields, change types, etc.)
2. Create migration: `npm run migration:create`
3. Review the generated migration file
4. Run migration: `npm run migration:up`
5. If something goes wrong: `npm run migration:down`

### 2. Adding a New Field Example

Update entity:
```typescript
@Property({ length: 100, nullable: true })
department?: string;
```

Create migration:
```bash
npm run migration:create
```

MikroORM generates:
```typescript
async up(): Promise<void> {
  this.addSql('ALTER TABLE incidents ADD COLUMN department VARCHAR(100);');
}

async down(): Promise<void> {
  this.addSql('ALTER TABLE incidents DROP COLUMN department;');
}
```

Apply it:
```bash
npm run migration:up
```

### 3. Production Deployment

1. Commit migrations to version control
2. Deploy code
3. Run migrations: `npm run migration:up`
4. Start the application

## Benefits of MikroORM Migrations

✅ **Version Control**: Track all schema changes in code
✅ **Rollback Support**: Easily revert problematic changes
✅ **Team Collaboration**: Everyone shares the same schema evolution
✅ **Automated**: Generates migrations from entity changes
✅ **Safe**: Transactional migrations (all-or-nothing)
✅ **Documentation**: Migration files serve as schema change history

## Environment Variables

Make sure your `.env` file contains:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=incident_management
DB_USER=postgres
DB_PASSWORD=your_password
```

## Notes

- Migrations are stored in `src/database/migrations/`
- The `mikro_orm_migrations` table tracks which migrations have been executed
- Always review auto-generated migrations before running them
- Test migrations in development before production deployment
- Keep migration files in version control
