import ProjectForm from "@/components/project/ProjectForm/ProjectForm";

interface Props {
  params: {
    projectId: string;
  };
}

const ProjectPage: React.FC<Props> = async ({ params: { projectId } }) => {
  return (
    <>
      <ProjectForm projectId={projectId} />
    </>
  );
};

export default ProjectPage;
