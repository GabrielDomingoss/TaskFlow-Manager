"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/modules/common/components/loading";
import { TaskDeleteDialog } from "@/modules/tasks/components/task-delete-dialog";
import TaskDetails from "@/modules/tasks/components/task-details";
import { TaskNotFound } from "@/modules/tasks/components/task-not-found";
import { useTaskById } from "@/modules/tasks/hooks/use-task-by-id";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { data: task, isPending: IsLoadingTask } = useTaskById(params.id);

  if (IsLoadingTask) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col container self-center pt-6 px-6 gap-4">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0">
        <Button size="icon" variant="ghost" asChild>
          <Link href="/">
            <ChevronLeft className="text-purple-900" />
          </Link>
        </Button>

        <h1 className="font-bold text-xl text-purple-900 w-full">
          Detalhamento da Tarefa
        </h1>

        <div className="gap-2 flex md:flex-row">
          <Button
            className="px-6 py-5 border-purple-700 text-purple-700 hover:cursor-pointer hover:bg-purple-700 hover:text-white"
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={!task}
          >
            Excluir
          </Button>

          <Button
            className="px-6 py-5 bg-purple-700 hover:cursor-pointer hover:opacity-50"
            disabled={!task}
          >
            <Link href={`/tasks/${task?.id}/edit`}>Editar</Link>
          </Button>
        </div>
      </div>

      {!task ? (
        <TaskNotFound />
      ) : (
        <>
          <TaskDetails task={task} />
          <TaskDeleteDialog
            task={task}
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onDelete={() => router.push("/")}
          />
        </>
      )}
    </section>
  );
}
