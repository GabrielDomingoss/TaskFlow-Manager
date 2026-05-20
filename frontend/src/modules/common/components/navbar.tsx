import { CircleUserRound, ClipboardList } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-purple-100 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-700 text-white">
            <ClipboardList className="h-5 w-5" />
          </div>

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
              Gabriel Domingos
            </span>
            <span className="text-xs text-zinc-500">
              Desenvolvedor de Software
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
