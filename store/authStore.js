import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const authStore = (set) => ({
  userProfile: null,
  allUsers: [],
  addUser: (user) => set({ userProfile: user }),
  removeUser: (user) => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get("/api/users");
    console.log("inside fetch all user :", response);
    set({ allUsers: response.data });
  },
});

const useAuthStore = create(persist(authStore, { name: "auth" }));
export default useAuthStore;
