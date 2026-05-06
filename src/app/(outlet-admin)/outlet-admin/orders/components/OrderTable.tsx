import Link from "next/link";
import { FiEye, FiPlay, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getStatusConfig } from "@/utils/orderStatus.utils";
import { formatIDR } from "@/utils/formatCurrency.utils";

interface OrderTableProps {
  orders: any[];
  loading: boolean;
  pagination: any;
  page: number;
  setPage: (val: number) => void;
}

const getLatestStatus = (statusLogs: any[]) => {
  if (!statusLogs || statusLogs.length === 0) return "Processing";
  return statusLogs[0]?.status || "Processing";
};

import Pagination from "@/components/Pagination";

export default function OrderTable({
  orders,
  loading,
  pagination,
  page,
  setPage,
}: OrderTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
        <div className="inline-block w-8 h-8 border-4 border-[#ff7143] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="font-medium">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
        No orders found matching your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-left">
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Customer
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Status
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Worker
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm">
                Weight
              </th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Price</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => {
              const latestStatus = getLatestStatus(order.statusLogs);
              const statusConfig = getStatusConfig(latestStatus);
              const latestWorker = order.statusLogs?.[0]?.worker;

              return (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-gray-800 font-bold text-sm">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {order.customer?.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wide ${statusConfig.bgColor} ${statusConfig.textColor}`}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {latestWorker ? (
                      <span className="font-medium text-gray-700">
                        {latestWorker.firstName} {latestWorker.lastName}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {order.totalWeight ? (
                      <span className="font-medium">
                        {Number(order.totalWeight)} kg
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-800">
                    {order.totalPrice ? (
                      formatIDR(Number(order.totalPrice))
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/outlet-admin/orders/${order.invoiceNumber}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="View Details"
                      >
                        <FiEye className="w-5 h-5" />
                      </Link>
                      {latestStatus === "arrived_outlet" && (
                        <Link
                          href={`/outlet-admin/orders/${order.invoiceNumber}/process`}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                          title="Process Order"
                        >
                          <FiPlay className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={pagination?.totalPages || 0}
        totalItems={pagination?.total || 0}
        onPageChange={setPage}
        label="orders"
      />
    </div>
  );
}
