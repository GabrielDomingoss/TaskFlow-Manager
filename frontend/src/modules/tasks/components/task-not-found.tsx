import { ClipboardX } from "lucide-react";

export function TaskNotFound() {
  return (
    <section className="flex flex-col gap-2 min-h-[50vh] items-center justify-center">
      <ClipboardX className="text-zinc-500 w-10 h-10" />
      <p className="text-sm text-zinc-500">Tarefa não encontrada.</p>
    </section>
  );
}
