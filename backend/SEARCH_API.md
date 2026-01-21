# 🔍 Incident Search API Documentation

## Endpoint
```
GET /api/incidents/search
```

## Query Parameters

All parameters are **optional** and can be combined:

| Parameter | Type | Values | Description |
|-----------|------|--------|-------------|
| `status` | string | `Open`, `In Progress`, `Resolved`, `Closed` | Filter by incident status |
| `priority` | string | `Low`, `Medium`, `High`, `Critical` | Filter by priority level |
| `category` | string | `Hardware`, `Software`, `Network`, `Security`, `Database`, `Infrastructure`, `Application`, `Other` | Filter by category |
| `search` | string | Any text | Search in title (short_description) and description fields |
| `sortBy` | string | `created_at`, `updated_at`, `priority`, `status`, `category`, `number` | Column to sort by (default: `created_at`) |
| `sortOrder` | string | `ASC`, `DESC` | Sort direction (default: `DESC`) |

## Examples

### 1. Find all open high-priority incidents
```
GET /api/incidents/search?status=Open&priority=High
```

### 2. Find all security incidents
```
GET /api/incidents/search?category=Security
```

### 3. Search for incidents containing "database"
```
GET /api/incidents/search?search=database
```

### 4. Find critical incidents sorted by creation date (oldest first)
```
GET /api/incidents/search?priority=Critical&sortBy=created_at&sortOrder=ASC
```

### 5. Complex search: Open security incidents with "breach" in description
```
GET /api/incidents/search?status=Open&category=Security&search=breach
```

### 6. Find all incidents sorted by priority (highest first)
```
GET /api/incidents/search?sortBy=priority&sortOrder=DESC
```

## Response Format

Returns an array of incidents matching the criteria:

```json
[
  {
    "id": 1,
    "number": "INC000001",
    "short_description": "Database connection timeout",
    "description": "Users reporting slow database queries",
    "status": "Open",
    "priority": "High",
    "category": "Database",
    "assigned_to": "john.doe",
    "created_at": "2026-01-20T10:00:00Z",
    "updated_at": "2026-01-20T10:00:00Z"
  },
  {
    "id": 2,
    "number": "INC000002",
    "short_description": "Security breach detected",
    "description": "Unauthorized access attempt on production server",
    "status": "In Progress",
    "priority": "Critical",
    "category": "Security",
    "assigned_to": "jane.smith",
    "created_at": "2026-01-20T09:30:00Z",
    "updated_at": "2026-01-20T09:45:00Z"
  }
]
```

## Caching

- Search results are cached for **30 minutes** (1800 seconds)
- Cache is automatically cleared when incidents are created, updated, or deleted
- Same search parameters will return cached results for better performance

## Implementation Details

### SQL Query Building
The search function dynamically builds SQL queries based on provided parameters:

```sql
-- Example: ?status=Open&priority=High&search=database
SELECT * FROM incidents 
WHERE status = 'Open' 
  AND priority = 'High' 
  AND (short_description ILIKE '%database%' OR description ILIKE '%database%')
ORDER BY created_at DESC
```

### Search Features
- **Case-insensitive search**: Uses PostgreSQL's `ILIKE` operator
- **Multiple field search**: Searches in both title and description
- **Safe parameter handling**: Prevents SQL injection via parameterized queries
- **Flexible filtering**: Combine any number of filters
- **Custom sorting**: Sort by any valid column in any direction

## Usage in Frontend

### Using fetch:
```javascript
// Simple filter
const response = await fetch('/api/incidents/search?status=Open&priority=High');
const incidents = await response.json();

// With search term
const params = new URLSearchParams({
  category: 'Security',
  search: 'breach',
  sortBy: 'created_at',
  sortOrder: 'DESC'
});
const response = await fetch(`/api/incidents/search?${params}`);
const incidents = await response.json();
```

### Using Redux Toolkit Query:
```javascript
// In your RTK Query slice
searchIncidents: builder.query({
  query: (params) => ({
    url: '/incidents/search',
    params, // { status: 'Open', priority: 'High', ... }
  }),
}),
```

## Performance Considerations

1. **Indexing**: Consider adding database indexes on frequently filtered columns:
   ```sql
   CREATE INDEX idx_incidents_status ON incidents(status);
   CREATE INDEX idx_incidents_priority ON incidents(priority);
   CREATE INDEX idx_incidents_category ON incidents(category);
   ```

2. **Full-text search**: For better search performance on large datasets, consider PostgreSQL's full-text search:
   ```sql
   CREATE INDEX idx_incidents_search ON incidents 
   USING gin(to_tsvector('english', short_description || ' ' || COALESCE(description, '')));
   ```

3. **Pagination**: For large result sets, consider adding pagination:
   ```typescript
   @Query('page') page: number = 1,
   @Query('limit') limit: number = 50
   ```

## Next Steps

You can extend this search with:
- [ ] Pagination (page & limit parameters)
- [ ] Date range filtering (created_at, updated_at)
- [ ] Assigned user filtering
- [ ] Advanced full-text search
- [ ] Fuzzy matching
- [ ] Saved searches
- [ ] Export results to CSV
