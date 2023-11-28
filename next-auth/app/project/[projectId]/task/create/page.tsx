import TaskForm from '@/components/task/TaskForm'

interface Props {
  params: {
    projectId: string
  }
}
const TaskCreatePage: React.FC<Props> = async ({ params: { projectId } }) => {
  return (
    <>
      <TaskForm projectId={projectId} />
    </>
  )
}
export default TaskCreatePage
