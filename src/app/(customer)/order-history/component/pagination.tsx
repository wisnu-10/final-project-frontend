import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  order: any;
  totalPage: number;
  totalOrder: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalOrder,
  totalPage,
  currentPage,
  pageSize,
  onPageChange,
}: PaginationProps) {
  

  // Hitung angka buat text "Showing X-Y of Z"
  const startIndex = totalOrder > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endIndex = Math.min(currentPage * pageSize, totalOrder);

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-2">
        {/* Tombol Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-lg border-2 border-[#E5DDD3] flex items-center justify-center hover:border-[#4A90E2] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-[#6B6662]" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? "bg-[#4A90E2] text-white shadow-lg"
                  : "border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#4A90E2]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Tombol Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="w-10 h-10 rounded-lg border-2 border-[#E5DDD3] flex items-center justify-center hover:border-[#4A90E2] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-5 h-5 text-[#6B6662]" />
        </button>
      </div>

      {/* Results Info Dinamis */}
      <div className="text-center text-sm text-[#6B6662]">
        Showing{" "}
        <span className="font-semibold text-[#4A90E2]">{startIndex}</span>-
        <span className="font-semibold text-[#4A90E2]">{endIndex}</span> of{" "}
        <span className="font-semibold text-[#4A90E2]">{totalOrder}</span>{" "}
        orders
      </div>
    </div>
  );
}
