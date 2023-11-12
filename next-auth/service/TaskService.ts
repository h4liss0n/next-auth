import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

interface TaskCreate {
    title: string
    projectId: string,
    done: boolean
}
const prisma = new PrismaClient()

export class TaskService {
    static async getTaskByProjectId(projectId: string = "") {
        const subjects = await prisma.task.findMany({
            where: {
                projectId: projectId
            },
        })
        return subjects
    }
    static async getTaskById(id: string = "") {
        const subject = await prisma.task.findUnique({
            where: {
                id: id
            },
        })
        return subject
    }
    static async createTask(data: TaskCreate) {
        const subject = await prisma.task.create({
            data: {
                id: randomUUID(),
                title: data.title,
                projectId: data.projectId,
                done: data.done,
            }
        })
        return subject
    }
    static async updateTask(id: string, data: TaskCreate) {
        const subject = await prisma.task.update({
            where: {
                id: id,
            },
            data: {
                title: data.title,
                projectId: data.projectId,
                done: data.done,
            },
        });
        return subject
    }
    static async deleteTask(id: string) {
        const subject = await prisma.task.delete({
            where: {
                id: id,
            },
        });
        return subject
    }

}