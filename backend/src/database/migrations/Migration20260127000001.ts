import { Migration } from '@mikro-orm/migrations';

export class Migration20260127000001 extends Migration {

  async up(): Promise<void> {
    // Insert seed data for incidents
    this.addSql(`
      INSERT INTO incidents (number, short_description, description, priority, status, assigned_to, category, created_at, updated_at)
      VALUES 
        ('INC0001001', 'Unable to access email', 'User cannot log into Outlook, receiving authentication error', 'High', 'Open', 'John Doe', 'Email', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001002', 'Printer not working', 'Office printer on 3rd floor is offline', 'Medium', 'In Progress', 'Jane Smith', 'Hardware', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001003', 'Software installation request', 'Need Adobe Acrobat installed on workstation', 'Low', 'New', NULL, 'Software', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001004', 'Network connectivity issues', 'Cannot connect to VPN from home', 'High', 'Open', 'Bob Johnson', 'Network', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001005', 'Password reset required', 'User forgot domain password', 'Medium', 'Resolved', 'Alice Williams', 'Access', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001006', 'Laptop overheating', 'Employee laptop shuts down after 30 minutes of use', 'High', 'In Progress', 'John Doe', 'Hardware', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001007', 'Cannot access shared drive', 'Error message when trying to map Z: drive', 'Medium', 'Open', 'Bob Johnson', 'Network', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001008', 'Monitor flickering', 'Display shows horizontal lines intermittently', 'Low', 'New', NULL, 'Hardware', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001009', 'Slow computer performance', 'System takes 10+ minutes to boot up', 'Medium', 'In Progress', 'Jane Smith', 'Performance', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001010', 'Database connection timeout', 'Application cannot connect to production database', 'Critical', 'Open', 'John Doe', 'Database', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001011', 'Mobile app crash on iOS', 'App crashes when opening notifications', 'High', 'New', 'Alice Williams', 'Mobile', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001012', 'Webex audio issues', 'Participants cannot hear presenter during meetings', 'Medium', 'Resolved', 'Jane Smith', 'Collaboration', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001013', 'Server disk space low', 'Production server at 95% capacity', 'Critical', 'Open', 'Bob Johnson', 'Infrastructure', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001014', 'Two-factor authentication not working', 'SMS codes not being received', 'High', 'In Progress', 'Alice Williams', 'Security', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('INC0001015', 'Payroll system error', 'Cannot process timesheet submissions', 'Critical', 'Resolved', 'John Doe', 'Application', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT (number) DO NOTHING;
    `);
  }

  async down(): Promise<void> {
    // Remove seed data
    this.addSql(`
      DELETE FROM incidents 
      WHERE number IN (
        'INC0001001', 'INC0001002', 'INC0001003', 'INC0001004', 'INC0001005',
        'INC0001006', 'INC0001007', 'INC0001008', 'INC0001009', 'INC0001010',
        'INC0001011', 'INC0001012', 'INC0001013', 'INC0001014', 'INC0001015'
      );
    `);
  }

}
