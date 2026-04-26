'use client'

import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

interface ButtonResponseProps {
    id: string
    isLoading?: boolean
}

export default function ButtonResponse({ id, isLoading }: ButtonResponseProps) {
  const router = useRouter();
  console.log("UHUYY",id)

  return (
    <button
      disabled={isLoading}
      onClick={() => router.push(`order-history/${id}/response`)}
      className=" group w-full mt-2 px-4 py-3 font-bold rounded-xl text-white bg-[#FF6B4A] text-base flex items-center justify-center gap-2 hover:bg-[#fd5d39] transition-all"
    >
      {isLoading ? (
        <div className="flex">
          <FiLoader className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <span>View Admin Response</span>
      )}
    </button>
  );
}
