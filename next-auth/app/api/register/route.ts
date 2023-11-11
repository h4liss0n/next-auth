import { PrismaClient } from "@prisma/client"
import { randomUUID } from "crypto"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(request: Request) {
    console.log("get", request)
}

export async function POST(request: NextRequest,) {
    console.log("register")
    const { username, email, password } = await request.json()

    const user = await prisma.user.create({
        data: {
            id: randomUUID(),
            email,
            password,
            name: username
        }
    })

    return NextResponse.json(user.id)
}