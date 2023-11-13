import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

interface TaskCreate {
  title: string;
  projectId: string;
  done: boolean;
}

export class TaskService {
  static async getTasksByProjectId(projectId: string = "") {
    const prisma = new PrismaClient();
    try {
      const subjects = await prisma.task.findMany({
        where: {
          projectId: projectId,
        },
      });
      return subjects;
    } finally {
      prisma.$disconnect();
    }
  }
  static async getTaskById(id: string = "") {
    const prisma = new PrismaClient();
    try {
      const subject = await prisma.task.findUnique({
        where: {
          id: id,
        },
      });
      return subject;
    } finally {
      prisma.$disconnect();
    }
  }
  static async createTask(data: TaskCreate) {
    const prisma = new PrismaClient();
    try {
      const subject = await prisma.task.create({
        data: {
          id: randomUUID(),
          title: data.title,
          projectId: data.projectId,
          done: data.done,
        },
      });
      return subject;
    } finally {
      prisma.$disconnect();
    }
  }
  static async updateTask(id: string, data: TaskCreate) {
    const prisma = new PrismaClient();
    try {
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
      return subject;
    } finally {
      prisma.$disconnect();
    }
  }

  static async updateStatus(id: string, done: boolean) {
    const prisma = new PrismaClient();
    try {
      const subject = await prisma.task.update({
        where: {
          id: id,
        },
        data: {
          done: done,
        },
      });
      return subject;
    } finally {
      prisma.$disconnect();
    }
  }
  static async deleteTask(id: string) {
    const prisma = new PrismaClient();
    try {
      const subject = await prisma.task.delete({
        where: {
          id: id,
        },
      });
      return subject;
    } finally {
      prisma.$disconnect();
    }
  }
}
