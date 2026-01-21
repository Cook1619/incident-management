import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { DATABASE_POOL } from '../database/database.module';
import { CacheService } from '../cache/cache.service';
import { Cacheable } from '../cache/cacheable.decorator';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { SearchIncidentDto } from './dto/search-incident.dto';
import { Incident } from './interfaces/incident.interface';

@Injectable()
export class IncidentsService {
  constructor(
    @Inject(DATABASE_POOL) private readonly pool: Pool,
    private readonly cacheService: CacheService,
  ) {}

  @Cacheable(3600) // Cache for 60 minutes
  async findAll(): Promise<Incident[]> {
    const result = await this.pool.query(
      'SELECT * FROM incidents ORDER BY created_at DESC',
    );
    return result.rows;
  }

  @Cacheable(3600) // Cache for 60 minutes
  async findOne(id: number): Promise<Incident> {
    const result = await this.pool.query(
      'SELECT * FROM incidents WHERE id = $1',
      [id],
    );
    
    if (result.rows.length === 0) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    
    return result.rows[0];
  }

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    // Generate incident number
    const numberResult = await this.pool.query(
      "SELECT 'INC' || LPAD(CAST(COALESCE(MAX(CAST(SUBSTRING(number FROM 4) AS INTEGER)), 0) + 1 AS TEXT), 6, '0') AS next_number FROM incidents WHERE number LIKE 'INC%'",
    );
    const incidentNumber = numberResult.rows[0].next_number;

    const result = await this.pool.query(
      `INSERT INTO incidents (number, short_description, description, priority, status, assigned_to, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        incidentNumber,
        createIncidentDto.short_description,
        createIncidentDto.description || null,
        createIncidentDto.priority,
        createIncidentDto.status,
        createIncidentDto.assigned_to || null,
        createIncidentDto.category || null,
      ],
    );

    // Clear cache
    await this.cacheService.clearIncidentsCache();

    return result.rows[0];
  }

  async update(id: number, updateIncidentDto: UpdateIncidentDto): Promise<Incident> {
    // Check if incident exists
    await this.findOne(id);

    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updateIncidentDto.short_description !== undefined) {
      fields.push(`short_description = $${paramCount++}`);
      values.push(updateIncidentDto.short_description);
    }
    if (updateIncidentDto.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(updateIncidentDto.description);
    }
    if (updateIncidentDto.priority !== undefined) {
      fields.push(`priority = $${paramCount++}`);
      values.push(updateIncidentDto.priority);
    }
    if (updateIncidentDto.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(updateIncidentDto.status);
    }
    if (updateIncidentDto.assigned_to !== undefined) {
      fields.push(`assigned_to = $${paramCount++}`);
      values.push(updateIncidentDto.assigned_to);
    }
    if (updateIncidentDto.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(updateIncidentDto.category);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await this.pool.query(
      `UPDATE incidents SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values,
    );

    // Clear cache
    await this.cacheService.clearIncidentsCache();

    return result.rows[0];
  }

  async remove(id: number): Promise<void> {
    // Check if incident exists
    await this.findOne(id);

    await this.pool.query('DELETE FROM incidents WHERE id = $1', [id]);

    // Clear cache
    await this.cacheService.clearIncidentsCache();
  }

  /**
   * Search and filter incidents with multiple criteria
   * @param searchDto - Search parameters (status, priority, category, search term, sorting)
   * @returns Array of matching incidents
   * 
   * Example usage:
   * GET /api/incidents/search?status=Open&priority=High
   * GET /api/incidents/search?category=Security&search=database
   * GET /api/incidents/search?sortBy=priority&sortOrder=DESC
   */
  @Cacheable(1800) // Cache for 30 minutes (searches change more often)
  async search(searchDto: SearchIncidentDto): Promise<Incident[]> {
    const conditions: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    // Filter by status
    if (searchDto.status) {
      conditions.push(`status = $${paramCount++}`);
      values.push(searchDto.status);
    }

    // Filter by priority
    if (searchDto.priority) {
      conditions.push(`priority = $${paramCount++}`);
      values.push(searchDto.priority);
    }

    // Filter by category
    if (searchDto.category) {
      conditions.push(`category = $${paramCount++}`);
      values.push(searchDto.category);
    }

    // Search in title and description (case-insensitive)
    if (searchDto.search) {
      conditions.push(
        `(short_description ILIKE $${paramCount} OR description ILIKE $${paramCount})`,
      );
      values.push(`%${searchDto.search}%`);
      paramCount++;
    }

    // Build the WHERE clause
    const whereClause = conditions.length > 0 
      ? `WHERE ${conditions.join(' AND ')}` 
      : '';

    // Build the ORDER BY clause
    const validSortColumns = ['created_at', 'updated_at', 'priority', 'status', 'category', 'number'];
    const sortBy = validSortColumns.includes(searchDto.sortBy || '') 
      ? searchDto.sortBy 
      : 'created_at';
    const sortOrder = searchDto.sortOrder === 'ASC' ? 'ASC' : 'DESC';
    const orderByClause = `ORDER BY ${sortBy} ${sortOrder}`;

    // Execute the query
    const query = `SELECT * FROM incidents ${whereClause} ${orderByClause}`;
    const result = await this.pool.query(query, values);

    return result.rows;
  }
}
