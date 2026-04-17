'use client';

import { useState } from "react";
import { FiX, FiCheckCircle, FiXCircle, FiMessageSquare } from "react-icons/fi";
import { Complaint, resolveComplaintApi } from "../api/getComplaints.api";
import toast from "react-hot-toast";

interface ResolveComplaintModalProps {
  complaint: Complaint;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ResolveComplaintModal({ complaint, onClose, onSuccess }: ResolveComplaintModalProps) {
  const [status, setStatus] = useState<'resolved' | 'rejected'>(
    complaint.status === 'pending' ? 'resolved' : complaint.status as 'resolved' | 'rejected'
  );
  const [adminResponse, setAdminResponse] = useState(complaint.adminResponse || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isReadOnly = complaint.status !== 'pending';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    if (!adminResponse.trim()) {
      return toast.error("Please provide a response or solution");
    }

    try {
      setIsSubmitting(true);
      await resolveComplaintApi({
        id: complaint.id,
        status,
        adminResponse
      });
      toast.success(`Complaint successfully marked as ${status}`);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to submit response");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
          <div>
            <h2 className="text-xl font-extrabold text-[#1E293B]">Complaint Detail</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-medium tracking-wide">ID: #{complaint.id.substring(0, 8).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Customer Part */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative">
             <div className="absolute -top-3 left-4 bg-white border border-slate-100 px-3 py-1 rounded-full shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer Issue</span>
             </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mt-2">
              "{complaint.description}"
            </p>
          </div>

          <div className="space-y-6">
            {!isReadOnly && (
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-700 ml-1">Take Action</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setStatus('resolved')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                      status === 'resolved' 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    <FiCheckCircle className={`w-5 h-5 ${status === 'resolved' ? 'animate-bounce' : ''}`} />
                    <span className="font-bold">Resolve</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('rejected')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                      status === 'rejected' 
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm' 
                        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    <FiXCircle className={`w-5 h-5 ${status === 'rejected' ? 'animate-pulse' : ''}`} />
                    <span className="font-bold">Reject</span>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-700 ml-1">
                {isReadOnly ? 'Resolution Note' : (status === 'resolved' ? 'Provide Solution' : 'Rejection Reason')}
              </p>
              <textarea
                className={`w-full p-5 bg-slate-50 border border-slate-200 rounded-[24px] text-sm focus:outline-none focus:ring-4 focus:ring-[#ff7143]/10 focus:border-[#ff7143] transition-all min-h-[140px] leading-relaxed ${isReadOnly ? 'cursor-default text-slate-500' : 'text-slate-700'}`}
                placeholder={status === 'resolved' ? "Describe the steps taken to fix the issue..." : "Briefly explain why this complaint cannot be accepted..."}
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 font-extrabold rounded-2xl transition-all active:scale-95"
            >
              Close
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-[1.5] px-8 py-4 text-white font-extrabold rounded-2xl transition-all shadow-xl active:scale-95 ${
                  status === 'resolved' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-200'
                } disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  status === 'resolved' ? 'Resolve Now' : 'Reject Complaint'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
