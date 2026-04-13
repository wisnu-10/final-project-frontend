import {
  Clock,
  Truck,
  Package,
  CreditCard,
  CheckCircle,
  XCircle,
  LucideIcon,
} from "lucide-react";

// Definisikan tipe status yang valid (opsional tapi ngebantu banget)
export type OrderStatus =
  | "waiting_pickup"
  | "on_the_way_to_outlet"
  | "arrived_outlet"
  | "washing"
  | "ironing"
  | "packing"
  | "waiting_payment"
  | "ready_delivery"
  | "delivering"
  | "completed"
  | "cancelled";

export interface StatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
  icon: LucideIcon;
}

export const getStatusConfig = (status: string): StatusConfig => {
  switch (status) {
    case "waiting_pickup":
      return {
        label: "Waiting Pickup",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        icon: Clock,
      };
    case "on_the_way_to_outlet":
      return {
        label: "On the Way to Outlet",
        bgColor: "bg-purple-100",
        textColor: "text-purple-700",
        icon: Truck,
      };
    case "arrived_outlet":
    case "washing":
    case "ironing":
    case "packing":
      return {
        label:
          status.charAt(0).toUpperCase() + status.slice(1).replace("_", " "),
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
        icon: Package,
      };
    case "waiting_payment":
      return {
        label: "Waiting Payment",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
        icon: CreditCard,
      };
    case "ready_delivery":
      return {
        label: "Ready for Delivery",
        bgColor: "bg-indigo-100",
        textColor: "text-indigo-700",
        icon: Package,
      };
    case "delivering":
      return {
        label: "Delivering",
        bgColor: "bg-purple-100",
        textColor: "text-purple-700",
        icon: Truck,
      };
    case "completed":
      return {
        label: "Completed",
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        icon: CheckCircle,
      };
    case "cancelled":
      return {
        label: "Cancelled",
        bgColor: "bg-red-100",
        textColor: "text-red-700",
        icon: XCircle,
      };
    default:
      return {
        label: "Processing",
        bgColor: "bg-gray-100",
        textColor: "text-gray-700",
        icon: Package,
      };
  }
};
