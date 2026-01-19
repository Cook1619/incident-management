export class CreateIncidentDto {
  short_description: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in progress' | 'resolved' | 'closed';
  assigned_to?: string;
  category?: string;
}
