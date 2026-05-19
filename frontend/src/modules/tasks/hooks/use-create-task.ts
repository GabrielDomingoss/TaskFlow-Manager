import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/task-service";
import { toast } from "sonner";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toast.success("Tarefa criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar tarefa");
    },
  });
}
