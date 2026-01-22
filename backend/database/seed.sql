-- Seed data for incidents table
-- This file contains sample data for testing and development

-- Clear existing data (optional - uncomment if you want to reset)
-- TRUNCATE TABLE incidents RESTART IDENTITY CASCADE;

-- Insert seed data
INSERT INTO incidents (number, short_description, description, priority, status, assigned_to, category)
VALUES 
  ('INC0001001', 'Unable to access email', 'User cannot log into Outlook, receiving authentication error', 'High', 'Open', 'John Doe', 'Email'),
  ('INC0001002', 'Printer not working', 'Office printer on 3rd floor is offline', 'Medium', 'In Progress', 'Jane Smith', 'Hardware'),
  ('INC0001003', 'Software installation request', 'Need Adobe Acrobat installed on workstation', 'Low', 'New', NULL, 'Software'),
  ('INC0001004', 'Network connectivity issues', 'Cannot connect to VPN from home', 'High', 'Open', 'Bob Johnson', 'Network'),
  ('INC0001005', 'Password reset required', 'User forgot domain password', 'Medium', 'Resolved', 'Alice Williams', 'Access'),
  ('INC0001006', 'Laptop overheating', 'Employee laptop shuts down after 30 minutes of use', 'High', 'In Progress', 'John Doe', 'Hardware'),
  ('INC0001007', 'Cannot access shared drive', 'Error message when trying to map Z: drive', 'Medium', 'Open', 'Bob Johnson', 'Network'),
  ('INC0001008', 'Monitor flickering', 'Display shows horizontal lines intermittently', 'Low', 'New', NULL, 'Hardware'),
  ('INC0001009', 'Slow computer performance', 'System takes 10+ minutes to boot up', 'Medium', 'In Progress', 'Jane Smith', 'Performance'),
  ('INC0001010', 'Database connection timeout', 'Application cannot connect to production database', 'Critical', 'Open', 'John Doe', 'Database'),
  ('INC0001011', 'Mobile app crash on iOS', 'App crashes when opening notifications', 'High', 'New', 'Alice Williams', 'Mobile'),
  ('INC0001012', 'Webex audio issues', 'Participants cannot hear presenter during meetings', 'Medium', 'Resolved', 'Jane Smith', 'Collaboration'),
  ('INC0001013', 'Server disk space low', 'Production server at 95% capacity', 'Critical', 'Open', 'Bob Johnson', 'Infrastructure'),
  ('INC0001014', 'Two-factor authentication not working', 'SMS codes not being received', 'High', 'In Progress', 'Alice Williams', 'Security'),
  ('INC0001015', 'Payroll system error', 'Cannot process timesheet submissions', 'Critical', 'Resolved', 'John Doe', 'Application')
ON CONFLICT (number) DO NOTHING;
