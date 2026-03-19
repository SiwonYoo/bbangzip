"use client";

import { useEffect } from "react";
import { fetchBreads } from "@/data/functions/bread";
import { fetchCategories } from "@/data/functions/category";
import { useBreadStore } from "@/store/breadStore";

function BreadStoreInitializer() {
  const { setBreads, setCategories } = useBreadStore();

  // 빵 데이터 가져오기
  useEffect(() => {
    async function initBreads() {
      const breads = await fetchBreads();
      setBreads(breads);
    }

    initBreads();
  }, []);

  // 카테고리 데이터 가져오기
  useEffect(() => {
    async function initCategories() {
      const categories = await fetchCategories();
      setCategories(categories);
    }

    initCategories();
  }, []);

  return null;
}

export default BreadStoreInitializer;
