import { OPTIONS } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { Navbar } from './fragment/Navbar'



export default async function NavbarWrapper() {
  const session = await getServerSession(OPTIONS)
  return (
    <Navbar />
  )
}
