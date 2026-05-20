import { Badge } from "@/components/ui/badge";
import { taskStatusLabels } from "../constants/task-labels";
import { cn } from "@/lib/utils";

interface ITaskStatusBadge {
  status: keyof typeof taskStatusLabels;
}

const statusClasses = {
  PENDING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

export const TaskStatusBadge = ({ status }: ITaskStatusBadge) => {
  return (
    <Badge
      className={cn(
        "rounded-full px-2 py-1 text-xs font-semibold",
        statusClasses[status],
      )}
    >
      {taskStatusLabels[status]}
    </Badge>
  );
};
