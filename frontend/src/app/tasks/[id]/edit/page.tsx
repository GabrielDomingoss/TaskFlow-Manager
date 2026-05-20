"use client";
import { TaskForm } from "@/modules/tasks/components/task-form";
import { useTaskById } from "@/modules/tasks/hooks/use-task-by-id";
import { useParams } from "next/navigation";

export default function EditTaskPage() {
  const params = useParams<{ id: string }>();
  const { data: task, isPending: isLoadingTask } = useTaskById(params.id);

  if (isLoadingTask) {
    return (
      <section className="container self-center px-6 pt-6">
        <p className="text-sm text-zinc-500">Carregando tarefa...</p>
      </section>
    );
  }

  if (!task) {
    <section className="container self-center px-6 pt-6">
      <p className="text-sm text-zinc-500">Tarefa não encontrada.</p>
    </section>;
  }

  return <TaskForm isEditMode={true} initialData={task} />;
}
