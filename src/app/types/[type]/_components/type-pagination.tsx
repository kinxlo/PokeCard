import {ChevronLeft, ChevronRight} from "lucide-react";

interface TypePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TypePagination({
                                 currentPage,
                                 totalPages,
                                 onPageChange,
                               }: TypePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border bg-card hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card"
      >
        <ChevronLeft className="h-4 w-4"/>
        Previous
      </button>
      <div className="px-4 py-2.5 text-sm font-medium">
        Page <span className="font-bold">{currentPage}</span> of{" "}
        <span className="font-bold">{totalPages}</span>
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border bg-card hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card"
      >
        Next
        <ChevronRight className="h-4 w-4"/>
      </button>
    </div>
  );
}

