import { api } from "@/lib/api";
import { ICategory } from "../types/category";

export async function getCategories() {
  const { data } = await api.get<ICategory[]>("/categories");

  return data;
}
