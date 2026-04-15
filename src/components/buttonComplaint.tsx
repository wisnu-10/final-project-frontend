'use client'

import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function buttonComplaint({ id }: { id: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`order-history/${id}/complaint`)}
      className=" group w-full mt-2 px-4 py-2.5 rounded-xl text-[#FF6B4A] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#FF6B4A]/5 transition-all border border-transparent hover:border-[#FF6B4A]/20"
    >
      <XCircle className="w-4 h-4" />
      <span className="flex items-center gap-1">
        Issues with your order?
        <span className="ml-1 px-2 py-0.5 bg-[#FF6B4A]/10 rounded-md font-bold group-hover:bg-[#FF6B4A] group-hover:text-white transition-all">
          Get Help
        </span>
      </span>
    </button>
  );
}
