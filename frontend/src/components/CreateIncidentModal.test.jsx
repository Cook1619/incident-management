import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateIncidentModal from './CreateIncidentModal'

describe('CreateIncidentModal', () => {
  it('should render when isOpen is true', () => {
    render(<CreateIncidentModal isOpen={true} onClose={() => {}} />)
    
    expect(screen.getByText('Create New Incident')).toBeInTheDocument()
  })

  it('should not render when isOpen is false', () => {
    render(<CreateIncidentModal isOpen={false} onClose={() => {}} />)
    
    expect(screen.queryByText('Create New Incident')).not.toBeInTheDocument()
  })

  it('should render all form fields', () => {
    render(<CreateIncidentModal isOpen={true} onClose={() => {}} />)
    
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/assigned to/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
  })

  it('should have correct default values', () => {
    render(<CreateIncidentModal isOpen={true} onClose={() => {}} />)
    
    expect(screen.getByLabelText(/priority/i)).toHaveValue('medium')
    expect(screen.getByLabelText(/status/i)).toHaveValue('open')
  })

  it('should update input values when changed', async () => {
    const user = userEvent.setup()
    render(<CreateIncidentModal isOpen={true} onClose={() => {}} />)
    
    const descriptionInput = screen.getByLabelText(/description/i)
    await user.type(descriptionInput, 'Test incident description')
    
    expect(descriptionInput).toHaveValue('Test incident description')
  })

  it('should update select values when changed', async () => {
    const user = userEvent.setup()
    render(<CreateIncidentModal isOpen={true} onClose={() => {}} />)
    
    const prioritySelect = screen.getByLabelText(/priority/i)
    await user.selectOptions(prioritySelect, 'high')
    
    expect(prioritySelect).toHaveValue('high')
  })

  it('should call onClose when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    
    render(<CreateIncidentModal isOpen={true} onClose={onClose} />)
    
    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when form is submitted', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    
    render(<CreateIncidentModal isOpen={true} onClose={onClose} />)
    
    // Fill required field
    const descriptionInput = screen.getByLabelText(/description/i)
    await user.type(descriptionInput, 'Test incident')
    
    const submitButton = screen.getByText('Create Incident')
    await user.click(submitButton)
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should have all priority options', () => {
    render(<CreateIncidentModal isOpen={true} onClose={() => {}} />)
    
    const prioritySelect = screen.getByLabelText(/priority/i)
    expect(prioritySelect).toContainHTML('<option value="low">Low</option>')
    expect(prioritySelect).toContainHTML('<option value="medium">Medium</option>')
    expect(prioritySelect).toContainHTML('<option value="high">High</option>')
    expect(prioritySelect).toContainHTML('<option value="critical">Critical</option>')
  })

  it('should have all status options', () => {
    render(<CreateIncidentModal isOpen={true} onClose={() => {}} />)
    
    const statusSelect = screen.getByLabelText(/status/i)
    expect(statusSelect).toContainHTML('<option value="open">Open</option>')
    expect(statusSelect).toContainHTML('<option value="in progress">In Progress</option>')
    expect(statusSelect).toContainHTML('<option value="resolved">Resolved</option>')
    expect(statusSelect).toContainHTML('<option value="closed">Closed</option>')
  })

  it('should have all category options', () => {
    render(<CreateIncidentModal isOpen={true} onClose={() => {}} />)
    
    const categorySelect = screen.getByLabelText(/category/i)
    expect(categorySelect).toContainHTML('<option value="hardware">Hardware</option>')
    expect(categorySelect).toContainHTML('<option value="software">Software</option>')
    expect(categorySelect).toContainHTML('<option value="network">Network</option>')
    expect(categorySelect).toContainHTML('<option value="security">Security</option>')
  })
})
