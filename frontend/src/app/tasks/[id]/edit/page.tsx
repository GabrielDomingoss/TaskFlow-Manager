import { TaskForm } from "@/modules/tasks/components/task-form";
import { tasks } from "@/modules/tasks/data/tasks-mock";
import { notFound } from "next/navigation";

interface IEditTaskPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTaskPage({ params }: IEditTaskPageProps) {
  const { id } = await params;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    notFound();
  }

  return <TaskForm isEditMode={true} initialData={task} />;
}
