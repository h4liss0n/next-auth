import LoginForm from '@/components/login/LoginForm'
import { render, screen } from '@testing-library/react'


describe('Home', () => {
  it('renders a heading', () => {
    render(<LoginForm />)

    const heading = screen.getByRole('textbox', {
      name: /email/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
