import { PrismaClient } from "@prisma/client"
import { randomUUID } from "crypto"


import { NextResponse, NextRequest } from "next/server"
const prisma = new PrismaClient()

export async function GET(request: Request) {
    console.log("get", request)
}

export async function POST(req: NextRequest) {
    console.log("login")
    console.log("login", req.body)
    const data = req.body
    return NextResponse.json(data)

}

