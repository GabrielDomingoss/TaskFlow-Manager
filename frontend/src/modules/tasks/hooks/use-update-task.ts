import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../services/task-service";
import { IUpdateTaskParams } from "../types/task";
import { toast } from "sonner";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: IUpdateTaskParams) => updateTask(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["tasks-summary"] });

      toast.success("Tarefa atualizada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar tarefa");
    },
  });
}
