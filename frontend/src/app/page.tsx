"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/modules/common/components/page-header";
import { TaskTableSkeleton } from "@/modules/tasks/components/task-table-skeleton";
import { TasksFilter } from "@/modules/tasks/components/tasks-filter";
import { TasksIndicatorsCards } from "@/modules/tasks/components/tasks-indicators-cards";
import { TasksPagination } from "@/modules/tasks/components/tasks-pagination";
import { TasksTable } from "@/modules/tasks/components/tasks-table";
import { useTasksList } from "@/modules/tasks/hooks/use-tasks-list";
import { useTasksSummary } from "@/modules/tasks/hooks/use-tasks-summary";
import { normalizeTaskFilters } from "@/modules/tasks/utils/normalize-task-filters";
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
  const [limit, setLimit] = useState(10);
  const { data: summary } = useTasksSummary();
  const { data, isPending: isLoading } = useTasksList({
    ...normalizeTaskFilters(filters),
    page,
    limit,
  });

  const handleFiltersChange = (key: keyof typeof filters, value: string) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }));

    setPage(1);
  };

  return (
    <section className="flex flex-col container self-center pt-6 px-6 gap-6">
      <PageHeader
        title="Bem vindo!"
        description="Comece criando novas tarefas!"
        actions={
          <Button
            asChild
            className="bg-purple-700 hover:!bg-purple-800 px-6 py-5"
          >
            <Link href="/tasks/new">Nova tarefa</Link>
          </Button>
        }
      />

      <TasksIndicatorsCards
        pending={summary?.pending ?? 0}
        inProgress={summary?.inProgress ?? 0}
        done={summary?.done ?? 0}
      />

      <TasksFilter filters={filters} onFilterChange={handleFiltersChange} />

      {isLoading ? (
        <TaskTableSkeleton />
      ) : (
        <TasksTable tasks={data?.data ?? []} />
      )}

      {Boolean(data?.data.length) && (
        <TasksPagination
          page={data?.meta?.page ?? 1}
          totalPages={data?.meta.totalPages ?? 1}
          limit={limit}
          onLimitChange={(value) => {
            setLimit(value);
            setPage(1);
          }}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
