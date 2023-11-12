
interface Task {
    id: string;
    title: string
    projectId: string,
    done: boolean
}

interface TaskPost {
    title: string
    projectId: string,
    done: boolean
}

interface TaskPut {
    id: string
    title: string
    projectId: string,
    done: boolean
}

export class TaskApi {

    static async getTaskByProjectId(projectId: string = "") {
        const res = await fetch(`/api/auth/task?projectId=${projectId}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result: Task[] = (await res.json());
        return result
    }

    static async getTaskById(id: string = "") {
        const res = await fetch(`/api/auth/task?taskId=${id}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result: Task = (await res.json());
        return result
    }


    static async postTask(data: TaskPost) {
        const result = await fetch("/api/auth/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return result

    }

    static async putTask(data: TaskPut) {
        const result = await fetch("/api/auth/task", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return result

    }

    static async delProject(taskId: string) {
        const result = await fetch(`/api/auth/task`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId })
        })
        return result

    }
}





