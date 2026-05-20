"use client";
import { useCurrentUser } from "@/modules/users/hooks/use-current-service";
import { CircleUserRound, ClipboardList } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const { data: user } = useCurrentUser();
  return (
    <header className="border-b border-purple-100 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-700 text-white">
              <ClipboardList className="h-5 w-5" />
            </div>
          </Link>

          <div>
            <p className="text-sm font-bold text-purple-900">
              Taskflow Manager
            </p>
            <span className="text-xs text-zinc-500">
              Gerenciador de tarefas
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:flex flex-col">
            <span className="text-sm font-medium text-zinc-950">
              {user?.name ?? "Usuário"}
            </span>
            <span className="text-xs text-zinc-500">
              {user?.email ?? "Desenvolvedor de Software"}
            </span>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
            <CircleUserRound className="h-6 w-6 text-purple-700" />
          </div>
        </div>
      </div>
    </header>
  );
}
