import { useEffect, useState, useCallback } from "react";
import { Bell, AlertCircle, CheckCircle, Package } from "lucide-react";
import toast from "react-hot-toast";

export interface OrderNotification {
  id: string;
  orderId: string;
  type: "new_order" | "bypass_approved" | "bypass_rejected" | "status_updated";
  message: string;
  timestamp: Date;
  read: boolean;
  customerName?: string;
}

/**
 * Custom hook for managing order notifications
 * In a production app, this would connect to WebSocket or polling service
 */
export function useOrderNotifications() {
  const [notifications, setNotifications] = useState<OrderNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate checking for new notifications (in production, use WebSocket)
  const checkNotifications = useCallback(async () => {
    try {
      // In a real scenario, this would poll from an API endpoint
      // For now, we'll just maintain local state
      const unread = notifications.filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error checking notifications:", error);
    }
  }, [notifications]);

  const addNotification = useCallback((notification: Omit<OrderNotification, "id" | "timestamp" | "read">) => {
    const newNotification: OrderNotification = {
      id: `notif-${Date.now()}`,
      timestamp: new Date(),
      read: false,
      ...notification,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);

    // Auto-dismiss toast for non-critical notifications
    if (notification.type !== "bypass_rejected") {
      toast.success(notification.message);
    } else {
      toast.error(notification.message);
    }
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId
          ? { ...n, read: true }
          : n
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkNotifications();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [checkNotifications]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
}

interface OrderNotificationsProps {
  notifications: OrderNotification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: () => void;
}

export function OrderNotificationsDropdown({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
}: OrderNotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: OrderNotification["type"]) => {
    switch (type) {
      case "new_order":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "bypass_approved":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "bypass_rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "status_updated":
        return <Package className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: OrderNotification["type"]) => {
    switch (type) {
      case "new_order":
        return "bg-blue-50 border-blue-200";
      case "bypass_approved":
        return "bg-emerald-50 border-emerald-200";
      case "bypass_rejected":
        return "bg-red-50 border-red-200";
      case "status_updated":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-xl">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-l-4 transition-colors cursor-pointer hover:bg-gray-50 ${
                    notif.read
                      ? "bg-white border-l-transparent"
                      : `${getNotificationColor(notif.type)} border-l-blue-500`
                  }`}
                  onClick={() => onMarkAsRead(notif.id)}
                >
                  <div className="flex gap-3">
                    <div className="mt-1 flex-shrink-0">
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {notif.message}
                      </p>
                      {notif.customerName && (
                        <p className="text-xs text-gray-600 mt-1">
                          {notif.customerName}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {notif.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 text-center rounded-b-xl">
              <button
                onClick={onClear}
                className="text-xs text-gray-600 hover:text-gray-900 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
