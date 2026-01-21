export class SearchIncidentDto {
  status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  category?: 'Hardware' | 'Software' | 'Network' | 'Security' | 'Database' | 'Infrastructure' | 'Application' | 'Other';
  search?: string; // For searching in title/description
  sortBy?: string; // e.g., 'created_at', 'priority', 'status'
  sortOrder?: 'ASC' | 'DESC';
}
