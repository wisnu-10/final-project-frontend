import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Memuat data...",
  className = "",
}: LoadingStateProps) {
  return (
    <div className={`py-20 flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className="w-8 h-8 text-[#4A90D9] animate-spin" />
      <p className="text-sm text-[#6B6662]">{message}</p>
    </div>
  );
}
