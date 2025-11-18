"use client";

import Image from "next/image";
import { useState } from "react";
import { useBreadStore } from "@/store/breadStore";
import { CategoryType } from "@/types";
import Header from "@/components/common/Header";
import SearchBar from "@/components/common/SearchBar";
import BreadCard from "@/app/menus/bread-pedia/BreadCard";

function BreadPedia() {
  const breads = useBreadStore((state) => state.breads);
  const categories = useBreadStore((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({ id: 0, name: "전체" });

  return (
    <>
      <Header title="빵 도감" />
      <main className="px-4">
        {!(breads.length && categories.length) ? (
          <div className="flex flex-col items-center gap-4 mt-40">
            <Image src="/images/main/logo.png" alt="로딩 아이콘" width={100} height={100} className="animate-bounce" />
            <p className="text-center">빵 굽는 중...</p>
          </div>
        ) : (
          <>
            <SearchBar />
            <ul className="flex justify-between gap-4 sticky top-12 w-full py-4 bg-offwhite/80 overflow-x-scroll text-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
            <div className="grid grid-cols-2 pb-4 gap-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {breads
                ?.filter((item) => {
                  if (selectedCategory.id) return item.category === selectedCategory.id;
                  else return item;
                })
                .map((item, idx) => {
                  if (categories) return <BreadCard key={idx} bread={item} category={categories[item.category]} />;
                })}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default BreadPedia;
