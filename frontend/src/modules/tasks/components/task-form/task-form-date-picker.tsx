import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/date";
import { ChevronDown } from "lucide-react";
import { Control, Controller, FormState } from "react-hook-form";
import { TaskFormData } from "../../schemas/task-schema";

interface ITaskFormDatePickerProps {
  control: Control<TaskFormData>;
  formState: FormState<TaskFormData>;
}

export function TaskFormDatePicker({
  control,
  formState,
}: ITaskFormDatePickerProps) {
  return (
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
  );
}
