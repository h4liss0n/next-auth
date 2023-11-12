"use client"
import { TaskApi } from "@/api/TaskApi";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";




interface Props {
    projectId: string
    taskId?: string
}

interface Task {
    title: string
    done: boolean
}

const TaskForm: React.FC<Props> = ({ projectId, taskId }) => {
    const router = useRouter()

    const [formData, setFormData] = useState<Task>({
        title: "",
        done: false
    })

    const fetchData = useCallback(async () => {
        if (taskId) {
            const data = await TaskApi.getTaskById(taskId)
            setFormData({
                title: data.title,
                done: data.done
            })
        }
    }, [taskId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const cancelHandle = () => {
        router.back()
    }

    const create = () => {
        return TaskApi.postTask({
            title: formData.title,
            projectId: projectId,
            done: false,
        })
    }

    const update = (id: string) => {
        return TaskApi.putTask({
            id: id,
            title: formData.title,
            projectId: projectId,
            done: false
        }
        )
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const result = await (taskId ? update(taskId) : create())
        if (result.ok) {
            router.back()
        }

    }

    const labels = taskId ? {
        title: "Editing Task",
        submit: "Update Task"
    } : {
        title: "Create a new Task",
        submit: "Create Task"
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
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Task name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.title}
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
                                type="button"
                                onClick={cancelHandle}
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

export default TaskForm