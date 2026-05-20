"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITask } from "../types/task";
import { formatDate } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { ClipboardList, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { TaskDeleteDialog } from "./task-delete-dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TaskStatusBadge } from "./task-status-badge";
import { TaskPriorityBadge } from "./task-priority-badge";

interface ITasksTableProps {
  tasks: ITask[];
}

export function TasksTable({ tasks }: ITasksTableProps) {
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);

  if (!tasks.length) {
    return (
      <div className="flex min-h-80 bg-white shadow-sm flex-col items-center justify-center rounded-md border border-dashed border-purple-200 bg-purple-50/20">
        <ClipboardList className="h-16 w-16 text-purple-300" />

        <h2 className="mt-4 text-lg font-semibold text-purple-950">
          Nenhuma tarefa encontrada
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Tente ajustar os filtros ou criar uma nova tarefa
        </p>
      </div>
    );
  }

  return (
    <div className="shadow-lg overflow-hidden rounded-lg">
      <Table>
        <TableHeader className="bg-purple-800">
          <TableRow className="hover:bg-purple-800">
            <TableHead className="text-white">Titulo</TableHead>
            <TableHead className="text-white">Vencimento</TableHead>
            <TableHead className="text-white">Prioridade</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Responsável</TableHead>
            <TableHead className="text-white">Categorias</TableHead>
            <TableHead className="text-white">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{formatDate(task.dueDate)}</TableCell>
              <TableCell>
                <TaskPriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>
              <TableCell>{task.user.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {task.categories[0] && (
                    <Badge className="bg-purple-100 text-xs font-medium text-purple-700">
                      {task.categories[0].name}
                    </Badge>
                  )}

                  {task.categories.length > 1 && (
                    <Badge className="bg-purple-100 text-xs font-medium text-purple-700">
                      + {task.categories.length - 1}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="hover:cursor-pointer hover:bg-purple-100"
                >
                  <Link href={`/tasks/${task.id}/edit`}>
                    <Pencil className="text-purple-800" />
                  </Link>
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="hover:cursor-pointer hover:bg-purple-100"
                >
                  <Link href={`/tasks/${task.id}`}>
                    <Eye className="text-purple-800" />
                  </Link>
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setTaskToDelete(task)}
                  className="hover:cursor-pointer hover:bg-purple-100"
                >
                  <Trash2 className="text-purple-800" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TaskDeleteDialog
        task={taskToDelete}
        open={Boolean(taskToDelete)}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setTaskToDelete(null);
          }
        }}
      />
    </div>
  );
}
