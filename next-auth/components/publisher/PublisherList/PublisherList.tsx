'use client';

import { getAllPublisher } from '@/api/PublisherApi';
import { Publisher } from '@/service/PublisherService';
import { PencilIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const PublisherList: React.FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const fetchData = useCallback(async () => {
    const result = await getAllPublisher();
    setPublishers(result);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // const deleteProjectHandler = async (projectId: string) => {
  //   await delProject(projectId);
  //   await fetchData();
  // };

  // const updateDataHandler = async () => {
  //   await fetchData();
  // };

  return (
    <main>
      <ul>
        {publishers.map((publisher) => (
          <li
            key={publisher.id}
            className='flex flex-col mt-2 p-2  divide-gray-100 bg-white rounded-md overflow-hidden shadow-md'
          >
            {publisher.title}
            <Link href={`/publisher/${publisher.id}`}>
              <button
                type='button'
                className='inline-flex items-center bg-white px-2 py-2 mr-1'
                aria-label='edit project'
              >
                <PencilIcon
                  className='-ml-0.5 mr-1.5 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PublisherList;
