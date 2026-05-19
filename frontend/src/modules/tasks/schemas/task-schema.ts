import { z } from "zod";
export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "O titulo deve ter pelo menos 3 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  description: z
    .string()
    .trim()
    .min(5, "A descrição deve ter pelo menos 5 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres"),

  dueDate: z.date({
    error: "Informe a data de vencimento",
  }),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    error: "Selecione uma prioridade",
  }),

  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),

  categoryIds: z.array(z.string()).min(1, "Selecione pelo menos uma categoria"),
});

export type TaskFormData = z.infer<typeof taskSchema>;
