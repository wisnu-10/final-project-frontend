'use client';

import { useState, useEffect } from "react";
import { useGetComplaints } from "@/features/complaint-customer/hooks/useGetComplaints";
import Pagination from "@/components/Pagination";
import { FiSearch, FiAlertCircle, FiCheckCircle, FiXCircle, FiMessageSquare, FiRefreshCw } from "react-icons/fi";
import { useDebounce } from "@/hooks/useDebounce";
import ResolveComplaintModal from "@/features/complaint-customer/components/ResolveComplaintModal";
import { Complaint } from "@/features/complaint-customer/api/getComplaints.api";

export default function ComplaintsPage() {
  const { data, isLoading, params, handlePageChange, handleFilterChange, fetchComplaints } = useGetComplaints();
  const [searchValue, setSearchValue] = useState(params.search || '');
  const debouncedSearch = useDebounce(searchValue, 500);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

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
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Customer Complaints</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor and respond to customer feedback and complaints</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7143]/20 focus:border-[#ff7143] transition-all"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="w-full md:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff7143]/20 transition-all cursor-pointer"
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
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center justify-center"
            title="Refresh"
          >
            <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px] bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-4 border-[#ff7143] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Loading complaints...</p>
          </div>
        </div>
      ) : !data || data.complaints.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMessageSquare className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-gray-600 text-xl font-bold">No complaints found</p>
          <p className="text-gray-400 mt-2 max-w-sm mx-auto">
            {params.search || params.status 
              ? "We couldn't find any complaints matching your current filters. Try adjusting your search." 
              : "There are currently no customer complaints for your outlet."}
          </p>
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
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.complaints.map((complaint) => (
                    <tr 
                      key={complaint.id} 
                      className="hover:bg-gray-50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-800">
                            {new Date(complaint.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="text-xs text-gray-400 mt-0.5">
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
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-mono font-bold">
                          #{complaint.orderId.substring(0, 8)}
                        </span>
                      </td>
                      <td className="px-6 py-5 max-w-xs">
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed" title={complaint.description}>
                          {complaint.description}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        {getStatusBadge(complaint.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination is already included below the table container in this logic */}
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
