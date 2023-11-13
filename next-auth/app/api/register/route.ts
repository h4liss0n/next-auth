import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const { username, email, password } = await request.json();
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        password,
        name: username,
      },
    });
    return NextResponse.json(user.id);
  } finally {
    prisma.$disconnect();
  }
}
