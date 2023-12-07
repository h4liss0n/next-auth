import { NextResponse } from 'next/server';

import {
  publisherCreate,
  publisherGetAll,
  publisherGetById,
} from '@/service/PublisherService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const publisherId = searchParams.get('publisherId');

  if (publisherId) {
    const subjects = await publisherGetById(publisherId);
    return NextResponse.json(subjects);
  } else {
    const subjects = await publisherGetAll();
    return NextResponse.json(subjects);
  }
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const subject = await publisherCreate({
    title,
  });
  return NextResponse.json(subject);
}
