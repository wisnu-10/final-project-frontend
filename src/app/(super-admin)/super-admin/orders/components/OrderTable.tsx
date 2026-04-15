import Link from "next/link";
import { FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
              <th className="p-4 font-semibold text-gray-600 text-sm">Customer</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Outlet</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-sm text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => {
              const latestStatus = getLatestStatus(order.statusLogs);
              const statusConfig = getStatusConfig(latestStatus);

              return (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="text-gray-800 font-bold text-sm">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </div>
                    <div className="text-[11px] text-gray-400">{order.customer?.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-700">{order.outlet?.name}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wide ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center">
                      <Link
                        href={`/super-admin/orders/${order.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all inline-flex items-center gap-1 text-sm font-medium"
                      >
                        <FiEye className="w-5 h-5" />
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/30">
          <p className="text-xs text-gray-500 font-medium">
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} orders)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
              disabled={page >= pagination.totalPages}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
