import TaskForm from '@/components/task/TaskForm';

interface Props {
  params: {
    taskId: string;
    projectId: string;
  };
}

const TaskPage: React.FC<Props> = async ({ params: { projectId, taskId } }) => {
  return (
    <>
      <TaskForm projectId={projectId} taskId={taskId} />
    </>
  );
};

export default TaskPage;
