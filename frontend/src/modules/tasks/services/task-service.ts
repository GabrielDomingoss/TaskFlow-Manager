import { api } from "@/lib/api";
import {
  IGetTaskParams,
  IPaginatedTasksResponse,
  ITask,
  ITasksSummary,
  ITaskPayload,
} from "../types/task";

export async function getTasks(params?: IGetTaskParams) {
  const { data } = await api.get<IPaginatedTasksResponse>("/tasks", { params });

  return data;
}

export async function getTaskById(id: string) {
  const { data } = await api.get<ITask>(`/tasks/${id}`);

  return data;
}

export async function createTask(payload?: ITaskPayload) {
  const { data } = await api.post<ITask>("/tasks", payload);

  return data;
}

export async function updateTask(id: string, payload: ITaskPayload) {
  const { data } = await api.patch<ITask>(`/tasks/${id}`, payload);

  return data;
}

export async function deleteTask(id: string) {
  await api.delete(`/tasks/${id}`);
}

export async function getTasksSummary() {
  const { data } = await api.get<ITasksSummary>("/tasks/summary");

  return data;
}
