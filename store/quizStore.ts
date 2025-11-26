import { create } from "zustand";

export interface wrongBreadType {
  name: string;
  category: string;
}

interface QuizState {
  wrongBreads: wrongBreadType[];
  addWrongBread: (bread: wrongBreadType) => void;
  resetWrongBreads: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  wrongBreads: [],
  addWrongBread: (bread) => set((state) => ({ wrongBreads: [...state.wrongBreads, bread] })),
  resetWrongBreads: () => set({ wrongBreads: [] }),
}));
