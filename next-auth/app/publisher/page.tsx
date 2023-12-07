import PublisherList from '@/components/publisher/PublisherList/PublisherList';
import Link from 'next/link';

const PublisherPage = () => {
  return (
    <main className='flex min-h-screen flex-col p-24'>
      <Link href='publisher/create'>
        <button
          type='button'
          className='bg-blue-500 text-white py-2 px-4 rounded-md'
        >
          Create New Project
        </button>
      </Link>
      <PublisherList />
    </main>
  );
};
export default PublisherPage;
