import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const data = req.body
  return NextResponse.json(data)
}
