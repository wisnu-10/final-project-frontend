import { create } from "zustand";

type UseAuthStore = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string;
  outletId: string | null;
  outletName: string | null;
  setAuth: ({
    firstName,
    lastName,
    email,
    role,
    profilePicture,
    outletId,
    outletName,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profilePicture: string;
    outletId: string | null;
    outletName: string | null;
  }) => void;
  clearAuth: () => void;
};

const useAuthStore = create<UseAuthStore>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  profilePicture: "",
  outletId: null,
  outletName: null,
  setAuth: (data) => {
    set(data);
  },
  clearAuth: () => {
    set({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      profilePicture: "",
      outletId: null,
      outletName: null,
    });
  },
}));

export default useAuthStore;
