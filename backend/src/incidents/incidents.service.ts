import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { CacheService } from '../cache/cache.service';
import { Cacheable } from '../cache/cacheable.decorator';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { SearchIncidentDto } from './dto/search-incident.dto';
import { Incident } from './entities/incident.entity';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: EntityRepository<Incident>,
    private readonly em: EntityManager,
    private readonly cacheService: CacheService,
  ) {}

  @Cacheable(3600) // Cache for 60 minutes
  async findAll(): Promise<Incident[]> {
    return this.incidentRepository.findAll({
      orderBy: { createdAt: 'DESC' },
    });
  }

  @Cacheable(3600) // Cache for 60 minutes
  async findOne(id: number): Promise<Incident> {
    const incident = await this.incidentRepository.findOne({ id });
    
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    
    return incident;
  }

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    // Generate incident number
    const lastIncident = await this.incidentRepository.findOne(
      { number: { $like: 'INC%' } },
      { orderBy: { number: 'DESC' } }
    );
    
    let nextNumber = 1;
    if (lastIncident?.number) {
      const lastNumber = parseInt(lastIncident.number.substring(3));
      nextNumber = lastNumber + 1;
    }
    const incidentNumber = `INC${nextNumber.toString().padStart(7, '0')}`;

    const incident = this.incidentRepository.create({
      number: incidentNumber,
      shortDescription: createIncidentDto.short_description,
      description: createIncidentDto.description,
      priority: createIncidentDto.priority,
      status: createIncidentDto.status,
      assignedTo: createIncidentDto.assigned_to,
      category: createIncidentDto.category,
    });

    await this.em.persistAndFlush(incident);

    // Clear cache
    await this.cacheService.clearIncidentsCache();

    return incident;
  }

  async update(id: number, updateIncidentDto: UpdateIncidentDto): Promise<Incident> {
    const incident = await this.findOne(id);

    if (updateIncidentDto.short_description !== undefined) {
      incident.shortDescription = updateIncidentDto.short_description;
    }
    if (updateIncidentDto.description !== undefined) {
      incident.description = updateIncidentDto.description;
    }
    if (updateIncidentDto.priority !== undefined) {
      incident.priority = updateIncidentDto.priority;
    }
    if (updateIncidentDto.status !== undefined) {
      incident.status = updateIncidentDto.status;
    }
    if (updateIncidentDto.assigned_to !== undefined) {
      incident.assignedTo = updateIncidentDto.assigned_to;
    }
    if (updateIncidentDto.category !== undefined) {
      incident.category = updateIncidentDto.category;
    }

    incident.updatedAt = new Date();

    await this.em.flush();

    // Clear cache
    await this.cacheService.clearIncidentsCache();

    return incident;
  }

  async remove(id: number): Promise<void> {
    const incident = await this.findOne(id);

    await this.em.removeAndFlush(incident);

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
    const where: any = {};

    // Filter by status
    if (searchDto.status) {
      where.status = searchDto.status;
    }

    // Filter by priority
    if (searchDto.priority) {
      where.priority = searchDto.priority;
    }

    // Filter by category
    if (searchDto.category) {
      where.category = searchDto.category;
    }

    // Search in title and description (case-insensitive)
    if (searchDto.search) {
      where.$or = [
        { shortDescription: { $ilike: `%${searchDto.search}%` } },
        { description: { $ilike: `%${searchDto.search}%` } },
      ];
    }

    // Build the ORDER BY clause
    const validSortColumns = ['createdAt', 'updatedAt', 'priority', 'status', 'category', 'number'];
    const sortBy = validSortColumns.includes(searchDto.sortBy || '') 
      ? searchDto.sortBy 
      : 'createdAt';
    const sortOrder = searchDto.sortOrder === 'ASC' ? 'ASC' : 'DESC';

    return this.incidentRepository.find(where, {
      orderBy: { [sortBy]: sortOrder },
    });
  }
}
