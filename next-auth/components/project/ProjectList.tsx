'use client'
import { Project, ProjectApi } from '@/api/ProjectApi';
import { TrashIcon, PlusIcon, PencilIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';



const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([])

    const fetchData = useCallback(async () => {
        const result = await ProjectApi.getProjectsByUserId()
        setProjects(result)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const deleteHandler = async (projectId: string) => {
        await ProjectApi.delProject(projectId)
        await fetchData()
    }

    return (
        <>

            <ul role="list" className="divide-y divide-gray-100 w-100">
                {projects.map((project) => (
                    <li key={project.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <Link href={`/project/${project.id}`}>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-5 flex lg:ml-4 lg:mt-0">
                            <span className="hidden sm:block">
                                <button onClick={() => deleteHandler(project.id)}
                                    type="button"
                                    className="inline-flex items-center bg-white px-2 py-2 mr-1"
                                >
                                    <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </button>
                                <Link href={`/project/${project.id}`}>
                                    <button
                                        type="button"
                                        className="inline-flex items-center bg-white px-2 py-2 mr-1"
                                    >
                                        <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </button>
                                </Link>
                                <Link href={`/project/${project.id}/task/create`}>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Task
                                    </button>
                                </Link>

                            </span>
                        </div>
                        <ul>
                            {project.tasks.map(task => (
                                <li key={task.id}> {task.title}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ProjectList;
