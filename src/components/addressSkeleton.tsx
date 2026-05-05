export const AddressSkeleton = () => {
  return (
    <div className="w-full p-4 rounded-xl border-2 border-[#E5DDD3] animate-pulse">
      <div className="flex items-start gap-3">
        {/* Icon Square Skeleton */}
        <div className="w-10 h-10 rounded-lg bg-[#FAF6F1]" />

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {/* Label/Title Skeleton */}
            <div className="h-4 w-24 bg-[#FAF6F1] rounded" />
            {/* Default Badge Skeleton */}
            <div className="h-3 w-12 bg-[#E5DDD3] rounded-full" />
          </div>

          {/* Address Line 1 Skeleton */}
          <div className="h-3 w-full bg-[#FAF6F1] rounded" />

          {/* Address Line 2 Skeleton (City, etc) */}
          <div className="h-3 w-3/4 bg-[#FAF6F1] rounded" />
        </div>
      </div>
    </div>
  );
};
