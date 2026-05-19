import { Button } from "@/components/ui/button";
import TaskDetails from "@/modules/tasks/components/task-details";
import { tasks } from "@/modules/tasks/data/tasks-mock";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ITaskDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TaskDetailPage({ params }: ITaskDetailPageProps) {
  const { id } = await params;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    notFound();
  }

  return (
    <section className="flex flex-col container self-center pt-6 px-6 gap-4">
      <div className="flex flex-col items-center md:flex-row gap-2 md:gap-0">
        <div className="flex items-center w-full">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/">
              <ChevronLeft className="text-purple-900" />
            </Link>
          </Button>

          <h1 className="font-bold text-xl text-purple-900 w-full">
            Detalhamento da Tarefa
          </h1>
        </div>

        <div className="gap-2 flex md:flex-row">
          <Button className="px-6 py-5 bg-purple-700 hover:cursor-pointer hover:opacity-50">
            <Link href={`/tasks/${task?.id}/edit`}>Editar</Link>
          </Button>
        </div>
      </div>

      <TaskDetails task={task} />
    </section>
  );
}
