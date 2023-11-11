import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { OPTIONS } from './api/auth/[...nextauth]/route'
import Link from 'next/link'


export default async function Home() {
  const session = await getServerSession(OPTIONS)
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="/register" >Register</Link>
      <Link href="/login" >Login</Link>
      <Link href="/api/auth/signout" >log out</Link>
      {session?.user && (
        <h1>{session.user.name}</h1>
      )}
    </main>
  )
}
