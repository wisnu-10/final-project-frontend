import React from "react";
import { ClipboardList } from "lucide-react";

interface EmptyStateProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  label,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`bg-white rounded-2xl p-12 shadow-sm border border-dashed border-[#E8E2DA] text-center ${className}`}>
      {icon ? (
        icon
      ) : (
        <ClipboardList className="w-10 h-10 text-[#CBD5E0] mx-auto mb-3" />
      )}
      <p className="text-sm text-[#6B6662]">{label}</p>
    </div>
  );
}
