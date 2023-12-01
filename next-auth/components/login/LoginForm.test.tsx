import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react');

beforeEach(() => {
  jest.clearAllMocks();
});

test('when fill email and password, it should call signIn', async () => {
  render(<LoginForm />);
  const inputEmail = screen.getByRole('textbox', {
    name: /email address/i,
  });

  const inputPassword = screen.getByLabelText(/password/i);
  const buttonSignIn = screen.getByRole('button', {
    name: /sign in/i,
  });

  await userEvent.type(inputEmail, 'halisson_skalee@hotmail.com');
  await userEvent.type(inputPassword, '123');
  await userEvent.click(buttonSignIn);

  expect(signIn).toHaveBeenCalled();
});

test('when not fill email and password, it should not been call signIn', async () => {
  render(<LoginForm />);
  const inputPassword = screen.getByLabelText(/password/i);
  const buttonSignIn = screen.getByRole('button', {
    name: /sign in/i,
  });

  await userEvent.type(inputPassword, '123');
  await userEvent.click(buttonSignIn);

  expect(signIn).not.toHaveBeenCalled();
});
