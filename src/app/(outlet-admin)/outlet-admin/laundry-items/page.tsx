"use client";

import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import useGetLaundryItems from "@/features/super-admin/laundry-items/hooks/useGetLaundryItems";
import useDeleteLaundryItem from "@/features/super-admin/laundry-items/hooks/useDeleteLaundryItem";
import Pagination from "@/components/Pagination";
import useGetOutletInfo from "@/features/order-admin/hooks/useGetOutletInfo";

export default function OutletAdminLaundryItemsPage() {
  const { outlet } = useGetOutletInfo();
  const {
    laundryItems,
    loading,
    search,
    setSearch,
    pricingType,
    setPricingType,
    fetchLaundryItems,
    page,
    setPage,
    pagination,
  } = useGetLaundryItems();
  const { handleDelete } = useDeleteLaundryItem(() => {
    fetchLaundryItems();
  });

  const formatPrice = (price: string | number, type: string) => {
    const finalPrice = type === "kiloan" ? (outlet?.pricePerKg || 0) : price;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(finalPrice));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Laundry Items</h1>
        <Link
          href="/outlet-admin/laundry-items/create"
          className="bg-[#ff7143] hover:bg-[#e05e32] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm"
        >
          <FiPlus /> Add Item
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search laundry items..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all bg-white"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={pricingType}
            onChange={(e) => {
              setPricingType(e.target.value);
              setPage(1);
            }}
            className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer"
          >
            <option value="">All Types</option>
            <option value="kiloan">Kiloan</option>
            <option value="per_item">Per Item</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading laundry items...</div>
        ) : laundryItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {search || pricingType ? "No items found matching your filter." : "No laundry items found. Add your first item!"}
          </div>
        ) : (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="p-4 font-semibold text-gray-600">Item Name</th>
                  <th className="p-4 font-semibold text-gray-600 w-36">Pricing Type</th>
                  <th className="p-4 font-semibold text-gray-600 w-40">Price</th>
                  <th className="p-4 font-semibold text-gray-600 w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {laundryItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="text-gray-800 font-medium">{item.name}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                          item.pricingType === "kiloan"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {item.pricingType === "kiloan" ? "Kiloan" : "Per Item"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-700 font-medium">
                        {formatPrice(item.price, item.pricingType)}
                        <span className="text-gray-400 text-xs ml-1">
                          {item.pricingType === "kiloan" ? "/ kg" : "/ pcs"}
                        </span>
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <Link
                        href={`/outlet-admin/laundry-items/${item.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
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
              label="items"
            />
          </>
        )}
      </div>
    </div>
  );
}
