import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const authStore = (set) => ({
  userProfile: null,
  allUsers: [null],
  addUser: (user) => set({ userProfile: user }),
  removeUser: (user) => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get("https://tiktik-dhn.vercel.app/api/users");
    console.log(response);
    set({ allUsers: response.data });
  },
});

const useAuthStore = create(persist(authStore, { name: "auth" }));
export default useAuthStore;
