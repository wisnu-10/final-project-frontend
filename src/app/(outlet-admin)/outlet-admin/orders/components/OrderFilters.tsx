import { FiSearch, FiFilter } from "react-icons/fi";

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "waiting_pickup", label: "Waiting Pickup" },
  { value: "on_the_way_to_outlet", label: "On the Way" },
  { value: "arrived_outlet", label: "Arrived Outlet" },
  { value: "washing", label: "Washing" },
  { value: "ironing", label: "Ironing" },
  { value: "packing", label: "Packing" },
  { value: "waiting_payment", label: "Waiting Payment" },
  { value: "ready_delivery", label: "Ready Delivery" },
  { value: "delivering", label: "Delivering" },
  { value: "completed", label: "Completed" },
];

interface OrderFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  orderStatus: string;
  setOrderStatus: (val: string) => void;
  workerId: string;
  setWorkerId: (val: string) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  workers: any[];
  setPage: (val: number) => void;
}

export default function OrderFilters({
  search,
  setSearch,
  orderStatus,
  setOrderStatus,
  workerId,
  setWorkerId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  workers,
  setPage,
}: OrderFiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all bg-white text-sm"
          />
        </div>

        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer text-sm"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={workerId}
            onChange={(e) => {
              setWorkerId(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer text-sm"
          >
            <option value="">All Workers</option>
            {workers.map((w: any) => (
              <option key={w.id} value={w.id}>
                {w.firstName} {w.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all bg-white text-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all bg-white text-sm"
          />
        </div>
      </div>
    </div>
  );
}
