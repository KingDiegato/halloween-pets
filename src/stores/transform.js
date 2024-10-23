import { create } from "zustand";

export const useTransform = create((set) => ({
  data: {
    message: null,
    error: null,
    folder: null,
    public_id: null,
    url: "",
    selectedMask: null,
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
        selectedMask: null,
        url: "",
        height: 0,
        width: 0,
        ok: false,
      },
    }),
}));
