import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <LoaderCircle className="h-14 w-14 animate-spin text-purple-700" />
    </section>
  );
}
