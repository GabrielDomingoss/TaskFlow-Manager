"use client";
import { Loading } from "@/modules/common/components/loading";
import { TaskForm } from "@/modules/tasks/components/task-form";
import { useTaskById } from "@/modules/tasks/hooks/use-task-by-id";
import { useParams } from "next/navigation";

export default function EditTaskPage() {
  const params = useParams<{ id: string }>();
  const { data: task, isPending: isLoadingTask } = useTaskById(params.id);

  if (isLoadingTask) {
    return <Loading />;
  }

  return <TaskForm isEditMode={true} initialData={task} />;
}
