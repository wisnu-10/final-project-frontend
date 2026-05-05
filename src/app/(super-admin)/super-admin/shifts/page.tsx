"use client";

import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiClock } from "react-icons/fi";
import { useShifts } from "@/features/super-admin/shifts/hooks/useShifts";
import Pagination from "@/components/Pagination";

export default function ShiftsPage() {
  const {
    shifts,
    loading,
    search,
    setSearch,
    page,
    setPage,
    pagination,
    handleDelete,
  } = useShifts();

  const formatTime = (time: string) => {
    try {
      const date = new Date(time);
      if (isNaN(date.getTime())) return time;
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch {
      return time;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Working Shifts</h1>
        <Link
          href="/super-admin/shifts/create"
          className="bg-[#ff7143] hover:bg-[#e05e32] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm"
        >
          <FiPlus /> Add Shift
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search shifts by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center gap-3">
             <div className="w-8 h-8 border-4 border-[#ff7143] border-t-transparent rounded-full animate-spin"></div>
             Loading shifts...
          </div>
        ) : shifts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {search ? "No shifts found matching your search." : "No shifts found. Create your first shift!"}
          </div>
        ) : (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="p-4 font-semibold text-gray-600">Shift Name</th>
                  <th className="p-4 font-semibold text-gray-600 w-48">Start Time</th>
                  <th className="p-4 font-semibold text-gray-600 w-48">End Time</th>
                  <th className="p-4 font-semibold text-gray-600 w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr
                    key={shift.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-[#ff7143]">
                          <FiClock className="w-5 h-5" />
                        </div>
                        <div className="text-gray-800 font-medium">{shift.shiftName}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">
                      {formatTime(shift.startTime)}
                    </td>
                    <td className="p-4 text-gray-600 font-medium">
                      {formatTime(shift.endTime)}
                    </td>
                    <td className="p-4 flex gap-2">
                      <Link
                        href={`/super-admin/shifts/${shift.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => handleDelete(shift.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              onPageChange={setPage}
              label="shifts"
            />
          </>
        )}
      </div>
    </div>
  );
}
