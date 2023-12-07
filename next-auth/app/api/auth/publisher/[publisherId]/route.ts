import { publisherPut } from '@/service/PublisherService';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { publisherId: string } },
) {
  const { title } = await req.json();
  const subject = await publisherPut(params.publisherId, { title });
  return NextResponse.json(subject);
}
