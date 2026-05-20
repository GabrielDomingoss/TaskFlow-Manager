import { TaskFormData } from "../schemas/task-schema";
import { ICategory } from "./category";
import { IUser } from "./user";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type StatusPriority = "PENDING" | "IN_PROGRESS" | "DONE";

export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: StatusPriority;
  user: IUser;
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

interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface IPaginatedTasksResponse {
  data: ITask[];
  meta: IMeta;
}

export interface IUpdateTaskParams {
  id: string;
  payload: ITaskPayload;
}

export interface ITaskFilters {
  search: string;
  status: string;
  priority: string;
  categoryId: string;
}

export interface ITasksSummary {
  pending: number;
  inProgress: number;
  done: number;
}

export interface ITaskPayload extends TaskFormData {
  userId: string;
}
