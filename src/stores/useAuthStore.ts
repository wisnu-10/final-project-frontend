import { create } from "zustand";

type UseAuthStore = {
  firstName: string;
  email: string;
  role: string;
  profilePicture: string;
  setAuth: ({
    firstName,
    email,
    role,
    profilePicture,
  }: {
    firstName: string;
    email: string;
    role: string;
    profilePicture: string
  }) => void;
};

const useAuthStore = create<UseAuthStore>((set) => ({
  firstName: "",
  email: "",
  role: "",
  profilePicture: "",
  setAuth: ({ firstName, email, role, profilePicture }: Pick<UseAuthStore, "firstName" | "email" | "role" | "profilePicture">) => {
    set({ firstName, email, role, profilePicture });
  },
}));

export default useAuthStore;
