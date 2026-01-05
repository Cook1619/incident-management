-- Create incidents table
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

-- Create index on status for faster queries
CREATE INDEX idx_incidents_status ON incidents(status);

-- Create index on priority
CREATE INDEX idx_incidents_priority ON incidents(priority);

-- Insert sample data
INSERT INTO incidents (number, short_description, description, priority, status, assigned_to, category)
VALUES 
  ('INC0001001', 'Unable to access email', 'User cannot log into Outlook, receiving authentication error', 'High', 'Open', 'John Doe', 'Email'),
  ('INC0001002', 'Printer not working', 'Office printer on 3rd floor is offline', 'Medium', 'In Progress', 'Jane Smith', 'Hardware'),
  ('INC0001003', 'Software installation request', 'Need Adobe Acrobat installed on workstation', 'Low', 'New', NULL, 'Software'),
  ('INC0001004', 'Network connectivity issues', 'Cannot connect to VPN from home', 'High', 'Open', 'Bob Johnson', 'Network'),
  ('INC0001005', 'Password reset required', 'User forgot domain password', 'Medium', 'Resolved', 'Alice Williams', 'Access');
