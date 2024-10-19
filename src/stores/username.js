import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Zustand store for username
 * @typedef {import("zustand").UseBoundStore<import('zustand').StoreApi<UsernameStore>>}
 */
export const useUsername = create(
  persist(
    (set) => ({
      username: null,
      setUsername: (username) => set({ username }),
    }),
    {
      name: "username",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * @typedef {{
 *    username: string | null,
 *    setUsername: (username: string) => void
 * }} UsernameStore
 */
