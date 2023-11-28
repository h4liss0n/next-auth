interface Task {
  id: string;
  title: string;
  projectId: string;
  done: boolean;
}

interface TaskPost {
  title: string;
  projectId: string;
  done: boolean;
}

interface TaskPut {
  id: string;
  title: string;
  projectId: string;
  done: boolean;
}

export const getTaskByProjectId = async (projectId: string = '') => {
  const res = await fetch(`/api/auth/task?projectId=${projectId}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: Task[] = await res.json();
  return result;
};

export const getTaskById = async (id: string = '') => {
  const res = await fetch(`/api/auth/task?taskId=${id}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: Task = await res.json();
  return result;
};

export const postTask = async (data: TaskPost) => {
  const result = await fetch('/api/auth/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return result;
};

export const updateStatus = async (id: string, done: boolean) => {
  const result = await fetch('/api/auth/task', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      done: done,
    }),
  });
  return result;
};

export const putTask = async (data: TaskPut) => {
  const result = await fetch('/api/auth/task', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return result;
};

export const delTask = async (taskId: string) => {
  const result = await fetch(`/api/auth/task`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskId }),
  });
  return result;
};
