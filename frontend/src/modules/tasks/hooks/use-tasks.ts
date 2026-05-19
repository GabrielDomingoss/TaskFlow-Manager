import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/task-service";
import { IGetTaskParams } from "../types/task";

export function useTasks(params?: IGetTaskParams) {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => getTasks(params),
  });
}
