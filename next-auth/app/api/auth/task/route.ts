import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { OPTIONS } from "../[...nextauth]/route"
import { TaskService } from "@/service/TaskService"


const prisma = new PrismaClient()


export async function GET(req: NextRequest, res: Response) {
    const { searchParams } = new URL(req.url)
    const taskId = searchParams.get('taskId')
    const projectId = searchParams.get('projectId')

    if (taskId) {
        const subject = await TaskService.getTaskById(taskId)
        return NextResponse.json(subject)
    } else if (projectId) {
        const subjects = await TaskService.getTaskByProjectId(projectId)
        return NextResponse.json(subjects)
    }
}


export async function POST(req: Request, res: Response) {
    const session = await getServerSession(OPTIONS)
    const { title, projectId } = await req.json()

    if (session?.user) {
        const subject = await TaskService.createTask({
            title: title,
            projectId: projectId,
            done: false,
        })
        return NextResponse.json(subject)
    }
}


export async function PUT(req: Request, res: Response) {
    const { taskId, title, done, projectId } = await req.json()
    const subject = TaskService.updateTask(taskId, {
        title: title,
        done: done,
        projectId: projectId
    })
    return NextResponse.json(subject)
}

export async function DELETE(req: Request, res: Response) {
    const { taskId } = await req.json();
    const subject = await TaskService.deleteTask(taskId)
    return NextResponse.json(subject);
}



