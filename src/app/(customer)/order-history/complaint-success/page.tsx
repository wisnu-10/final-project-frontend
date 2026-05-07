"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react"; // Pake icon biar lebih cakep dari emoji doang

export default function ComplaintSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#FDFCFB] pt-28 pb-28">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-[#E5DDD3]">
        {/* Icon Success Section */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-[#2C2826] mb-2">
          Complaint Received!
        </h1>

        <p className="text-[#6B6662] mb-8 leading-relaxed">
          Thanks for letting us know. We’ve received your report and our
          team is checking it out. We’ll get back to you with a resolution
          within 24 hours. Hang tight!
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/order-history")}
            className="w-full py-3 bg-[#FF6B4A] text-white rounded-xl font-semibold hover:bg-[#FF5533] transition-all shadow-md shadow-orange-200"
          >
            Back to My Orders
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <p className="mt-8 text-xs text-[#A39E99]">
        Need immediate help? Contact our support at{" "}
        <span className="font-semibold text-[#4A90E2] cursor-pointer">
          Support Center
        </span>
      </p>
    </div>
  );
}
