"use client";

import { startTransition, useEffect, useState } from "react";
import { useBreadStore } from "@/store/breadStore";
import { BreadType, CategoryType } from "@/types";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import ResultModal from "@/app/menus/category-quiz/ResultModal";
import Image from "next/image";

function CategoryQuiz() {
  const categories = useBreadStore((state) => state.categories).filter((item) => item.name !== "기타" && item.name !== "전체");
  const breads = useBreadStore((state) => state.breads).filter((item) => categories[item.category]);
  const [randomBread, setRandomBread] = useState<BreadType>();
  const [randomCategories, setRandomCategories] = useState<CategoryType[]>();
  const [level, setLevel] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);

  useEffect(() => {
    if (breads.length > 0 && !randomBread) {
      const breadsLength = breads.length;
      const randomBreadIdx = Math.floor(Math.random() * breadsLength);

      startTransition(() => setRandomBread(breads[randomBreadIdx]));
    }
  }, [breads, level]);

  useEffect(() => {
    if (categories.length > 0 && !randomCategories && randomBread) {
      const categoriesLength = categories.length;
      const randomCategoryIdxs = new Set<number>([randomBread?.category]);
      while (randomCategoryIdxs.size < 4) {
        randomCategoryIdxs.add(Math.ceil(Math.random() * categoriesLength));
      }

      startTransition(() => setRandomCategories(categories.filter((category) => randomCategoryIdxs.has(category.id))));
    }
  }, [categories, randomBread]);

  const handleClick = (categoryId: number) => {
    if (categoryId === randomBread?.category) {
      setIsAnswer(true);
    } else setIsAnswer(false);

    setIsOpen(true);
  };

  const handleClickNext = () => {
    setRandomBread(undefined);
    setRandomCategories(undefined);
    setLevel((prev) => prev + 1);
  };

  return (
    <>
      <Header title="카테고리 퀴즈" />
      <main className="px-4">
        <p className="py-4 text-center">{level} / 20</p>
        {randomBread && (
          <div className="w-full h-70 rounded-xl bg-white place-items-center content-center">
            <Image src={randomBread?.images.official} width={250} height={250} alt={randomBread?.name} />
          </div>
        )}
        <ul className="py-4">
          {randomCategories &&
            randomCategories.map((category) => (
              <li key={category.id}>
                <Button
                  size="full"
                  onClick={() => {
                    handleClick(category.id);
                  }}
                >
                  {category.name}
                </Button>
              </li>
            ))}
        </ul>
      </main>

      {randomBread && (
        <ResultModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isAnswer={isAnswer}
          breadName={randomBread.name}
          categoryName={categories[randomBread.category - 1].name}
          handleClickNext={handleClickNext}
        />
      )}
    </>
  );
}

export default CategoryQuiz;
