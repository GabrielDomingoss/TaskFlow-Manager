import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface IPageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  backHref,
  actions,
}: IPageHeaderProps) {
  return (
    <header className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="flex w-full items-center">
        {backHref && (
          <Button size="icon" variant="ghost" asChild>
            <Link href={backHref}>
              <ArrowLeft className="text-purple-900" />
            </Link>
          </Button>
        )}

        <div className="w-full">
          <h1 className="text-2xl font-bold text-purple-900">{title}</h1>

          {description && (
            <p className="text-sm text-zinc-500">{description}</p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex flex-col gap-2 md:flex-row">{actions}</div>
      )}
    </header>
  );
}
