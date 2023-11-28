import { getServerSession } from 'next-auth';
import { OPTIONS } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(OPTIONS);
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      {JSON.stringify(session?.user.id)}
    </main>
  );
}
