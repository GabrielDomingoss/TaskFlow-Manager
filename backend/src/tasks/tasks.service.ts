import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindTasksQueryDto } from './dto/find-tasks-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { categoryIds, userId, ...taskData } = createTaskDto;

    return this.prismaService.task.create({
      data: {
        ...taskData,
        user: {
          connect: {
            id: userId,
          },
        },
        categories: {
          connect: categoryIds.map((categoryId) => ({
            id: categoryId,
          })),
        },
      },
      include: {
        categories: true,
        user: true,
      },
    });
  }

  async findAll(query: FindTasksQueryDto) {
    const { search, status, priority, categoryId, page, limit } = query;

    const where = {
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive' as const,
        },
      }),
      ...(status && { status }),
      ...(priority && { priority }),
      ...(categoryId && {
        categories: {
          some: {
            id: categoryId,
          },
        },
      }),
    };

    const [tasks, total] = await Promise.all([
      this.prismaService.task.findMany({
        where,
        include: {
          categories: true,
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.task.count({
        where,
      }),
    ]);

    return {
      data: tasks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        categories: true,
        user: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    const { categoryIds, userId, ...taskData } = updateTaskDto;

    return this.prismaService.task.update({
      where: { id },
      data: {
        ...taskData,
        ...(userId && {
          user: {
            connect: {
              id: userId,
            },
          },
        }),
        ...(categoryIds && {
          categories: {
            set: [],
            connect: categoryIds.map((categoryId) => ({
              id: categoryId,
            })),
          },
        }),
      },
      include: {
        categories: true,
        user: true,
      },
    });
  }

  async updateStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    await this.findOne(id);
    return this.prismaService.task.update({
      where: { id },
      data: {
        status: updateTaskStatusDto.status,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.task.delete({
      where: { id },
    });
  }

  async getSummary() {
    const [pending, inProgress, done] = await Promise.all([
      this.prismaService.task.count({
        where: { status: 'PENDING' },
      }),
      this.prismaService.task.count({
        where: { status: 'IN_PROGRESS' },
      }),
      this.prismaService.task.count({
        where: { status: 'DONE' },
      }),
    ]);

    return {
      pending,
      inProgress,
      done,
    };
  }
}
