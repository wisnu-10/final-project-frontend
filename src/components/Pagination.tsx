import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  label?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  label = "items",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/30">
      <p className="text-xs text-gray-500 font-medium">
        Page {currentPage} of {totalPages} ({totalItems} {label})
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
