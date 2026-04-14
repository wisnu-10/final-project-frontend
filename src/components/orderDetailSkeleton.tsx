import React from "react";

export default function OrderDetailSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Container Modal */}
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-pulse">
        {/* Skeleton Header */}
        <div className="p-6 bg-gray-200 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-300" />{" "}
                {/* Logo Box */}
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-gray-300 rounded" />{" "}
                  {/* Order ID */}
                  <div className="h-4 w-32 bg-gray-300 rounded" /> {/* Date */}
                </div>
              </div>
              <div className="h-8 w-40 bg-gray-300 rounded-full" />{" "}
              {/* Status Badge */}
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300" />{" "}
            {/* Close Button */}
          </div>
        </div>

        {/* Skeleton Content */}
        <div className="p-6 space-y-6">
          {/* Two Column Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Customer Card */}
            <div className="h-40 bg-gray-100 rounded-2xl border-2 border-gray-200 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-300" />
                <div className="h-5 w-24 bg-gray-300 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="h-40 bg-gray-100 rounded-2xl border-2 border-gray-200 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-300" />
                <div className="h-5 w-24 bg-gray-300 rounded" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-6 w-1/2 bg-gray-300 rounded" />
              </div>
            </div>
          </div>

          {/* Address Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-300 rounded" />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-32 bg-gray-50 border-2 border-gray-200 rounded-2xl" />
              <div className="h-32 bg-gray-50 border-2 border-gray-200 rounded-2xl" />
            </div>
          </div>

          {/* Outlet & Notes Skeleton */}
          <div className="h-24 bg-gray-100 rounded-2xl" />
          <div className="h-20 bg-gray-50 rounded-2xl border-2 border-gray-100" />
        </div>

        {/* Skeleton Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <div className="h-12 flex-1 bg-gray-300 rounded-xl" />
          <div className="h-12 w-24 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
