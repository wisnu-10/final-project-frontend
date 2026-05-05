'use client';

import { useState, useEffect } from "react";
import { useGetComplaints } from "@/features/complaint-customer/hooks/useGetComplaints";
import Pagination from "@/components/Pagination";
import { FiSearch, FiMessageSquare, FiRefreshCw, FiMapPin, FiEye } from "react-icons/fi";
import useGetOutlets from "@/features/super-admin/outlets/hooks/useGetOutlets";
import { useDebounce } from "@/hooks/useDebounce";
import SearchableSelect from "@/components/SearchableSelect";
import ResolveComplaintModal from "@/features/complaint-customer/components/ResolveComplaintModal";
import { Complaint } from "@/features/complaint-customer/api/getComplaints.api";

export default function SuperAdminComplaintsPage() {
  const { data, isLoading, params, handlePageChange, handleFilterChange, fetchComplaints } = useGetComplaints();
  const { outlets } = useGetOutlets(100);
  const [searchValue, setSearchValue] = useState(params.search || '');
  const debouncedSearch = useDebounce(searchValue, 500);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const outletOptions = outlets?.map((outlet: any) => ({
    id: outlet.id,
    label: outlet.name,
    sublabel: `${outlet.cityName || ''} ${outlet.districtName || ''}`.trim()
  })) || [];

  const allOutletOptions = [{ id: '', label: 'All Outlets' }, ...outletOptions];

  useEffect(() => {
    handleFilterChange({ search: debouncedSearch });
  }, [debouncedSearch]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Pending</span>;
      case 'resolved':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Resolved</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Global Customer Complaints</h1>
          <p className="text-sm text-gray-500 mt-1">Cross-outlet monitoring and reporting system</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative md:col-span-2">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7143]/20 focus:border-[#ff7143] transition-all"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <SearchableSelect
          options={allOutletOptions}
          value={params.outletId || ''}
          onChange={(val) => handleFilterChange({ outletId: val })}
          placeholder="All Outlets"
          direction="down"
        />

        <div className="flex gap-2">
          <select
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7143]/20 transition-all cursor-pointer"
            value={params.status || ''}
            onChange={(e) => handleFilterChange({ status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <button 
            onClick={() => fetchComplaints(params)}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
          >
            <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px] bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-4 border-[#ff7143] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Fetching global complaints...</p>
          </div>
        </div>
      ) : !data || data.complaints.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMessageSquare className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-gray-600 text-xl font-bold">No complaints found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Outlet</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.complaints.map((complaint) => (
                    <tr 
                      key={complaint.id} 
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-800">
                            {new Date(complaint.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(complaint.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-800">
                            {complaint.customer.firstName} {complaint.customer.lastName}
                          </span>
                          <span className="text-xs text-gray-500 truncate max-w-[150px]">
                            {complaint.customer.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#ff7143]/10 rounded-lg flex items-center justify-center text-[#ff7143]">
                            <FiMapPin className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {complaint.order.outlet.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-mono font-bold">
                          {complaint.order.invoiceNumber || `ORD-${complaint.orderId.substring(0, 8)}`}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        {getStatusBadge(complaint.status)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => setSelectedComplaint(complaint)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all inline-flex items-center gap-1 text-sm font-medium cursor-pointer"
                          >
                            <FiEye className="w-5 h-5" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <Pagination
              currentPage={params.page || 1}
              totalPages={data.pagination.totalPages}
              totalItems={data.pagination.total}
              onPageChange={handlePageChange}
              label="complaints"
            />
          </div>
        </div>
      )}
      {selectedComplaint && (
        <ResolveComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onSuccess={() => fetchComplaints(params)}
        />
      )}
    </div>
  );
}
