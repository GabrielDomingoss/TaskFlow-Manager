import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Control, Controller, FormState } from "react-hook-form";
import { TaskFormData } from "../../schemas/task-schema";
import { ICategory } from "../../types/category";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ITaskFormCategories {
  control: Control<TaskFormData>;
  categories: ICategory[];
  formState: FormState<TaskFormData>;
}

export function TaskFormCategories({
  control,
  categories,
  formState,
}: ITaskFormCategories) {
  return (
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
                        field.value.filter((id) => id !== category.id),
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
        <FieldError>{formState.errors.categoryIds.message}</FieldError>
      )}
    </div>
  );
}
