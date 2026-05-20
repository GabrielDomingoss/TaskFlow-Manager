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
import { Check } from "lucide-react";

interface ITaskConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskConfirmDialog({
  open,
  onOpenChange,
}: ITaskConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:!max-w-md !p-6">
        <AlertDialogHeader>
          <div className="flex flex-col items-center gap-2">
            <div className="mx-auto flex justify-center items-center h-14 w-14 rounded-full bg-green-100">
              <Check className="w-7 h-7 text-green-600" />
            </div>

            <AlertDialogTitle>Salvar alterações?</AlertDialogTitle>

            <AlertDialogDescription className="text-center">
              Deseja alterar esta tarefa? As informações da tarefa serão
              atualizadas.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex !justify-center border-none bg-transparent">
          <AlertDialogCancel className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white px-4 rounded-md hover:cursor-pointer">
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-purple-600 hover:bg-purple-700 px-4 rounded-md hover:cursor-pointer"
            onClick={() => {
              document.getElementById("task-form")?.dispatchEvent(
                new Event("submit", {
                  cancelable: true,
                  bubbles: true,
                }),
              );
            }}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
