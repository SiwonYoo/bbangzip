"use client";

import { startTransition, Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useBreadStore } from "@/store/breadStore";
import { BreadType } from "@/types";
import Header from "@/components/common/Header";
import SearchBar from "@/components/common/SearchBar";
import BreadCard from "@/app/menus/bread-pedia/BreadCard";

function SearchResultContent() {
  const breads = useBreadStore((state) => state.breads);
  const categories = useBreadStore((state) => state.categories);
  const searchParams = useSearchParams();
  const [keywordStr, setKeywordStr] = useState(searchParams.get("keyword"));
  const [keywordArr, setKeywordArr] = useState<string[]>([]);
  const [filteredBreads, setFilteredBreads] = useState<BreadType[]>([]);

  useEffect(() => {
    if (!keywordStr) return;
    startTransition(() => setKeywordArr(keywordStr.split(/\s+/)));
  }, [keywordStr]);

  useEffect(() => {
    const filtered = breads.filter((bread) => {
      const target = `${categories[bread.category].name} ${bread.name}`;
      return keywordArr.some((item) => target.includes(item));
    });

    startTransition(() => setFilteredBreads(filtered));
  }, [keywordArr]);

  return (
    <>
      <Header title="빵 도감" backBtn={true} />
      <main className="px-4">
        {!(breads.length && categories.length) ? (
          <div className="flex flex-col items-center gap-4 mt-40">
            <Image src="/images/main/logo.png" alt="로딩 아이콘" width={100} height={100} className="animate-bounce" />
            <p className="text-center">빵 굽는 중...</p>
          </div>
        ) : (
          <>
            <div className="sticky top-12 bg-offwhite">
              <SearchBar searchedValue={keywordStr || ""} setKeywordStr={setKeywordStr} />
              {keywordStr &&
                (filteredBreads.length > 0 ? (
                  <p className="py-4 text-center">
                    <span className="text-t-primary underline">{keywordStr}</span>(으)로 검색한 결과입니다. (
                    <span className="text-t-primary underline">{filteredBreads.length}</span>
                    건)
                  </p>
                ) : (
                  <p className="py-4 text-center">
                    <span className="text-t-primary">{keywordStr}</span>(으)로 검색한 결과가 없습니다.
                  </p>
                ))}
            </div>

            <div className="grid grid-cols-2 pb-4 gap-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {filteredBreads.map((item, idx) => {
                if (categories) return <BreadCard key={idx} bread={item} category={categories[item.category]} />;
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default function SearchResult() {
  return (
    <Suspense fallback={<p>검색에 실패하였습니다.</p>}>
      <SearchResultContent />
    </Suspense>
  );
}
