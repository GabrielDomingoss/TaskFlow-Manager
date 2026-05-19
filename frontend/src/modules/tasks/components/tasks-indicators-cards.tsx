import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock3, LoaderCircle } from "lucide-react";

const indicators = [
  {
    label: "Pendentes",
    value: 40,
    icon: Clock3,
    className: "from-purple-700 to-purple-600",
  },
  {
    label: "Em andamento",
    value: 40,
    icon: LoaderCircle,
    className: "from-purple-800 to-violet-600",
  },
  {
    label: "Concluídas",
    value: 40,
    icon: CheckCircle2,
    className: "from-violet-700 to-fuchsia-600",
  },
];

export function TasksIndicatorsCards() {
  return (
    <section className="grid md:grid-cols-3 gap-4">
      {indicators.map((indicator) => {
        const Icon = indicator.icon;

        return (
          <Card
            key={indicator.label}
            className={cn(
              "relative overflow-hidden border-0 bg-gradient-to-br text-white shadow-sm",
              indicator.className,
            )}
          >
            <CardContent className="relative flex justify-between p-4">
              <div>
                <p className="text-sm font-semibold text-white/80">
                  {indicator.label}
                </p>

                <strong className="mt-4 block text-6xl font-bold leading-none">
                  {indicator.value}
                </strong>
              </div>

              <Icon className="absolute -right-8 top-1/2 h-40 w-40 -translate-y-1/2 text-white/30" />
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
