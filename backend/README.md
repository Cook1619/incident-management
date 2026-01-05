# Incident Management Backend

Node.js/Express backend API with PostgreSQL database.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up PostgreSQL database:
   - Create a database named `incident_management`
   - Run the schema from `database/schema.sql`

3. Configure environment:
   - Copy `.env.example` to `.env`
   - Update database credentials

4. Start the server:
   ```bash
   npm run dev  # Development mode with nodemon
   npm start    # Production mode
   ```

## API Endpoints

- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get incident by ID
- `POST /api/incidents` - Create new incident
- `PUT /api/incidents/:id` - Update incident
- `DELETE /api/incidents/:id` - Delete incident

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
