import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/category-service";

export function useCategoriesList() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
