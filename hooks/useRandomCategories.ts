"use client";

import { startTransition, useEffect, useState } from "react";
import { BreadType, CategoryType } from "@/types";

export function useRandomCategories(categories: CategoryType[], currentBread?: BreadType, count: number = 4) {
  const [randomCategories, setRandomCategories] = useState<CategoryType[]>();

  useEffect(() => {
    if (categories.length < count || !currentBread) return;

    const filteredCategories = categories.filter((item) => item.name !== "기타" && item.name !== "전체");
    if (filteredCategories.length < count) return;

    const correctCategoryIdx = filteredCategories.findIndex((category) => category.id === currentBread.category);
    if (correctCategoryIdx === -1) return;

    const randomCategoryIdxs = new Set<number>([correctCategoryIdx]);

    while (randomCategoryIdxs.size < count) {
      randomCategoryIdxs.add(Math.floor(Math.random() * filteredCategories.length));
    }

    const result = Array.from(randomCategoryIdxs)
      .map((idx) => filteredCategories[idx])
      .sort(() => Math.random() - 0.5);

    startTransition(() => setRandomCategories(result));
  }, [categories, currentBread]);

  return randomCategories;
}
