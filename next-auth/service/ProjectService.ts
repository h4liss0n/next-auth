import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

interface ProjectCreate {
    name: string
    userId: string
}

export class ProjectService {
    static async getProjectsByUserId(userId: string = "") {
        const prisma = new PrismaClient()
        const projects = await prisma.project.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                name: 'asc',
            },
            include: {
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        done: true
                    },
                },
            },
        })
        return projects
    }


    static async getProjectById(userId: string = "", projectId: string = "") {
        const prisma = new PrismaClient()
        const project = await prisma.project.findUnique({
            where: {
                userId: userId,
                id: projectId
            },
        })
        return project
    }



    static async createProject(data: ProjectCreate) {
        const prisma = new PrismaClient()
        const project = await prisma.project.create({
            data: {
                id: randomUUID(),
                name: data.name,
                userId: data.userId
            }
        })
        return project
    }

    static async updateProject(id: string, name: string) {
        const prisma = new PrismaClient()
        const updatedProject = await prisma.project.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });
        return updatedProject
    }
    static async deleteProject(id: string) {
        const prisma = new PrismaClient()
        const deletedProject = await prisma.project.delete({
            where: {
                id: id,
            },
        });
        return deletedProject
    }

}