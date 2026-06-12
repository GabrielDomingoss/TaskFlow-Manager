"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ITask } from "../../types/task";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { taskSchema } from "../../schemas/task-schema";
import { useForm } from "react-hook-form";
import { TaskFormData } from "../../schemas/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTaskCreate } from "../../hooks/use-task-create";
import { useTaskUpdate } from "../../hooks/use-task-update";
import { useCategoriesList } from "../../hooks/use-categories-list";
import { TaskNotFound } from "../task-not-found";
import { useState } from "react";
import { TaskConfirmDialog } from "../task-confirm-dialog";
import { PageHeader } from "@/modules/common/components/page-header";
import { TaskFormFields } from "./task-form-fields";
import { TaskFormCategories } from "./task-form-categories";
import { useCurrentUser } from "@/modules/users/hooks/use-current-service";
import { toast } from "sonner";

interface ITaskFormProps {
  initialData?: ITask;
  isEditMode?: boolean;
}

export function TaskForm({ initialData, isEditMode = false }: ITaskFormProps) {
  const router = useRouter();
  const [isConfirmUpdateOpen, setIsConfirmUpdateOpen] = useState(false);
  const { mutateAsync: createTask, isPending: isCreatingTask } =
    useTaskCreate();
  const { mutateAsync: updateTask, isPending: isUpdatingTask } =
    useTaskUpdate();
  const { data: categories = [] } = useCategoriesList();
  const isSaving = isCreatingTask || isUpdatingTask;
  const { data: currentUser } = useCurrentUser();

  const { register, control, handleSubmit, formState } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      dueDate: initialData ? new Date(initialData.dueDate) : undefined,
      priority: initialData?.priority ?? undefined,
      status: initialData?.status ?? "PENDING",
      categoryIds: initialData?.categories.map((category) => category.id) ?? [],
    },
  });

  const handleSubmitTask = async (data: TaskFormData) => {
    if (!currentUser) {
      toast.error("Usuário não carregado");
      return;
    }

    const payload = {
      ...data,
      userId: currentUser.id,
    };

    if (isEditMode && initialData?.id) {
      await updateTask({ id: initialData.id, payload });
      router.push("/");
      return;
    }

    await createTask(payload);
    router.push("/");
  };

  return (
    <section className="flex flex-col container self-center pt-6 px-6 gap-4">
      <PageHeader
        title={isEditMode ? "Editar Tarefa" : "Adicionar Tarefa"}
        backHref="/"
        actions={
          <Button
            className="px-6 py-5 bg-purple-700 hover:cursor-pointer hover:opacity-50 transition-all"
            type={isEditMode ? "button" : "submit"}
            disabled={!formState.isValid || isSaving}
            form="task-form"
            onClick={() => {
              if (isEditMode) {
                setIsConfirmUpdateOpen(true);
              }
            }}
          >
            {isSaving ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        }
      />

      {!initialData && isEditMode ? (
        <TaskNotFound />
      ) : (
        <Card className="border-purple-100 bg-white shadow-sm">
          <CardContent>
            <form onSubmit={handleSubmit(handleSubmitTask)} id="task-form">
              <div className="flex flex-col p-6 rounded-sm gap-4">
                <TaskFormFields
                  control={control}
                  formState={formState}
                  isEditMode={isEditMode}
                  register={register}
                />

                <TaskFormCategories
                  control={control}
                  categories={categories}
                  formState={formState}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <TaskConfirmDialog
        open={isConfirmUpdateOpen}
        onOpenChange={setIsConfirmUpdateOpen}
      />
    </section>
  );
}
