import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Book } from '.';

describe('Books', () => {
  test('render page 1, it should show page 1', () => {
    render(<Book />);
    const tab = screen.getByRole('tab', { name: /one/i });
    const panel = screen.getByText(/one!/i);

    expect(tab).toBeInTheDocument();
    expect(panel).toBeInTheDocument();
  });

  test('when tab is disable, it should not change on click', async () => {
    render(<Book />);
    const tab2 = screen.getByRole('tab', { name: /two/i });
    await userEvent.click(tab2);
    const panel = screen.getByText(/one!/i);
    expect(panel).toBeInTheDocument();
  });

  test('when tab is disable, it should not change on click', async () => {
    render(<Book />);
    const tab1 = screen.getByRole('tab', { name: /one/i });
    const panel1 = screen.getByText(/one!/i);
    await userEvent.click(tab1);
    expect(tab1).toBeInTheDocument();
    expect(panel1).toBeInTheDocument();

    const tab3 = screen.getByRole('tab', { name: /three/i });
    await userEvent.click(tab3);

    const panel = screen.getByText(/three!/i);
    expect(panel).toBeInTheDocument();
  });
});
