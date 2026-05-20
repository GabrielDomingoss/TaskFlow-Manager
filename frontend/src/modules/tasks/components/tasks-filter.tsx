import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useCategoriesList } from "../hooks/use-categories-list";
import { priorityOptions, statusOptions } from "../constants/task-options";

interface IFilter {
  search: string;
  status: string;
  priority: string;
  categoryId: string;
}

interface ITasksFilterProps {
  filters: IFilter;
  onFilterChange: (
    key: keyof ITasksFilterProps["filters"],
    value: string,
  ) => void;
}

export function TasksFilter({ filters, onFilterChange }: ITasksFilterProps) {
  const { data: categories = [] } = useCategoriesList();
  return (
    <Card className="border-purple-100 shadow-sm">
      <CardContent className="flex flex-col gap-2 pb-2">
        <Field>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <Input
              placeholder="Pesquise pelo título da tarefa"
              value={filters.search}
              onChange={(event) => onFilterChange("search", event.target.value)}
              className="pl-10"
            />
          </div>
        </Field>

        <div className="flex md:flex-row gap-4 flex-col">
          <Field>
            <FieldLabel>Status</FieldLabel>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                onFilterChange("status", value === "ALL" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pesquise por status" />
              </SelectTrigger>

              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Prioridade</FieldLabel>
            <Select
              value={filters.priority}
              onValueChange={(value) =>
                onFilterChange("priority", value === "ALL" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pesquise por prioridade" />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Categoria</FieldLabel>
            <Select
              value={filters.categoryId}
              onValueChange={(value) =>
                onFilterChange("categoryId", value === "ALL" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pesquise por categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
