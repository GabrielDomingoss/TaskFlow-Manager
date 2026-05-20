import { useQuery } from "@tanstack/react-query";

import { getTasksSummary } from "../services/task-service";

export function useTasksSummary() {
  return useQuery({
    queryKey: ["tasks-summary"],
    queryFn: getTasksSummary,
  });
}
