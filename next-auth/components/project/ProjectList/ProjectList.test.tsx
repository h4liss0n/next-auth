/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProjectList from './ProjectList';
import { getProjectsByUserId } from '@/api/ProjectApi';

jest.mock('@/api/ProjectApi');

describe('ProjectList Component', () => {
  it('renders project list correctly', async () => {
    (getProjectsByUserId as jest.Mock).mockResolvedValueOnce([]);

    render(<ProjectList />);

    await waitFor(() => {
      expect(getProjectsByUserId).toHaveBeenCalled();
    });
  });
});
