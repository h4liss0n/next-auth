import { screen, render } from '@testing-library/react';
import { ProjectTask } from './ProjectTask';
import { Task } from '@prisma/client';
import userEvent from '@testing-library/user-event';
import { delTask, updateStatus } from '@/api/TaskApi';
jest.mock('@/api/TaskApi');

const MOCK_TASK: Task[] = [
  {
    id: '1',
    title: 'title of task 1',
    done: false,
    projectId: '1',
  },

  {
    id: '2',
    title: 'title of task 2',
    done: true,
    projectId: '2',
  },
];

const getElements = (id: string) => {
  const title = screen.getByText(new RegExp(`title of task ${id}`, 'i'));

  const check = screen.getByRole('checkbox', {
    name: new RegExp(`task done ${id}`, 'i'),
  });
  const btnDelete = screen.getByRole('button', {
    name: new RegExp(`task delete ${id}`, 'i'),
  });

  const btnEdit = screen.getByRole('button', {
    name: new RegExp(`task edit ${id}`, 'i'),
  });

  return {
    title,
    check,
    btnDelete,
    btnEdit,
  };
};

describe('ProjectTask', () => {
  it('when no task, it should show message no tasks', () => {
    render(<ProjectTask projectId='1' onUpdate={() => {}} tasks={[]} />);

    const noTask = screen.getByText(/no tasks/i);

    expect(noTask).toBeInTheDocument();
  });

  it('when fill with task, it should render all items ', () => {
    render(<ProjectTask projectId='' onUpdate={() => {}} tasks={MOCK_TASK} />);

    MOCK_TASK.forEach((task) => {
      const { title, check, btnDelete, btnEdit } = getElements(task.id);
      expect(title).toBeInTheDocument();
      expect(check).toBeInTheDocument();
      expect(btnDelete).toBeInTheDocument();
      expect(btnEdit).toBeInTheDocument();
    });
  });

  it('when click on delete, it should call delete', async () => {
    const onUpdate = jest.fn();
    render(<ProjectTask projectId='' onUpdate={onUpdate} tasks={MOCK_TASK} />);
    const { btnDelete } = getElements('1');

    await userEvent.click(btnDelete);

    expect(delTask).toHaveBeenCalledWith('1');
    expect(onUpdate).toHaveBeenCalled();
  });

  it('when click on delete, it should call delete', async () => {
    const onUpdate = jest.fn();
    render(<ProjectTask projectId='' onUpdate={onUpdate} tasks={MOCK_TASK} />);
    const { check } = getElements('1');

    await userEvent.click(check);

    expect(updateStatus).toHaveBeenCalledWith('1', true);
    expect(onUpdate).toHaveBeenCalled();
  });
});
