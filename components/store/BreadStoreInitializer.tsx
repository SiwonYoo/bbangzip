"use client";

import { supabase } from "@/lib/supabase";
import { useBreadStore } from "@/store/breadStore";
import { BreadType, CategoryType } from "@/types";
import { useEffect } from "react";

function BreadStoreInitializer() {
  const { setBreads, setCategories } = useBreadStore();

  // 빵 데이터 가져오기
  useEffect(() => {
    async function getBreads() {
      const { data, error } = await supabase.from("breads").select("*");

      if (error) console.error(error);
      else setBreads(data as BreadType[]);
    }

    getBreads();
  }, []);

  // 카테고리 데이터 가져오기
  useEffect(() => {
    async function getCategories() {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) console.error(error);
      else setCategories([{ id: 0, name: "전체" }, ...data] as CategoryType[]);
    }

    getCategories();
  }, []);

  return null;
}

export default BreadStoreInitializer;
