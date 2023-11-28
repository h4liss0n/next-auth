export interface Project {
  id: string;
  name: string;
  tasks: [
    {
      id: string;
      title: string;
      done: boolean;
    },
  ];
}

interface ProjectCreate {
  projectName: string;
}

interface ProjectPut {
  projectId: string;
  projectName: string;
}

export const getProjectsByUserId = async () => {
  const res = await fetch('/api/auth/project', {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = (await res.json()) as Project[];
  return result;
};

export const getProjectById = async (projectId: string) => {
  const res = await fetch(`/api/auth/project?projectId=${projectId}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: Project = await res.json();
  return result;
};

export const postProject = async (project: ProjectCreate) => {
  const result = await fetch('/api/auth/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  return result;
};

export const putProject = async (project: ProjectPut) => {
  const result = await fetch('/api/auth/project', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  return result;
};

export const delProject = async (projectId: string) => {
  const result = await fetch(`/api/auth/project`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId }),
  });
  return result;
};
