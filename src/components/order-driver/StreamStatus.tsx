import React from "react";
import { Bell, AlertCircle } from "lucide-react";
import useDriverStore from "@/stores/useDriverStore";

export function StreamStatus() {
  const { isStreamConnected, notifications } = useDriverStore();
  const [notificationCount, setNotificationCount] = React.useState(0);

  React.useEffect(() => {
    if (notifications.length > 0) {
      setNotificationCount(notifications.length);
      const timer = setTimeout(() => {
        setNotificationCount(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className="flex items-center gap-2">
      {/* Stream Status Indicator */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E2DA]">
        <div
          className={`w-2 h-2 rounded-full ${
            isStreamConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        />
        <span className="text-xs font-medium text-[#6B6662]">
          {isStreamConnected ? "Live" : "Offline"}
        </span>
      </div>

      {/* Notification Bell */}
      {notificationCount > 0 && (
        <div className="relative">
          <Bell className="w-5 h-5 text-[#FF6B4A] animate-bounce" />
          <span className="absolute -top-2 -right-2 bg-[#FF6B4A] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {notificationCount}
          </span>
        </div>
      )}
    </div>
  );
}
