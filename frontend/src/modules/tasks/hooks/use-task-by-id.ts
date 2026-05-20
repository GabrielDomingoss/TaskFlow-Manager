import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../services/task-service";

export function useTaskById(id: string) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById(id),
    enabled: Boolean(id),
  });
}
