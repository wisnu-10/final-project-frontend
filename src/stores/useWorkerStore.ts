import { create } from "zustand";
import { Order } from "@/types/order.dto";

type UseWorkerStore = {
  activeTask: Order | null;
  availableTasks: Order[];
  history: Order[];
  notifications: string[];
  
  setActiveTask: (task: Order | null) => void;
  setAvailableTasks: (tasks: Order[]) => void;
  setHistory: (history: Order[]) => void;
  addNotification: (message: string) => void;
  removeNotification: (message: string) => void;
  clearAll: () => void;
};

const useWorkerStore = create<UseWorkerStore>((set) => ({
  activeTask: null,
  availableTasks: [],
  history: [],
  notifications: [],

  setActiveTask: (task) => set({ activeTask: task }),
  setAvailableTasks: (tasks) => set({ availableTasks: tasks }),
  setHistory: (history) => set({ history }),
  addNotification: (message) =>
    set((state) => ({
      notifications: [...state.notifications, message],
    })),
  removeNotification: (message) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n !== message),
    })),
  clearAll: () =>
    set({
      activeTask: null,
      availableTasks: [],
      history: [],
      notifications: [],
    }),
}));

export default useWorkerStore;
