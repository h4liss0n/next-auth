import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/login/LoginForm';
import { render, screen, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import '@testing-library/jest-dom';

jest.mock('next-auth/react');

// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe('LoginForm', () => {
  it('fills in email and password inputs using user-events', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const buttonSignin = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'testpassword');
    await userEvent.click(buttonSignin);

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('testpassword');
    await waitFor(() => expect(signIn).toHaveBeenCalled());
  });
});
