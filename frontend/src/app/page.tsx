"use client";

import { Button } from "@/components/ui/button";
import { TaskTableSkeleton } from "@/modules/tasks/components/task-table-skeleton";
import { TasksFilter } from "@/modules/tasks/components/tasks-filter";
import { TasksIndicatorsCards } from "@/modules/tasks/components/tasks-indicators-cards";
import { TasksPagination } from "@/modules/tasks/components/tasks-pagination";
import { TasksTable } from "@/modules/tasks/components/tasks-table";
import { tasks } from "@/modules/tasks/data/tasks-mock";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    categoryId: "",
  });
  const [page, setPage] = useState(1);
  const isLoading = false;

  const handleFiltersChange = (key: keyof typeof filters, value: string) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
  };

  return (
    <section className="flex flex-col container self-center pt-6 px-6 gap-6">
      <section className="flex items-center flex-col md:flex-row gap-4 md:gap-0">
        <div className="w-full">
          <h1 className="font-bold text-2xl text-purple-900">Bem Vindo!</h1>
          <h5 className="text-sm text-gray-500">
            Comece criando novas tarefas!
          </h5>
        </div>

        <div className="w-fit">
          <Button className="px-6 py-5 bg-purple-700" asChild>
            <Link href="/tasks/new">Nova tarefa</Link>
          </Button>
        </div>
      </section>

      <TasksIndicatorsCards />

      <TasksFilter filters={filters} onFilterChange={handleFiltersChange} />

      {isLoading ? <TaskTableSkeleton /> : <TasksTable tasks={tasks} />}

      {tasks.length && (
        <TasksPagination page={page} totalPages={5} onPageChange={setPage} />
      )}
    </section>
  );
}
