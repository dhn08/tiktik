import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const authStore = (set) => ({
  userProfile: null,
  addUser: (user) => set({ userProfile: user }),
  removeUser: (user) => set({ userProfile: null }),
});

const useAuthStore = create(persist(authStore, { name: "auth" }));
export default useAuthStore;
