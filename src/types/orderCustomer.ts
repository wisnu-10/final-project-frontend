interface CreateOrderDTO {
  pickupAddressId: string;
  deliveryAddressId: string;
  scheduleTime: string;
}

interface OrderParams {
  search?: string;
  paymentStatus?: string;
  orderStatus?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}