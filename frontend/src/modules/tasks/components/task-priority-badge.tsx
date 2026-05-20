import { Badge } from "@/components/ui/badge";
import { TaskPriority } from "../types/task";
import { cn } from "@/lib/utils";
import { taskPriorityLabels } from "../constants/task-labels";

interface ITaskPriorityBadgeProps {
  priority: TaskPriority;
}

const priorityClassName: Record<TaskPriority, string> = {
  LOW: "bg-zinc-100 text-zinc-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  HIGH: "bg-red-100 text-red-700",
};

export const TaskPriorityBadge = ({ priority }: ITaskPriorityBadgeProps) => {
  return (
    <Badge
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        priorityClassName[priority],
      )}
    >
      {taskPriorityLabels[priority]}
    </Badge>
  );
};
