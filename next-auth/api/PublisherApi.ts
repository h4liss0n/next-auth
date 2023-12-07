import { Publisher, PublisherBase } from '@/service/PublisherService';

export const getAllPublisher = async () => {
  const res = await fetch(`/api/auth/publisher`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: Publisher[] = await res.json();
  return result;
};

export const publisherGetById = async (publisherId: string) => {
  const res = await fetch(`/api/auth/publisher?publisherId=${publisherId}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: Publisher = await res.json();
  return result;
};

export const postPublisher = async (data: PublisherBase) => {
  const result = await fetch('/api/auth/publisher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return result;
};

export const putPublisher = async (
  publisherId: string,
  data: PublisherBase,
) => {
  const result = await fetch(`/api/auth/publisher/${publisherId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return result;
};
