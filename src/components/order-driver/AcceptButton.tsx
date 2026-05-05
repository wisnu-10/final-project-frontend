import React from "react";
import { Loader2 } from "lucide-react";

interface AcceptButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  label?: string;
  variant?: "pickup" | "delivery" | "primary";
  className?: string;
}

export function AcceptButton({
  onClick,
  isLoading,
  disabled = false,
  label = "Ambil Tugas",
  variant = "primary",
  className = "",
}: AcceptButtonProps) {
  const getVariantStyle = (variant: string) => {
    switch (variant) {
      case "pickup":
        return "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white";
      case "delivery":
        return "border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white";
      case "primary":
      default:
        return "border border-[#4A90D9] text-[#4A90D9] hover:bg-[#4A90D9] hover:text-white";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-3 rounded-xl ${getVariantStyle(
        variant
      )} text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {label}
    </button>
  );
}
