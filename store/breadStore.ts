import { BreadType, CategoryType } from "@/types";
import { create } from "zustand";

interface BreadState {
  breads: BreadType[];
  breadsWithRealImages: BreadType[];
  setBreads: (breads: BreadType[]) => void;
  categories: CategoryType[];
  setCategories: (categories: CategoryType[]) => void;
}

export const useBreadStore = create<BreadState>((set) => ({
  breads: [],
  breadsWithRealImages: [],
  setBreads: (breads) => set({ breads, breadsWithRealImages: breads.filter((bread) => !!bread.images.real) }),
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
