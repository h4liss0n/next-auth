import ProjectList from "@/components/project/ProjectList";
import Link from "next/link";

export default async function ProjectPage() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <Link href="project/create">
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Create New Project
        </button>
      </Link>
      <ProjectList />
    </main>
  );
}
