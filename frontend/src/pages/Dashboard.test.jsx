import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import Dashboard from './Dashboard'
import incidentsReducer from '../store/slices/incidentsSlice'

// Helper function to render with providers
const renderWithProviders = (component, initialState = {}) => {
  const store = configureStore({
    reducer: {
      incidents: incidentsReducer,
    },
    preloadedState: initialState,
  })

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  )
}

describe('Dashboard', () => {
  it('should render the dashboard header', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByText('Incidents')).toBeInTheDocument()
    expect(screen.getByText('Manage and track all system incidents')).toBeInTheDocument()
  })

  it('should render the create incident button', () => {
    renderWithProviders(<Dashboard />)
    
    const createButton = screen.getByText('+ Create Incident')
    expect(createButton).toBeInTheDocument()
  })

  it('should open modal when create button is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Dashboard />)
    
    const createButton = screen.getByText('+ Create Incident')
    await user.click(createButton)
    
    expect(screen.getByText('Create New Incident')).toBeInTheDocument()
  })

  it('should render table headers', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByText('Number')).toBeInTheDocument()
    expect(screen.getByText('Short Description')).toBeInTheDocument()
    expect(screen.getByText('Priority')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Assigned To')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
  })

  it('should display no incidents message when list is empty', () => {
    renderWithProviders(<Dashboard />, {
      incidents: {
        incidents: [],
        loading: false,
        error: null,
      },
    })
    
    expect(screen.getByText('No incidents found')).toBeInTheDocument()
  })

  it('should display loading state', () => {
    renderWithProviders(<Dashboard />, {
      incidents: {
        incidents: [],
        loading: true,
        error: null,
      },
    })
    
    expect(screen.getByText('Loading incidents...')).toBeInTheDocument()
  })

  it('should display error state', () => {
    renderWithProviders(<Dashboard />, {
      incidents: {
        incidents: [],
        loading: false,
        error: 'Failed to fetch incidents',
      },
    })
    
    expect(screen.getByText('Error: Failed to fetch incidents')).toBeInTheDocument()
  })

  it('should render incidents from store', () => {
    const mockIncidents = [
      {
        id: 1,
        number: 'INC001',
        short_description: 'Test incident 1',
        priority: 'high',
        status: 'open',
        assigned_to: 'John Doe',
        category: 'Software',
      },
      {
        id: 2,
        number: 'INC002',
        short_description: 'Test incident 2',
        priority: 'low',
        status: 'closed',
        assigned_to: 'Jane Smith',
        category: 'Hardware',
      },
    ]

    renderWithProviders(<Dashboard />, {
      incidents: {
        incidents: mockIncidents,
        loading: false,
        error: null,
      },
    })
    
    expect(screen.getByText('INC001')).toBeInTheDocument()
    expect(screen.getByText('Test incident 1')).toBeInTheDocument()
    expect(screen.getByText('INC002')).toBeInTheDocument()
    expect(screen.getByText('Test incident 2')).toBeInTheDocument()
  })

  it('should render incident links with correct hrefs', () => {
    const mockIncidents = [
      {
        id: 1,
        number: 'INC001',
        short_description: 'Test incident',
        priority: 'medium',
        status: 'open',
        assigned_to: 'Test User',
        category: 'Network',
      },
    ]

    renderWithProviders(<Dashboard />, {
      incidents: {
        incidents: mockIncidents,
        loading: false,
        error: null,
      },
    })
    
    const link = screen.getByText('INC001')
    expect(link).toHaveAttribute('href', '/incident/1')
  })
})
