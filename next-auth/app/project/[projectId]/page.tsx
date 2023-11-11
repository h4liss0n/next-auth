import ProjectForm from "@/components/project/ProjectForm"
import { PrismaClient } from "@prisma/client"

interface Props {
    params: {
        projectId: string
    }
}

const ProjectPage: React.FC<Props> = async ({ params: { projectId } }) => {

    const prisma = new PrismaClient()
    const project = await prisma.project.findFirst(
        {
            where: { id: projectId }
        }
    )

    return (
        <>
            {JSON.stringify(project)}
            <ProjectForm project={{ projectId, projectName: project?.name }} />
        </>

    )
}

export default ProjectPage