import { create } from "zustand";

export const useTransform = create((set) => ({
  data: {
    message: null,
    error: null,
    folder: null,
    public_id: null,
    url: "",
    ok: false,
  },
  setData: (data) => set({ data }),
  clearStore: () =>
    set({
      data: {
        message: null,
        error: null,
        folder: null,
        public_id: null,
        url: "",
        ok: false,
      },
    }),
}));
