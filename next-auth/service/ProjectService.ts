import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

interface ProjectCreate {
  name: string;
  userId: string;
}

export class ProjectService {
  static async getProjectsByUserId(userId: string = "") {
    const prisma = new PrismaClient();
    try {
      const projects = await prisma.project.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          name: "asc",
        },

        include: {
          tasks: {
            select: {
              id: true,
              title: true,
              done: true,
            },
          },
        },
      });
      return projects;
    } finally {
      prisma.$disconnect();
    }
  }

  static async getProjectById(userId: string = "", projectId: string = "") {
    const prisma = new PrismaClient();
    try {
      const project = await prisma.project.findUnique({
        where: {
          userId: userId,
          id: projectId,
        },
      });
      return project;
    } finally {
      prisma.$disconnect();
    }
  }

  static async createProject(data: ProjectCreate) {
    const prisma = new PrismaClient();
    try {
      const project = await prisma.project.create({
        data: {
          id: randomUUID(),
          name: data.name,
          userId: data.userId,
        },
      });
      return project;
    } finally {
      prisma.$disconnect();
    }
  }

  static async updateProject(id: string, name: string) {
    const prisma = new PrismaClient();
    try {
      const updatedProject = await prisma.project.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });
      return updatedProject;
    } finally {
      prisma.$disconnect();
    }
  }
  static async deleteProject(id: string) {
    const prisma = new PrismaClient();
    try {
      const deletedProject = await prisma.project.delete({
        where: {
          id: id,
        },
      });
      return deletedProject;
    } finally {
      prisma.$disconnect();
    }
  }
}
