# Incident Management System

A full-stack incident management application similar to ServiceNow, built with React, Node.js, Express, and PostgreSQL.

## Project Structure

```
incident-management/
├── backend/          # Node.js/Express API
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── models/       # Data models
│   ├── routes/       # API routes
│   ├── database/     # Database schema
│   └── server.js     # Entry point
│
└── frontend/         # React application
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   └── store/       # Redux state management
    └── public/
```

## Tech Stack

### Frontend
- **React** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** runtime
- **Express** web framework
- **PostgreSQL** database
- **pg** PostgreSQL client

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Quick Start (Run Both Frontend & Backend)

1. Install all dependencies:
   ```bash
   npm run install-all
   ```

2. Set up PostgreSQL database:
   - Create database: `incident_management`
   - Run schema: `psql -d incident_management -f backend/database/schema.sql`

3. Configure environment:
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   cd ..
   ```

4. **Run both servers with one command:**
   ```bash
   npm run dev
   ```
   - Backend runs on http://localhost:5000
   - Frontend runs on http://localhost:3000

### Individual Setup

#### Backend Only

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database:
   - Create database: `incident_management`
   - Run schema: `psql -d incident_management -f database/schema.sql`

4. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. Start server:
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

#### Frontend Only

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Application runs on http://localhost:3000

## Features

- **Dashboard**: View all incidents in a table format
- **Incident Detail**: Click any incident to see full details
- **Redux State**: Pre-configured with dummy data for development
- **API Ready**: Backend API fully functional with PostgreSQL
- **Responsive Design**: Tailwind CSS styling

## API Endpoints

- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get single incident
- `POST /api/incidents` - Create incident
- `PUT /api/incidents/:id` - Update incident
- `DELETE /api/incidents/:id` - Delete incident

## Development Notes

### Using Dummy Data
The frontend is currently configured to use dummy data in Redux state. To switch to API:
- Uncomment API calls in `Dashboard.jsx` and `IncidentDetail.jsx`

### Database Schema
Incidents table includes:
- number, short_description, description
- priority (High/Medium/Low)
- status (New/Open/In Progress/Resolved/Closed)
- assigned_to, category
- created_at, updated_at

## Next Steps

1. Connect frontend to backend API
2. Add authentication/authorization
3. Implement create/edit/delete functionality
4. Add filtering and search
5. Add pagination
6. Add file attachments
7. Add comments/notes system
8. Add email notifications

## License

ISC
