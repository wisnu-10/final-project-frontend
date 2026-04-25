import { create } from "zustand";
import { Order } from "@/types/order.dto";

type UseDriverStore = {
  activeOrder: Order | null;
  availableOrders: Order[];
  myTasks: Order[];
  history: Order[];
  notifications: string[];
  isStreamConnected: boolean;
  
  setActiveOrder: (order: Order | null) => void;
  setAvailableOrders: (orders: Order[]) => void;
  setMyTasks: (tasks: Order[]) => void;
  setHistory: (history: Order[]) => void;
  addNotification: (message: string) => void;
  removeNotification: (message: string) => void;
  setStreamConnected: (connected: boolean) => void;
  clearAll: () => void;
};

const useDriverStore = create<UseDriverStore>((set) => ({
  activeOrder: null,
  availableOrders: [],
  myTasks: [],
  history: [],
  notifications: [],
  isStreamConnected: false,

  setActiveOrder: (order) => set({ activeOrder: order }),
  setAvailableOrders: (orders) => set({ availableOrders: orders }),
  setMyTasks: (tasks) => set({ myTasks: tasks }),
  setHistory: (history) => set({ history }),
  addNotification: (message) =>
    set((state) => ({
      notifications: [...state.notifications, message],
    })),
  removeNotification: (message) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n !== message),
    })),
  setStreamConnected: (connected) => set({ isStreamConnected: connected }),
  clearAll: () =>
    set({
      activeOrder: null,
      availableOrders: [],
      myTasks: [],
      history: [],
      notifications: [],
      isStreamConnected: false,
    }),
}));

export default useDriverStore;
