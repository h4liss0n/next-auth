"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    project?: {
        projectId: string
        projectName?: string
    }

}


const ProjectForm: React.FC<Props> = ({ project }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        projectName: project?.projectName
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const create = () => {
        return fetch("/api/auth/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
    }

    const update = () => {
        return fetch("/api/auth/project", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: project?.projectId,
                projectName: formData.projectName
            })
        })
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const result = await (project ? update() : create())
        if (result.ok) {
            router.back()
        }

    }

    const labels = project ? {
        title: "Editing the Project",
        submit: "Update the project"
    } : {
        title: "Create a new Project",
        submit: "Create project"
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {labels.title}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="projectName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Project name
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="projectName"
                                    name="projectName"
                                    type="projectName"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center mt-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {labels.submit}
                            </button>
                            <button
                                type="submit"
                                className="flex w-full justify-center mt-1 rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default ProjectForm