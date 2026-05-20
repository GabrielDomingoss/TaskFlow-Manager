import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { priorityOptions, statusOptions } from "../../constants/task-options";
import { Textarea } from "@/components/ui/textarea";
import { TaskFormDatePicker } from "./task-form-date-picker";
import { TaskFormData } from "../../schemas/task-schema";

interface ITaskFormFieldsProps {
  control: Control<TaskFormData>;
  formState: FormState<TaskFormData>;
  register: UseFormRegister<TaskFormData>;
  isEditMode: boolean;
}

export function TaskFormFields({
  control,
  formState,
  register,
  isEditMode,
}: ITaskFormFieldsProps) {
  return (
    <>
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
              <Select value={field.value} onValueChange={field.onChange}>
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

        <TaskFormDatePicker control={control} formState={formState} />

        {isEditMode && (
          <Field>
            <FieldLabel className="font-semibold text-zinc-950 text-sm">
              Status <span className="text-red-600">*</span>
            </FieldLabel>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="rounded-md">
                    <SelectValue placeholder="Escolha um status" />
                  </SelectTrigger>

                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
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
            <FieldError>{formState.errors.description.message}</FieldError>
          )}
        </Field>
      </div>
    </>
  );
}
