export default function PageError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[800px] w-full p-8 bg-[#f4e7d6]">
      {/* Error Icon */}
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* English UI Text */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Something went wrong!
      </h3>
      <p className="text-gray-500 text-center max-w-xs mb-6">
        "Failed to fetch data. Please check your internet connection.
      </p>
    </div>
  );
}
