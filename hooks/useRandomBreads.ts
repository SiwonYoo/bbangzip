"use clielnt";

import { startTransition, useEffect, useState } from "react";
import { BreadType, CategoryType } from "@/types";

export function useRandomBreads(breads: BreadType[], categories: CategoryType[], currentBread?: BreadType, count: number = 20, isCurrentMode: boolean = false) {
  const [randomBread, setRandomBread] = useState<BreadType[]>();

  useEffect(() => {
    if (breads.length < count || (!isCurrentMode && randomBread)) return;
    if (categories.findIndex((item) => item.name === "기타") === -1) return;

    const filteredBreads = breads.filter((item) => categories[item.category].name !== "기타");
    if (filteredBreads.length < count) return;

    const randomBreadIdxs = new Set<number>([]);
    if (isCurrentMode) {
      if (currentBread) {
        const curIdx = filteredBreads.findIndex((item) => item.id === currentBread.id);
        randomBreadIdxs.add(curIdx);
      } else return undefined;
    }

    while (randomBreadIdxs.size < count) {
      randomBreadIdxs.add(Math.floor(Math.random() * filteredBreads.length));
    }

    startTransition(() => setRandomBread(Array.from(randomBreadIdxs).map((idx) => filteredBreads[idx])));
  }, [breads, categories, currentBread]);

  return randomBread;
}
