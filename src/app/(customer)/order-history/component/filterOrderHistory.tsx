import { useGetAllOrder } from "@/features/order-customer/hooks/useGetAllOrder";
import {
  CheckCircle,
  Clock,
  CreditCard,
  Filter,
  Package,
  Search,
  Truck,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import OrderList from "./orderList";
import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  items: number;
  total: number;
  pickupAddress: string;
  deliveryAddress: string;
  deliveredAt?: string;
  confirmedAt?: string;
}

type OrderStatus =
  | "waiting_pickup"
  | "on_the_way_to_outlet"
  | "arrived_outlet"
  | "washing"
  | "ironing"
  | "packing"
  | "waiting_payment"
  | "ready_delivery"
  | "delivering"
  | "completed"
  | "cancelled";

type PaymentStatus = "pending" | "paid" | "failed" | "expired";

interface FilterProps {
  getOrder: (params?: any) => Promise<void>;
  setShowPaymentModal: (show: boolean) => void;
  setSelectedOrder: (order: Order | null) => void;
  order?: any[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function FilterOrderHistory({
  getOrder,
  order,
  setShowPaymentModal,
  setSelectedOrder,
  isLoading,
  isError,
}: FilterProps) {
  const { orders: listOrder = [] } = (order as any) || {};

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<
    PaymentStatus | "all"
  >("all");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<
    OrderStatus | "all"
  >("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const filteredOrders = listOrder?.filter((order: any) => {
    const query = debouncedSearch.toLowerCase();

    const isMatchSearch =
      !query ||
      order.id.toLowerCase().includes(query) ||
      order.pickupAddress?.address?.toLowerCase().slice(0, 8).includes(query) ||
      order.pickupAddress?.cityName?.toLowerCase().includes(query) ||
      order.deliveryAddress?.address?.toLowerCase().includes(query) ||
      order.deliveryAddress?.cityName?.toLowerCase().includes(query);

    const currentStatusPayment = order.payments?.[0]?.status;
    const currentStatusOrder = order.statusLogs?.[0]?.status;
    const currentDate = new Date(order.createdAt).getTime();

    const isMatchPayment = currentStatusPayment === selectedPaymentStatus;
    const isMatchOrder = currentStatusOrder === selectedOrderStatus;
    const isMatchStartDate = currentDate >= new Date(startDate).getTime();
    const isMatchEndDate = currentDate <= new Date(endDate).getTime();

    return (
      isMatchSearch &&
      (selectedPaymentStatus === "all" || isMatchPayment) &&
      (selectedOrderStatus === "all" || isMatchOrder) &&
      (!startDate || isMatchStartDate) &&
      (!endDate || isMatchEndDate)
    );
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4 flex gap-2">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6662]" />
          <input
            type="text"
            placeholder="Search order number or address..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#E5DDD3] focus:border-[#4A90E2] outline-none transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
            showFilters
              ? "bg-[#4A90E2] text-white shadow-lg"
              : "bg-white text-[#6B6662] border-2 border-[#E5DDD3] hover:border-[#4A90E2]"
          }`}
        >
          <Filter className="w-4 h-4" />

          {(selectedPaymentStatus !== "all" ||
            selectedOrderStatus !== "all" ||
            startDate ||
            endDate) && <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />}
        </button>
      </div>

      {/* Filter Toggle Button */}
      <div className="mb-4 flex gap-2">
        {(selectedPaymentStatus !== "all" ||
          selectedOrderStatus !== "all" ||
          startDate ||
          endDate) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedPaymentStatus("all");
              setSelectedOrderStatus("all");
              setStartDate("");
              setEndDate("");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-400 transition-all"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="z-1 absolute right-0 md:right-75 w-full max-w-xl md:max-w-md bg-white rounded-2xl shadow-xl border border-[#E5DDD3] p-6 space-y-4 animate-in fade-in zoom-in duration-200">
          {/* Payment Status (Tetep Grid ok) */}
          <div>
            <label className="block text-sm font-semibold text-[#6B6662] mb-3">
              Payment Status
            </label>
            <div className="flex flex-wrap gap-2">
              {["all", "pending", "paid", "failed", "expired"].map((val) => (
                <button
                  key={val}
                  onClick={() => setSelectedPaymentStatus(val as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${selectedPaymentStatus === val ? "bg-[#4A90E2] text-white" : "bg-[#FAF6F1] text-[#6B6662] border border-transparent hover:border-[#E5DDD3]"}`}
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Order Status: Pake Max-Height + Scrollbar rapi */}
          <div>
            <label className="block text-sm font-semibold text-[#6B6662] mb-3">
              Order Status
            </label>
            <div className="max-height-[200px] overflow-y-auto pr-2 grid grid-cols-2 gap-2 scrollbar-thin scrollbar-thumb-gray-200">
              {[
                "all",
                "waiting_pickup",
                "arrived_outlet",
                "washing",
                "ironing",
                "packing",
                "waiting_payment",
                "ready_delivery",
                "delivering",
                "completed",
              ].map((val) => (
                <button
                  key={val}
                  onClick={() => setSelectedOrderStatus(val as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${selectedOrderStatus === val ? "bg-[#4A90E2] text-white" : "bg-[#FAF6F1] text-[#6B6662] border border-transparent hover:bg-[#E5DDD3]"}`}
                >
                  {val
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="pt-2 border-t border-[#FAF6F1]">
            <label className="block text-sm font-semibold text-[#6B6662]">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Input date lu di sini */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-[#E5DDD3] outline-none text-sm"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-[#E5DDD3] outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(false)}
            className="w-full mt-2 py-2 bg-[#4A90E2] text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#6B6662]">No orders found for this status.</p>
        </div>
      ) : (
        filteredOrders?.map((order: any) => (
          <OrderList key={order.id}
            order={order}
            setShowPaymentModal={setShowPaymentModal}
            setSelectedOrder={setSelectedOrder}
            isLoading={isLoading}
            isError={isError}
            getOrder={getOrder}
          />
        ))
      )}
    </div>
  );
}
