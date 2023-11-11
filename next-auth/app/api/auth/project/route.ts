import { PrismaClient } from "@prisma/client"
import { randomUUID } from "crypto"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { OPTIONS } from "../[...nextauth]/route"

const prisma = new PrismaClient()

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(OPTIONS)
    const { projectName } = await req.json()

    if (session?.user) {
        const project = await prisma.project.create({
            data: {
                id: randomUUID(),
                name: projectName,
                userId: session.user.id
            }
        })
        return NextResponse.json(project)
    }

}


export async function PUT(req: Request, res: Response) {
    const session = await getServerSession(OPTIONS)
    const { projectId, projectName } = await req.json()

    const updatedProject = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            name: projectName,
        },
    });

    return NextResponse.json(updatedProject)
}