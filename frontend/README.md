# Incident Management Frontend

React application built with Vite, Tailwind CSS, and Redux Toolkit.

## Features

- Dashboard view listing all incidents
- Detailed incident view
- Redux state management with dummy data
- Tailwind CSS for styling
- React Router for navigation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── store/           # Redux store and slices
│   └── slices/      # Redux slices
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Redux State

The application uses Redux Toolkit with a dummy incident state. The `incidentsSlice` includes:
- Initial state with 5 sample incidents
- Async thunks for API calls (ready to use when backend is connected)
- Actions for managing selected incident
- Selectors for accessing state

To switch from dummy data to API:
- Uncomment `dispatch(fetchIncidents())` in Dashboard.jsx
- Uncomment `dispatch(fetchIncidentById(id))` in IncidentDetail.jsx

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
