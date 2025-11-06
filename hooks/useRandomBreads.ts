"use clielnt";

import { BreadType, CategoryType } from "@/types";
import { startTransition, useEffect, useState } from "react";

export function useRandomBreads(breads: BreadType[], categories: CategoryType[], count: number = 20) {
  const [randomBread, setRandomBread] = useState<BreadType[]>();

  useEffect(() => {
    if (breads.length < count || randomBread) return;
    if (categories.findIndex((item) => item.name === "기타") === -1) return;

    const filteredBreads = breads.filter((item) => categories[item.category].name !== "기타");
    if (filteredBreads.length < count) return;

    const randomBreadIdxs = new Set<number>();
    while (randomBreadIdxs.size < count) {
      randomBreadIdxs.add(Math.floor(Math.random() * filteredBreads.length));
    }

    startTransition(() => setRandomBread(Array.from(randomBreadIdxs).map((idx) => filteredBreads[idx])));
  }, [breads, categories]);

  return randomBread;
}
