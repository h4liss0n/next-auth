import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

export interface Publisher extends PublisherBase {
  id: string;
}

export interface PublisherBase {
  title: string;
}

const prisma = new PrismaClient();

export const publisherGetAll = async () => {
  try {
    const subjects = await prisma.publisher.findMany();
    return subjects.map((item) => {
      const publisher: Publisher = { id: item.id, title: item.title };
      return publisher;
    });
  } catch (error) {
    console.error('Error fetching publishers:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const publisherGetById = async (publisherId: string) => {
  try {
    const subject = await prisma.publisher.findFirst({
      where: {
        id: publisherId,
      },
    });
    if (subject) {
      const publisher: Publisher = { id: subject.id, title: subject.title };
      return publisher;
    }
  } catch (error) {
    console.error('Error fetching publishers:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const publisherCreate = async (data: PublisherBase) => {
  try {
    const subjects = await prisma.publisher.create({
      data: {
        id: randomUUID(),
        title: data.title,
      },
    });
    return subjects;
  } catch (error) {
    console.error('Error create new publisher:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const publisherPut = async (
  publisherId: string,
  data: PublisherBase,
) => {
  try {
    const subject = await prisma.publisher.update({
      where: {
        id: publisherId,
      },
      data: {
        title: data.title,
      },
    });
    return subject;
  } catch (error) {
    console.error('Error update new publisher:', error);
  } finally {
    prisma.$disconnect();
  }
};
