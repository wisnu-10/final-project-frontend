"use client";

import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import useGetOutlets from "@/features/super-admin/outlets/hooks/useGetOutlets";
import useDeleteOutlet from "@/features/super-admin/outlets/hooks/useDeleteOutlet";

export default function OutletsPage() {
  const { outlets, loading, fetchOutlets } = useGetOutlets();
  const { handleDelete } = useDeleteOutlet(() => {
    fetchOutlets();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Manage Outlets</h1>
        <Link 
          href="/super-admin/outlets/create"
          className="bg-[#ff7143] hover:bg-[#e05e32] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm"
        >
          <FiPlus /> Add Outlet
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading outlets...</div>
        ) : outlets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No outlets found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left">
                <th className="p-4 font-semibold text-gray-600">Outlet Info</th>
                <th className="p-4 font-semibold text-gray-600">Location</th>
                <th className="p-4 font-semibold text-gray-600 w-32">Coverage</th>
                <th className="p-4 font-semibold text-gray-600 w-24">Status</th>
                <th className="p-4 font-semibold text-gray-600 w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {outlets.map((outlet) => (
                <tr key={outlet.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="text-gray-800 font-medium">{outlet.name}</div>
                    <div className="text-xs text-gray-400 font-mono mt-1" title="Outlet ID">{outlet.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-800 text-sm line-clamp-1" title={outlet.address}>{outlet.address || "-"}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {[outlet.districtName, outlet.cityName, outlet.provinceName].filter(Boolean).join(", ")} {outlet.postalCode ? `(${outlet.postalCode})` : ""}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-700">{outlet.maxServiceDistance ? `${outlet.maxServiceDistance} km` : "-"}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${outlet.isActive !== false ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {outlet.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link
                      href={`/super-admin/outlets/${outlet.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiEdit2 />
                    </Link>
                    <button
                      onClick={() => handleDelete(outlet.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
