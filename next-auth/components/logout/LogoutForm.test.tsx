import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import LogoutForm from './LogoutForm'
import { signOut } from 'next-auth/react'

jest.mock('next-auth/react')

describe('LogoutForm', () => {
  it('renders the login page', async () => {
    render(<LogoutForm />)
    const buttonSignout = screen.getByRole('button', { name: /sign out/i })

    await userEvent.click(buttonSignout)

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled()
    })
  })
})
