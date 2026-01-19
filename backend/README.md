# Incident Management Backend

NestJS backend API with PostgreSQL database and Redis caching.

## Technology Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **Cache**: Redis
- **ORM**: Native pg (PostgreSQL driver)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up PostgreSQL database:
   - Create a database named `incident_management`
   - Run the schema from `database/schema.sql`

3. Set up Redis (optional but recommended):
   - Install Redis: https://redis.io/download
   - Start Redis server: `redis-server`
   - Or use Docker: `docker run -d -p 6379:6379 redis`
   - The app will work without Redis but without caching

4. Configure environment:
   - Copy `.env.example` to `.env`
   - Update database credentials
   - Add Redis URL (optional): `REDIS_URL=redis://localhost:6379`

5. Build and start the server:
   ```bash
   npm run build        # Build TypeScript to JavaScript
   npm run start:dev    # Development mode with hot reload
   npm run start:prod   # Production mode
   npm run dev          # Alias for start:dev
   ```

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── cache/                  # Redis cache module
│   ├── cache.module.ts
│   └── cache.service.ts
├── database/               # Database configuration
│   └── database.module.ts
└── incidents/              # Incidents feature module
    ├── dto/                # Data Transfer Objects
    ├── interfaces/         # TypeScript interfaces
    ├── interceptors/       # Cache interceptor
    ├── incidents.controller.ts
    ├── incidents.service.ts
    └── incidents.module.ts
```

## Features

### Caching
- GET requests are cached for 60 minutes (3600 seconds)
- Cache is automatically cleared when incidents are created, updated, or deleted
- Redis is optional - the app continues without caching if Redis is unavailable

## API Endpoints

- `GET /api/incidents` - Get all incidents (cached)
- `GET /api/incidents/:id` - Get incident by ID (cached)
- `POST /api/incidents` - Create new incident (clears cache)
- `PUT /api/incidents/:id` - Update incident (clears cache)
- `DELETE /api/incidents/:id` - Delete incident (clears cache)

## Database Schema

The `incidents` table includes:
- id (Primary Key)
- number (Unique incident number)
- short_description
- description
- priority (High, Medium, Low)
- status (New, Open, In Progress, Resolved, Closed)
- assigned_to
- category
- created_at
- updated_at
