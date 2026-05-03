export interface OrderItem {
  id: string;
  quantity: number;
  laundryItem: {
    id: string;
    name: string;
    pricingType: string;
    price?: string;
  };
}

export interface OrderStatusLog {
  id: string;
  status: string;
  workerId: string | null;
  startedAt: string;
  finishedAt: string | null;
  createdAt: string;
}

export interface Order {
  id: string;
  orderId?: string; // Some APIs return orderId instead of id
  customerName?: string;
  customer?: {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
  };
  outlet?: {
    name: string;
    address: string;
  };
  outletId: string;
  currentStation?: string;
  createdAt: string;
  updatedAt: string;
  statusLogs?: OrderStatusLog[];
  orderItems?: OrderItem[];
  pickupAddress?: any;
  deliveryAddress?: any;
  driverPickupId?: string | null;
  driverDeliveryId?: string | null;
}

export interface DriverTasksResponse {
  pickups: Order[];
  deliveries: Order[];
}
