import { Skeleton } from "@/components/ui/skeleton";

export function TaskTableSkeleton() {
  return (
    <section className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
      <div className="border-b bg-purple-700 p-4">
        <Skeleton className="h-6 w-full bg-white/20" />
      </div>

      <div className="space-y-4 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="grid grid-cols-9 gap-4">
            {Array.from({ length: 9 }).map((_, skeletonIndex) => (
              <Skeleton key={skeletonIndex} className="h-10 w-full" />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
