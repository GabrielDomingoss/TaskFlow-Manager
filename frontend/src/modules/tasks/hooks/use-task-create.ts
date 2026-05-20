import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/task-service";
import { toast } from "sonner";

export function useTaskCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-summary"] });

      toast.success("Tarefa criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar tarefa");
    },
  });
}
