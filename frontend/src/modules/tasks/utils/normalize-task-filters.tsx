import { ITaskFilters } from "../types/task";

export const normalizeTaskFilters = (filters: ITaskFilters) => {
  return {
    search: filters.search || undefined,
    status: filters.status || undefined,
    priority: filters.priority || undefined,
    categoryId: filters.categoryId || undefined,
  };
};
