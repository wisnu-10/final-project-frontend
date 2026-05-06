import { create } from "zustand";

interface OutletState {
  selectedOutletId: string | null;
  setSelectedOutletId: (id: string | null) => void;
  clearSelectedOutletId: () => void;
}

export const useOutletStore = create<OutletState>((set) => ({
  selectedOutletId: null,
  setSelectedOutletId: (id) => set({ selectedOutletId: id }),
  clearSelectedOutletId: () => set({ selectedOutletId: null }),
}));
