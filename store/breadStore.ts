import { BreadType, CategoryType } from "@/types";
import { create } from "zustand";

interface BreadState {
  breads: BreadType[];
  setBreads: (breads: BreadType[]) => void;
  categories: CategoryType[];
  setCategories: (categories: CategoryType[]) => void;
}

export const useBreadStore = create<BreadState>((set) => ({
  breads: [],
  setBreads: (breads) => set({ breads }),
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
