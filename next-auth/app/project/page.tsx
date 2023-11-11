
import { getServerSession } from "next-auth"
import Link from "next/link"
import { OPTIONS } from "../api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
export default async function ProjectPage() {
    const session = await getServerSession(OPTIONS)
    const prisma = new PrismaClient()
    const projects = await prisma.project.findMany({
        where: {
            userId: session?.user.id
        },
        orderBy: {
            name: 'asc', // 'asc' para ascendente, 'desc' para descendente
        },
    })

    return (
        <main className="flex min-h-screen flex-col items-center p-24">

            <Link href="project/create">
                <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded-md" >
                    Create New Project
                </button>
            </Link>

            <ul role="list" className="divide-y divide-gray-100 w-100">
                {projects.map((project) => (
                    <li key={project.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <Link href={`/project/${project.id}`}>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                                </Link>

                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </main>)
}


