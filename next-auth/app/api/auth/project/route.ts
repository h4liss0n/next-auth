import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { OPTIONS } from '../[...nextauth]/route'
import { ProjectService } from '@/service/ProjectService'

export async function GET(req: NextRequest, res: Response) {
  const { searchParams } = new URL(req.url)
  const session = await getServerSession(OPTIONS)
  const projectId = searchParams.get('projectId')

  if (projectId) {
    const projects = await ProjectService.getProjectById(
      session?.user.id,
      projectId,
    )
    return NextResponse.json(projects)
  } else {
    const projects = await ProjectService.getProjectsByUserId(session?.user.id)
    return NextResponse.json(projects)
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(OPTIONS)
  const { projectName } = await req.json()

  if (session?.user) {
    const project = await ProjectService.createProject({
      name: projectName,
      userId: session.user.id,
    })
    return NextResponse.json(project)
  }
}

export async function PUT(req: Request, res: Response) {
  const session = await getServerSession(OPTIONS)
  const { projectId, projectName } = await req.json()

  const updatedProject = ProjectService.updateProject(projectId, projectName)

  return NextResponse.json(updatedProject)
}

export async function DELETE(req: Request, res: Response) {
  const { projectId } = await req.json()
  const deletedProject = await ProjectService.deleteProject(projectId)
  return NextResponse.json(deletedProject)
}
