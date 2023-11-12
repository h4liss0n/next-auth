
export interface Project {
    id: string
    name: string
    tasks: [
        {
            id: string
            title: string
            done: boolean
        }
    ]
}

interface ProjectCreate {
    projectName: string;
}

interface ProjectPut {
    projectId: string;
    projectName: string;
}

export class ProjectApi {
    static async getProjectsByUserId() {
        const res = await fetch("/api/auth/project", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = (await res.json()) as Project[];
        return result
    }

    static async getProjectById(projectId: string) {
        const res = await fetch(`/api/auth/project?projectId=${projectId}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result: Project = (await res.json());
        return result
    }


    static async postProject(project: ProjectCreate) {
        const result = await fetch("/api/auth/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project)
        })
        return result

    }

    static async putProject(project: ProjectPut) {
        const result = await fetch("/api/auth/project", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project)
        })
        return result

    }

    static async delProject(projectId: string) {
        const result = await fetch(`/api/auth/project`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ projectId })
        })
        return result

    }

    // static async getAll(): Promise<ProjectCard[]> {
    //     const token = localStorage.getItem("token");


    //     const requestOptions = {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         }
    //     };

    //     const res = await fetch("http://localhost:8080/api/v1/project", requestOptions);
    //     const result = (await res.json()) as ProjectCard[];
    //     return result;
    // }


    // static async getById(projectId: string): Promise<ProjectCard> {
    //     const token = localStorage.getItem("token");


    //     const requestOptions = {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         }
    //     };

    //     const res = await fetch(`http://localhost:8080/api/v1/project/${projectId}`, requestOptions);
    //     const result = (await res.json()) as ProjectCard;
    //     return result;
    // }

    // static async createProject(projectBase: ProjectBase): Promise<Project> {

    //     const token = localStorage.getItem("token");

    //     const requestOptions = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(projectBase),
    //     };
    //     const res = await fetch(
    //         "http://localhost:8080/api/v1/project",
    //         requestOptions,
    //     );
    //     const json = (await res.json()) as Project;
    //     return json;
    // }

    // static async delete(projectId: string) {

    //     const token = localStorage.getItem("token");

    //     const requestOptions = {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         },
    //     };
    //     return await fetch(
    //         `http://localhost:8080/api/v1/project/${projectId}`,
    //         requestOptions,
    //     );
    // }
}





