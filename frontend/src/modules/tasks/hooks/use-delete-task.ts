import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../services/task-service";
import { toast } from "sonner";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa removida com sucesso");
    },
    onError: () => {
      toast.error("Erro ao remover tarefa");
    },
  });
}
