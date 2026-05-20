import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/date";
import { ITask } from "@/modules/tasks/types/task";
import { CalendarDays } from "lucide-react";

interface ITaskDetails {
  task: ITask;
}

export default function TaskDetails({ task }: ITaskDetails) {
  return (
    <Card className="border-purple-100 bg-white shadow-sm">
      <CardContent>
        <div className="flex flex-col gap-4 rounded-sm p-6">
          <section>
            <h2 className="text-sm font-semibold text-zinc-950">Título</h2>

            <div className="mt-2 rounded-md border p-2 text-sm font-medium text-zinc-600">
              {task.title}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-zinc-950">Descrição</h2>

            <div className="mt-2 min-h-32 rounded-md border p-2 text-sm leading-6 text-zinc-600">
              {task.description}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border p-2">
              <p className="text-sm font-semibold text-zinc-950">Status</p>

              <div className="mt-2 text-sm text-zinc-600">{task.status}</div>
            </div>

            <div className="rounded-md border p-2">
              <p className="text-sm font-semibold text-zinc-950">Prioridade</p>

              <div className="mt-2 text-sm text-zinc-600">{task.priority}</div>
            </div>

            <div className="rounded-md border p-2">
              <p className="text-sm font-semibold text-zinc-950">
                Data de Vencimento
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
                <CalendarDays className="h-4 w-4 text-purple-600" />
                {formatDate(task.dueDate)}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-zinc-950">Categorias</h2>

            <div className="mt-2 grid gap-3 rounded-md border p-2 sm:grid-cols-2">
              {task.categories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-xl border border-purple-600 bg-purple-50 p-4 text-sm font-medium text-zinc-900"
                >
                  {category.name}
                </div>
              ))}
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
