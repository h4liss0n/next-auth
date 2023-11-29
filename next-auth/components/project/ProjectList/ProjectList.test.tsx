/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProjectList from './ProjectList';
import { Project, getProjectsByUserId } from '@/api/ProjectApi';

jest.mock('@/api/ProjectApi');

const PROJECTS: Project[] = [
  {
    id: '123',
    name: 'project 1',
    tasks: [
      {
        id: '1',
        title: 'title of task 1',
        done: false,
      },
    ],
  },
];

describe('ProjectList Component', () => {
  it('renders project list correctly', async () => {
    (
      getProjectsByUserId as jest.Mock<Promise<Project[]>>
    ).mockResolvedValueOnce(PROJECTS);
    render(<ProjectList />);

    await waitFor(() => {
      expect(getProjectsByUserId).toHaveBeenCalled();
    });

    const buttonTask = screen.getByRole('button', {
      name: /create new task/i,
    });
    const buttonEditProject = screen.getByRole('button', {
      name: /edit project/i,
    });
    const buttonDeleteProject = screen.getByRole('button', {
      name: /edit project/i,
    });

    const title = screen.getByText(/title of task 1/i);
    const buttonTaskDelete = screen.getByRole('button', {
      name: /task delete 1/i,
    });
    const buttonTaskEdit = screen.getByRole('button', {
      name: /task edit 1/i,
    });

    // screen.logTestingPlaygroundURL();
  });
});
