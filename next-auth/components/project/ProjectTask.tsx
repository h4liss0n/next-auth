import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  done: boolean;
}

interface Props {
  projectId: string;
  onDelete: (id: string) => void;
  onStatus: (id: string, done: boolean) => void;
  tasks: Task[];
}

export const ProjectTask: React.FC<Props> = ({
  projectId,
  tasks,
  onDelete,
  onStatus,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="flex-1 p-2">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          No tasks
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-gray-200 border border-gray-300 p-1 w-full">
        <p className="text-sm font-semibold leading-6 text-gray-900">Task</p>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="flex items-center justify-center">
              <div className="flex-1 p-2">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {task.title}
                </p>
              </div>
              <div className="p-2">
                <input
                  type="checkbox"
                  name="done"
                  checked={task.done}
                  onChange={() => onStatus(task.id, !task.done)}
                />
              </div>
              <div className="p-2">
                <button
                  onClick={() => onDelete(task.id)}
                  type="button"
                  className="inline-flex items-center bg-white px-2 py-2 mr-1"
                >
                  <TrashIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>

                <Link href={`/project/${projectId}/task/${task.id}`}>
                  <button
                    type="button"
                    className="inline-flex items-center bg-white px-2 py-2 mr-1"
                  >
                    <PencilIcon
                      className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
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
