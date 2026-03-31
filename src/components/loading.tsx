export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-[#f4e7d6]">
      {/* Spinner Animation */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF6B4A] mb-4"></div>
      <p className="text-gray-500 font-medium animate-pulse">
        Please wait, fetching your data...
      </p>
    </div>
  );
}
