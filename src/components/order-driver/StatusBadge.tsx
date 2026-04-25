import React from "react";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes("waiting") || statusLower === "ready_delivery") {
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        label: "Menunggu",
      };
    }
    
    if (statusLower.includes("on_the_way") || statusLower === "delivering") {
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        label: "Dalam Proses",
      };
    }
    
    if (statusLower.includes("completed") || statusLower.includes("arrived")) {
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        label: "Selesai",
      };
    }
    
    return {
      bg: "bg-gray-50",
      text: "text-gray-700",
      label: status,
    };
  };

  const style = getStatusStyle(status);

  return (
    <span
      className={`text-[10px] font-bold px-3 py-1 rounded-full ${style.bg} ${style.text} ${className}`}
    >
      {style.label}
    </span>
  );
}
