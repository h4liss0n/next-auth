"use client";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  onDelete: (projectId: string) => void;
}

export const ProjectHeader: React.FC<Props> = ({ id, name, onDelete }) => {
  return (
    <div className="flex-1 mb-1">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <Link href={`/project/${id}`}>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {name}
            </p>
          </Link>
        </div>
        <span className="hidden sm:block">
          <button
            onClick={() => onDelete(id)}
            type="button"
            className="inline-flex items-center bg-white px-2 py-2 mr-1"
          >
            <TrashIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
          <Link href={`/project/${id}`}>
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
          <Link href={`/project/${id}/task/create`}>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PlusIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Task
            </button>
          </Link>
        </span>
      </div>
    </div>
  );
};
