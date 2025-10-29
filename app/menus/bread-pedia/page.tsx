"use client";

import BreadCard from "@/app/menus/bread-pedia/BreadCard";
import Header from "@/components/common/Header";
import { supabase } from "@/lib/supabase";
import { BreadType, CategoryType } from "@/types";
import { useEffect, useState } from "react";

function BreadPedia() {
  const [breads, setBreads] = useState<BreadType[]>();
  const [categories, setCategories] = useState<CategoryType[]>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({ id: 0, name: "전체" });

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

  return (
    <>
      <Header title="빵 도감" />
      <main className="px-4">
        <ul className="flex justify-between gap-4 sticky top-12 w-full py-4 h-12 bg-offwhite/80 overflow-x-scroll text-nowrap">
          {categories?.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => {
                  setSelectedCategory(item);
                }}
                className={`${item.name === selectedCategory?.name ? "underline text-t-primary" : ""}`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 pb-4 gap-4 overflow-y-scroll">
          {breads
            ?.filter((item) => {
              if (selectedCategory.id) return item.category === selectedCategory.id;
              else return item;
            })
            .map((item, idx) => {
              if (categories) return <BreadCard key={idx} bread={item} category={categories[item.category]} />;
            })}
        </div>
      </main>
    </>
  );
}

export default BreadPedia;
