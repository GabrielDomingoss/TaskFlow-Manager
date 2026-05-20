"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ITask } from "../types/task";
import { ChevronDown, ChevronLeft } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/date";
import { Calendar } from "@/components/ui/calendar";
import { taskSchema } from "../schemas/task-schema";
import { Controller, useForm } from "react-hook-form";
import { TaskFormData } from "../schemas/task-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useTaskCreate } from "../hooks/use-task-create";
import { useTaskUpdate } from "../hooks/use-task-update";
import { cn } from "@/lib/utils";
import { CURRENT_USER_ID } from "../constants/current-user";
import { useCategoriesList } from "../hooks/use-categories-list";
import { priorityOptions, statusOptions } from "../constants/task-options";

interface ITaskFormProps {
  initialData?: ITask;
  isEditMode?: boolean;
}

export function TaskForm({ initialData, isEditMode = false }: ITaskFormProps) {
  const router = useRouter();
  const { mutateAsync: createTask, isPending: isCreatingTask } =
    useTaskCreate();
  const { mutateAsync: updateTask, isPending: isUpdatingTask } =
    useTaskUpdate();
  const { data: categories = [] } = useCategoriesList();
  const isSaving = isCreatingTask || isUpdatingTask;

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
    const payload = {
      ...data,
      userId: CURRENT_USER_ID,
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
      <div className="flex flex-col md:flex-row gap-2 md:gap-0">
        <div className="flex items-center w-full">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/">
              <ChevronLeft className="text-purple-900" />
            </Link>
          </Button>

          <h1 className="font-bold text-xl text-purple-900 w-full">
            {isEditMode ? "Editar Tarefa" : "Adicionar Tarefa"}
          </h1>
        </div>

        <div className="gap-2 flex md:flex-row">
          {isEditMode && (
            <Button
              className="px-6 py-5 border-purple-700 text-purple-700 hover:cursor-pointer hover:bg-purple-700 hover:text-white"
              variant="outline"
            >
              Excluir
            </Button>
          )}

          <Button
            className="px-6 py-5 bg-purple-700 hover:cursor-pointer hover:opacity-50"
            type="submit"
            disabled={isSaving}
            form="task-form"
          >
            Salvar
          </Button>
        </div>
      </div>

      <Card className="border-purple-100 bg-white shadow-sm">
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitTask)} id="task-form">
            <div className="flex flex-col p-6 rounded-sm gap-4">
              <div className="flex gap-4 flex-col md:flex-row">
                <Field>
                  <FieldLabel className="font-semibold text-zinc-950 text-sm">
                    Titulo <span className="text-red-600">*</span>
                  </FieldLabel>
                  <Input
                    placeholder="Insira um título"
                    className="rounded-md"
                    {...register("title")}
                  />
                  {formState.errors.title && (
                    <FieldError>{formState.errors.title.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel className="font-semibold text-zinc-950 text-sm">
                    Prioridade <span className="text-red-600">*</span>
                  </FieldLabel>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full rounded-md">
                          <SelectValue placeholder="Selecione uma prioridade" />
                        </SelectTrigger>

                        <SelectContent>
                          {priorityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {formState.errors.priority && (
                    <FieldError>{formState.errors.priority.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel className="font-semibold text-zinc-950 text-sm">
                    Data de Vencimento <span className="text-red-600">*</span>
                  </FieldLabel>

                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!field.value}
                            className="w-full justify-between text-left font-normal bg-white rounded-md"
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Escolha uma data de vencimento</span>
                            )}
                            <ChevronDown className="h-4 w-4 opacity-70" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            defaultMonth={field.value}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />

                  {formState.errors.dueDate && (
                    <FieldError>{formState.errors.dueDate.message}</FieldError>
                  )}
                </Field>

                {isEditMode && (
                  <Field>
                    <FieldLabel className="font-semibold text-zinc-950 text-sm">
                      Status <span className="text-red-600">*</span>
                    </FieldLabel>

                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="rounded-md">
                            <SelectValue placeholder="Escolha um status" />
                          </SelectTrigger>

                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {formState.errors.status && (
                      <FieldError>{formState.errors.status.message}</FieldError>
                    )}
                  </Field>
                )}
              </div>

              <div>
                <Field>
                  <FieldLabel className="font-semibold text-zinc-950 text-sm">
                    Descrição <span className="text-red-600">*</span>
                  </FieldLabel>
                  <Textarea
                    placeholder="Descreva a atividade"
                    className="min-h-32 resize-none rounded-md"
                    {...register("description")}
                  />

                  {formState.errors.description && (
                    <FieldError>
                      {formState.errors.description.message}
                    </FieldError>
                  )}
                </Field>
              </div>

              <div className="flex flex-col gap-2">
                <FieldLabel className="font-semibold text-zinc-950 text-sm">
                  Categorias <span className="text-red-600">*</span>
                </FieldLabel>

                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-3 rounded-md border p-4 sm:grid-cols-2">
                      {categories.map((category) => {
                        const checked = field.value.includes(category.id);

                        return (
                          <Field
                            key={category.id}
                            orientation="horizontal"
                            className={cn(
                              "gap-2 py-2 border rounded-md p-4 transition-all",
                              checked
                                ? "border-purple-600 bg-purple-50"
                                : "border-zinc-200 hover:border-purple-300",
                            )}
                          >
                            <Checkbox
                              checked={checked}
                              className="cursor-pointer border-purple-600 data-[state=checked]:border-purple-700 data-[state=checked]:bg-purple-700 data-[state=checked]:text-white"
                              onCheckedChange={(value) => {
                                if (value) {
                                  field.onChange([...field.value, category.id]);
                                  return;
                                }

                                field.onChange(
                                  field.value.filter(
                                    (id) => id !== category.id,
                                  ),
                                );
                              }}
                            />
                            <Label>{category.name}</Label>
                          </Field>
                        );
                      })}
                    </div>
                  )}
                />

                {formState.errors.categoryIds && (
                  <FieldError>
                    {formState.errors.categoryIds.message}
                  </FieldError>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
