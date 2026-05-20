"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, TriangleAlert } from "lucide-react";
import { useTaskDelete } from "../hooks/use-task-delete";
import { ITask } from "../types/task";

interface IDeleteTaskDialogProps {
  task: ITask | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: () => void;
}

export function TaskDeleteDialog({
  task,
  open,
  onOpenChange,
  onDelete,
}: IDeleteTaskDialogProps) {
  const { mutateAsync: deleteTask, isPending: isDeleting } = useTaskDelete();

  const handleDeleteTask = async () => {
    if (!task) return;

    await deleteTask(task.id);
    onOpenChange(false);
    onDelete?.();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:!max-w-md !p-6">
        <AlertDialogHeader>
          <div className="flex flex-col items-center gap-2">
            <div className="mx-auto flex justify-center items-center h-14 w-14 rounded-full bg-red-100">
              <TriangleAlert className="w-7 h-7 text-red-600" />
            </div>

            <AlertDialogTitle>Excluir Tarefa</AlertDialogTitle>

            <AlertDialogDescription className="text-center">
              Tem certeza que deseja excluir a tarefa {`"${task?.title}"`}? Essa
              ação não poderá ser desfeita.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex !justify-center">
          <AlertDialogCancel className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white px-4 rounded-md hover:cursor-pointer">
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isDeleting}
            className="bg-purple-600 hover:bg-purple-700 px-4 rounded-md hover:cursor-pointer"
            onClick={handleDeleteTask}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
