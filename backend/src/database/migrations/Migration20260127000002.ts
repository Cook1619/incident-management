import { Migration } from '@mikro-orm/migrations';

export class Migration20260127000002 extends Migration {

  async up(): Promise<void> {
    // Create users table
    this.addSql(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(50),
        department VARCHAR(100),
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create index on email for faster lookups
    this.addSql('CREATE INDEX idx_users_email ON users(email);');

    // Insert seed users based on existing assigned_to values
    this.addSql(`
      INSERT INTO users (email, first_name, last_name, role, department, active)
      VALUES 
        ('john.doe@company.com', 'John', 'Doe', 'Senior Technician', 'IT Support', true),
        ('jane.smith@company.com', 'Jane', 'Smith', 'Technician', 'IT Support', true),
        ('bob.johnson@company.com', 'Bob', 'Johnson', 'Network Admin', 'Infrastructure', true),
        ('alice.williams@company.com', 'Alice', 'Williams', 'Security Specialist', 'Security', true);
    `);

    // Add assigned_to_user_id column to incidents table
    this.addSql('ALTER TABLE incidents ADD COLUMN assigned_to_user_id INTEGER;');

    // Add foreign key constraint
    this.addSql(`
      ALTER TABLE incidents 
      ADD CONSTRAINT fk_incidents_assigned_to_user 
      FOREIGN KEY (assigned_to_user_id) 
      REFERENCES users(id) 
      ON DELETE SET NULL;
    `);

    // Migrate existing data: map assigned_to names to user IDs
    this.addSql(`
      UPDATE incidents SET assigned_to_user_id = users.id
      FROM users
      WHERE incidents.assigned_to = users.first_name || ' ' || users.last_name;
    `);

    // Create index on assigned_to_user_id for faster queries
    this.addSql('CREATE INDEX idx_incidents_assigned_to_user ON incidents(assigned_to_user_id);');
  }

  async down(): Promise<void> {
    // Remove foreign key and column
    this.addSql('ALTER TABLE incidents DROP CONSTRAINT IF EXISTS fk_incidents_assigned_to_user;');
    this.addSql('ALTER TABLE incidents DROP COLUMN IF EXISTS assigned_to_user_id;');

    // Drop users table
    this.addSql('DROP TABLE IF EXISTS users;');
  }

}
