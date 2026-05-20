import { api } from "@/lib/api";

export async function getCurrentUser() {
  const { data } = await api.get("/users/me");

  return data;
}
