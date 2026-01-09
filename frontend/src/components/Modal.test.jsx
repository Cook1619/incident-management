import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    )
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    )
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    )
    
    const closeButton = screen.getByRole('button')
    await user.click(closeButton)
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when backdrop is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    )
    
    const backdrop = screen.getByTestId('modal-backdrop')
    await user.click(backdrop)
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should render form when onSubmit is provided', () => {
    const onSubmit = vi.fn()
    
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" onSubmit={onSubmit}>
        <input type="text" placeholder="Test input" />
        <button type="submit">Submit</button>
      </Modal>
    )
    
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('should call onSubmit when form is submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal" onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Modal>
    )
    
    const submitButton = screen.getByText('Submit')
    await user.click(submitButton)
    
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
