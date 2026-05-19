import { api } from "@/lib/api";
import { IGetTaskParams, IPaginatedTasksResponse, ITask } from "../types/task";
import { TaskFormData } from "../schemas/task-schema";

export async function getTasks(params?: IGetTaskParams) {
  const { data } = await api.get<IPaginatedTasksResponse>("/tasks", { params });

  return data;
}

export async function getTaskById(id: string) {
  const { data } = await api.get<ITask>(`/tasks/${id}`);

  return data;
}

export async function createTask(payload?: TaskFormData) {
  const { data } = await api.post<ITask>("/tasks", payload);

  return data;
}

export async function updateTask(id: string, payload: TaskFormData) {
  const { data } = await api.put<ITask>(`/tasks/${id}`, payload);

  return data;
}

export async function deleteTask(id: string) {
  await api.delete(`/task/${id}`);
}
