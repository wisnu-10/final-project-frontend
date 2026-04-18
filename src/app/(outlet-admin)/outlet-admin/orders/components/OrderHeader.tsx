import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function OrderHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500 mt-1">Manage and track orders for your outlet</p>
      </div>
      <Link
        href="/outlet-admin/orders/create"
        className="bg-[#ff7143] hover:bg-[#e05e32] text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all font-bold shadow-lg active:scale-[0.98]"
      >
        <FiPlus className="w-5 h-5" />
        Create Order
      </Link>
    </div>
  );
}
