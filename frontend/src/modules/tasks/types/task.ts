import { TaskFormData } from "../schemas/task-schema";
import { ICategory } from "./category";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type StatusPriority = "PENDING" | "IN_PROGRESS" | "DONE";

export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: StatusPriority;
  userId: string;
  createdAt: string;
  updatedAt: string;
  categories: ICategory[];
}

export interface IGetTaskParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  categoryId?: string;
}

export interface IPaginatedTasksResponse {
  data: ITask[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IUpdateTaskParams {
  id: string;
  payload: TaskFormData;
}
