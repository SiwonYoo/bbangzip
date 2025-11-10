"use client";

import Header from "@/components/common/Header";
import { REAL_QUIZ_TOTAL_COUNT } from "@/constants/quiz";
import { useRandomBreads } from "@/hooks/useRandomBreads";
import { useRandomCategories } from "@/hooks/useRandomCategories";
import { useBreadStore } from "@/store/breadStore";
import Image from "next/image";
import { useEffect, useState } from "react";

function RealQuiz() {
  const [level, setLevel] = useState(1);
  const [checkedCategory, setCheckedCategory] = useState("");
  const [checkedBreadName, setCheckedBreadName] = useState("");

  const realBreads = useBreadStore((state) => state.breadsWithRealImages);
  const categories = useBreadStore((state) => state.categories);

  const randomBreads = useRandomBreads(realBreads, categories);

  const currentBread = randomBreads?.[level - 1];

  const randomCategories = useRandomCategories(categories, currentBread);

  const randomBreadNames = useRandomBreads(realBreads, categories, currentBread, 4, true);

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!currentBread) return;
    const correctCategoryName = categories[currentBread.category].name;
    if (checkedBreadName === currentBread.name && checkedCategory === correctCategoryName) {
      console.log("정답");
      return;
    }
    if (checkedBreadName !== currentBread.name) {
      console.log("이름 오답");
    }
    if (checkedCategory !== correctCategoryName) {
      console.log("카테고리 오답");
    }
  };

  useEffect(() => {
    console.log(checkedCategory);
  }, [checkedCategory]);

  return (
    <>
      <Header title="실전 퀴즈" backBtn={true} />

      <main className="px-4">
        {!currentBread || !randomCategories || !randomBreadNames ? (
          <div className="flex flex-col items-center gap-4 mt-40">
            <Image src="/images/main/logo.png" alt="로딩 아이콘" width={100} height={100} className="animate-bounce" />
            <p className="text-center">빵 굽는 중...</p>
          </div>
        ) : (
          <>
            <p className="py-4 text-center">
              {level} / {REAL_QUIZ_TOTAL_COUNT}
            </p>
            <div className="flex items-center justify-center">
              {currentBread.images.real && <Image src={currentBread.images.real} width={250} height={250} alt={currentBread.name} className="rounded-full" />}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
              <div>
                <p className="text-t-primary text-center">카테고리</p>
                <div className="grid grid-cols-2 gap-2 my-4">
                  {randomCategories.map((category, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border border-accentgold text-center ${
                        category.name === checkedCategory ? "bg-accentgold text-white" : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        id={category.name}
                        name="category"
                        onChange={() => setCheckedCategory(category.name)}
                        checked={category.name === checkedCategory}
                        className="hidden"
                      />
                      <label htmlFor={category.name} className="block">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-t-primary text-center">빵 이름</p>
                <div className="grid grid-cols-2 gap-2 my-4">
                  {randomBreadNames.map((bread, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border border-accentgold text-center ${
                        bread.name === checkedBreadName ? "bg-accentgold text-white" : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        id={bread.name}
                        name="breadName"
                        onChange={() => setCheckedBreadName(bread.name)}
                        checked={bread.name === checkedBreadName}
                        className="hidden"
                      />
                      <label htmlFor={bread.name} className="block">
                        {bread.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="p-2 w-full rounded-lg border border-accentgold text-center bg-white">
                제출하기
              </button>
            </form>
          </>
        )}
      </main>
    </>
  );
}

export default RealQuiz;
