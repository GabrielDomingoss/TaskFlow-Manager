import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ITasksPaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
}

export function TasksPagination({
  page,
  totalPages,
  limit,
  onLimitChange,
  onPageChange,
}: ITasksPaginationProps) {
  const pages = [];

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    pages.push(currentPage);
  }

  const goToPreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <div className="flex items-center gap-2">
          <p className="text-sm text-zinc-500">Linhas por página</p>

          <Select
            value={String(limit)}
            onValueChange={(value) => onLimitChange(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <PaginationItem>
          <PaginationPrevious
            onClick={goToPreviousPage}
            className={cn(
              "cursor-pointer [&>span]:hidden",
              page === 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        {pages.map((currentPage) => (
          <PaginationItem key={currentPage}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(currentPage)}
              className={
                page === currentPage
                  ? "cursor-pointer bg-purple-700 text-white hover:bg-purple-800 hover:text-white"
                  : "cursor-pointer"
              }
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={goToNextPage}
            text=""
            className={cn(
              "cursor-pointer [&>span]:hidden",
              page === totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
