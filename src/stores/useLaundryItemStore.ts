import { create } from "zustand";

interface LaundryItemState {
  selectedLaundryItemId: string | null;
  setSelectedLaundryItemId: (id: string | null) => void;
  clearSelectedLaundryItemId: () => void;
}

export const useLaundryItemStore = create<LaundryItemState>((set) => ({
  selectedLaundryItemId: null,
  setSelectedLaundryItemId: (id) => set({ selectedLaundryItemId: id }),
  clearSelectedLaundryItemId: () => set({ selectedLaundryItemId: null }),
}));
