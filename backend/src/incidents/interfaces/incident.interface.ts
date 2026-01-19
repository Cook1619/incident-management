export interface Incident {
  id: number;
  number: string;
  short_description: string;
  description?: string;
  priority: string;
  status: string;
  assigned_to?: string;
  category?: string;
  created_at: Date;
  updated_at: Date;
}
