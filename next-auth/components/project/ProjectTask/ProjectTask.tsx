import { delTask, updateStatus } from '@/api/TaskApi';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  done: boolean;
}

interface Props {
  projectId: string;
  onUpdate: () => void;
  tasks: Task[];
}

export const ProjectTask: React.FC<Props> = ({
  projectId,
  tasks,
  onUpdate,
}) => {
  const deleteTaskHandler = async (taskId: string) => {
    await delTask(taskId);
    onUpdate();
  };

  const statusTaskHandler = async (taskId: string, done: boolean) => {
    await updateStatus(taskId, done);
    onUpdate();
  };

  if (tasks.length === 0) {
    return (
      <div className='flex-1 p-2'>
        <p
          className='text-sm font-semibold leading-6 text-gray-900'
          aria-label='no items'
        >
          No tasks
        </p>
      </div>
    );
  }

  return (
    <div className='flex-1'>
      <div className='bg-gray-200 border border-gray-300 p-1 w-full'>
        <p className='text-sm font-semibold leading-6 text-gray-900'>Task</p>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className='flex items-center justify-center'>
              <div className='flex-1 p-2'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {task.title}
                </p>
              </div>
              <div className='p-2'>
                <input
                  type='checkbox'
                  name='done'
                  checked={task.done}
                  aria-label={`task done ${task.id}`}
                  onChange={() => statusTaskHandler(task.id, !task.done)}
                />
              </div>
              <div className='p-2'>
                <button
                  onClick={() => deleteTaskHandler(task.id)}
                  type='button'
                  aria-label={`task delete ${task.id}`}
                  className='inline-flex items-center bg-white px-2 py-2 mr-1'
                >
                  <TrashIcon
                    className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </button>

                <Link href={`/project/${projectId}/task/${task.id}`}>
                  <button
                    type='button'
                    className='inline-flex items-center bg-white px-2 py-2 mr-1'
                    aria-label={`task edit ${task.id}`}
                  >
                    <PencilIcon
                      className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
