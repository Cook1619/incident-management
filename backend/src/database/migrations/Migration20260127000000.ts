import { Migration } from '@mikro-orm/migrations';

export class Migration20260127000000 extends Migration {

  async up(): Promise<void> {
    // Create incidents table
    this.addSql(`
      CREATE TABLE IF NOT EXISTS incidents (
        id SERIAL PRIMARY KEY,
        number VARCHAR(50) UNIQUE NOT NULL,
        short_description VARCHAR(255) NOT NULL,
        description TEXT,
        priority VARCHAR(20) DEFAULT 'Medium',
        status VARCHAR(50) DEFAULT 'New',
        assigned_to VARCHAR(100),
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes on status and priority
    this.addSql('CREATE INDEX idx_incidents_status ON incidents(status);');
    this.addSql('CREATE INDEX idx_incidents_priority ON incidents(priority);');

    // Create notifications table
    this.addSql(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT,
        type VARCHAR(50) NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  async down(): Promise<void> {
    // Drop tables in reverse order
    this.addSql('DROP TABLE IF EXISTS notifications;');
    this.addSql('DROP TABLE IF EXISTS incidents;');
  }

}
