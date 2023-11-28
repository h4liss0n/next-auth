/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Project, delProject, getProjectsByUserId } from '@/api/ProjectApi';
import { useCallback, useEffect, useState } from 'react';
import { ProjectHeader } from '../ProjectHeader';
import { ProjectTask } from '../ProjectTask';
import { delTask, updateStatus } from '@/api/TaskApi';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchData = useCallback(async () => {
    const result = await getProjectsByUserId();
    setProjects(result);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteProjectHandler = async (projectId: string) => {
    await delProject(projectId);
    await fetchData();
  };

  const deleteTaskHandler = async (taskId: string) => {
    await delTask(taskId);
    await fetchData();
  };
  const statusTaskHandler = async (taskId: string, done: boolean) => {
    await updateStatus(taskId, done);
    await fetchData();
  };

  return (
    <ul>
      {projects.map((project) => (
        <li
          key={project.id}
          className='flex flex-col mt-2 p-2  divide-gray-100 bg-white rounded-md overflow-hidden shadow-md'
        >
          <ProjectHeader
            id={project.id}
            name={project.name}
            onDelete={deleteProjectHandler}
          />
          <ProjectTask
            projectId={project.id}
            tasks={project.tasks}
            onDelete={deleteTaskHandler}
            onStatus={statusTaskHandler}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;