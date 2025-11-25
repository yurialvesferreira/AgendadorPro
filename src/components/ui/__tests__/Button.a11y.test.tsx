import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Button } from '../Button'

/**
 * Testes de acessibilidade para o componente Button
 * Usa jest-axe para verificar violações WCAG
 */
describe('Button - Accessibility Tests', () => {
  it('should not have any accessibility violations - primary variant', async () => {
    const { container } = render(<Button variant="primary">Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have any accessibility violations - disabled state', async () => {
    const { container } = render(
      <Button variant="primary" disabled>
        Disabled Button
      </Button>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have any accessibility violations - loading state', async () => {
    const { container } = render(
      <Button variant="primary" isLoading loadingText="Loading...">
        Submit
      </Button>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have any accessibility violations - with aria-label', async () => {
    const { container } = render(
      <Button variant="primary" aria-label="Close dialog">
        <span aria-hidden="true">&times;</span>
      </Button>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper ARIA attributes when loading', () => {
    const { getByRole } = render(
      <Button variant="primary" isLoading>
        Submit
      </Button>
    )

    const button = getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('should have proper ARIA attributes when disabled', () => {
    const { getByRole } = render(
      <Button variant="primary" disabled>
        Submit
      </Button>
    )

    const button = getByRole('button')
    expect(button).toHaveAttribute('disabled')
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })
})
