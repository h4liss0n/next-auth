import LoginForm from '@/components/login/LoginForm'
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom";

describe('Home', () => {
  it('renders a heading', () => {
    render(<LoginForm />)

    const heading = screen.getByRole('textbox', {
      name: /email/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
