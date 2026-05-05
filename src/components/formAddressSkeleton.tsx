export default function FormAddressSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl md:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-pulse">
        {/* Header Skeleton */}
        <div className="sticky top-0 bg-white border-b border-[#E5DDD3] p-6 rounded-t-3xl">
          <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
        </div>

        <div className="p-6 space-y-6">
          {/* Address Type Skeleton */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-gray-100 border-2 border-gray-50"
                ></div>
              ))}
            </div>
          </div>

          {/* Input Fields Skeleton (Recipient & Phone) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
              </div>
            ))}
          </div>

          {/* Street Address Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
          </div>

          {/* Dropdowns Skeleton (Location) */}
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-full bg-gray-100 rounded-xl"></div>
            ))}
          </div>

          {/* Notes Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex gap-3 pt-4">
            <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 h-12 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
