import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunks for API calls
export const fetchIncidents = createAsyncThunk(
  'incidents/fetchIncidents',
  async () => {
    const response = await axios.get('/api/incidents')
    return response.data
  }
)

export const fetchIncidentById = createAsyncThunk(
  'incidents/fetchIncidentById',
  async (id) => {
    const response = await axios.get(`/api/incidents/${id}`)
    return response.data
  }
)

export const createIncident = createAsyncThunk(
  'incidents/createIncident',
  async (incidentData) => {
    const response = await axios.post('/api/incidents', incidentData)
    return response.data
  }
)

export const updateIncident = createAsyncThunk(
  'incidents/updateIncident',
  async ({ id, data }) => {
    const response = await axios.put(`/api/incidents/${id}`, data)
    return response.data
  }
)

// Initial state with dummy data for development
const initialState = {
  incidents: [
    {
      id: 1,
      number: 'INC0001001',
      short_description: 'Unable to access email',
      description: 'User cannot log into Outlook, receiving authentication error',
      priority: 'High',
      status: 'Open',
      assigned_to: 'John Doe',
      category: 'Email',
      created_at: '2026-01-01T10:00:00Z',
      updated_at: '2026-01-01T10:00:00Z',
    },
    {
      id: 2,
      number: 'INC0001002',
      short_description: 'Printer not working',
      description: 'Office printer on 3rd floor is offline',
      priority: 'Medium',
      status: 'In Progress',
      assigned_to: 'Jane Smith',
      category: 'Hardware',
      created_at: '2026-01-02T09:30:00Z',
      updated_at: '2026-01-02T14:20:00Z',
    },
    {
      id: 3,
      number: 'INC0001003',
      short_description: 'Software installation request',
      description: 'Need Adobe Acrobat installed on workstation',
      priority: 'Low',
      status: 'New',
      assigned_to: null,
      category: 'Software',
      created_at: '2026-01-03T11:15:00Z',
      updated_at: '2026-01-03T11:15:00Z',
    },
    {
      id: 4,
      number: 'INC0001004',
      short_description: 'Network connectivity issues',
      description: 'Cannot connect to VPN from home',
      priority: 'High',
      status: 'Open',
      assigned_to: 'Bob Johnson',
      category: 'Network',
      created_at: '2026-01-04T08:00:00Z',
      updated_at: '2026-01-04T09:45:00Z',
    },
    {
      id: 5,
      number: 'INC0001005',
      short_description: 'Password reset required',
      description: 'User forgot domain password',
      priority: 'Medium',
      status: 'Resolved',
      assigned_to: 'Alice Williams',
      category: 'Access',
      created_at: '2026-01-05T07:30:00Z',
      updated_at: '2026-01-05T08:15:00Z',
    },
  ],
  selectedIncident: null,
  loading: false,
  error: null,
}

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    clearSelectedIncident: (state) => {
      state.selectedIncident = null
    },
    setSelectedIncident: (state, action) => {
      state.selectedIncident = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all incidents
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false
        state.incidents = action.payload
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch single incident
      .addCase(fetchIncidentById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchIncidentById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedIncident = action.payload
      })
      .addCase(fetchIncidentById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Create incident
      .addCase(createIncident.fulfilled, (state, action) => {
        state.incidents.unshift(action.payload)
      })
      // Update incident
      .addCase(updateIncident.fulfilled, (state, action) => {
        const index = state.incidents.findIndex(inc => inc.id === action.payload.id)
        if (index !== -1) {
          state.incidents[index] = action.payload
        }
        if (state.selectedIncident?.id === action.payload.id) {
          state.selectedIncident = action.payload
        }
      })
  },
})

export const { clearSelectedIncident, setSelectedIncident } = incidentsSlice.actions

export default incidentsSlice.reducer

// Selectors
export const selectAllIncidents = (state) => state.incidents.incidents
export const selectSelectedIncident = (state) => state.incidents.selectedIncident
export const selectIncidentsLoading = (state) => state.incidents.loading
export const selectIncidentsError = (state) => state.incidents.error
