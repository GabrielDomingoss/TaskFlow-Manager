import { ITask } from "../types/task";

export const tasks: ITask[] = [
  {
    id: "001",
    title: "Criação de Home",
    description: "Criar a página de home do taskFlow",
    dueDate: new Date().toString(),
    priority: "LOW",
    status: "IN_PROGRESS",
    userId: "001a",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    categories: [
      {
        id: "001ab",
        name: "Desenvolvimento",
        createdAt: new Date().toString(),
      },
    ],
  },
];
