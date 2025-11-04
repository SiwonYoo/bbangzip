"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBreadStore } from "@/store/breadStore";
import { useQuizStore } from "@/store/quizStore";
import { BreadType, CategoryType } from "@/types";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import ResultModal from "@/app/menus/category-quiz/ResultModal";

function CategoryQuiz() {
  const categories = useBreadStore((state) => state.categories);
  const breads = useBreadStore((state) => state.breads);
  const { addWrongBread, resetWrongBreads } = useQuizStore();
  const [randomBread, setRandomBread] = useState<BreadType[]>();
  const [randomCategories, setRandomCategories] = useState<CategoryType[]>();
  const [currentBread, setCurrentBread] = useState<BreadType>();
  const [level, setLevel] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);
  const navigate = useRouter();

  useEffect(() => {
    resetWrongBreads();
  }, []);

  // 랜덤 빵
  useEffect(() => {
    if (breads.length < 20 || randomBread) return;

    if (categories.findIndex((item) => item.name === "기타") === -1) return;
    const filteredBreads = breads.filter((item) => categories[item.category].name !== "기타");
    if (filteredBreads.length < 20) return;

    const randomBreadIdxs = new Set<number>();
    while (randomBreadIdxs.size < 20) {
      randomBreadIdxs.add(Math.floor(Math.random() * filteredBreads.length));
    }

    startTransition(() => setRandomBread(Array.from(randomBreadIdxs).map((idx) => filteredBreads[idx])));
  }, [breads, categories]);

  // 현재 라운드 빵 설정
  useEffect(() => {
    if (!randomBread) return;
    startTransition(() => setCurrentBread(randomBread[level - 1]));
  }, [level, randomBread]);

  // 랜덤 카테고리
  useEffect(() => {
    if (categories.length < 4 || !currentBread) return;

    const filteredCategories = categories.filter((item) => item.name !== "기타" && item.name !== "전체");
    if (filteredCategories.length < 4) return;

    const correctCategoryIdx = filteredCategories.findIndex((category) => category.id === currentBread.category);
    if (correctCategoryIdx === -1) return;

    const randomCategoryIdxs = new Set<number>([correctCategoryIdx]);

    while (randomCategoryIdxs.size < 4) {
      randomCategoryIdxs.add(Math.floor(Math.random() * filteredCategories.length));
    }

    const result = Array.from(randomCategoryIdxs)
      .map((idx) => filteredCategories[idx])
      .sort(() => Math.random() - 0.5);

    startTransition(() => setRandomCategories(result));
  }, [categories, currentBread]);

  // 보기 선택
  const handleClick = (categoryId: number) => {
    if (!currentBread) return;

    if (categoryId === currentBread.category) {
      setIsAnswer(true);
      setAnswerCount((prev) => prev + 1);
    } else {
      setIsAnswer(false);
      addWrongBread({ name: currentBread.name, category: categories[currentBread.category].name });
    }

    setIsOpen(true);
  };

  // [다음] 버튼 클릭 시
  const handleClickNext = () => {
    // Quiz 종료 시
    if (level === 20) {
      navigate.push(`/menus/category-quiz/result?answerCount=${answerCount}`);
      return;
    }

    setLevel((prev) => prev + 1);
  };

  return (
    <>
      <Header title="카테고리 퀴즈" />

      <main className="px-4">
        {!currentBread || !randomCategories ? (
          <div className="flex flex-col items-center gap-4 mt-40">
            <Image src="/images/main/logo.png" alt="로딩 아이콘" width={100} height={100} className="animate-bounce" />
            <p className="text-center">빵 굽는 중...</p>
          </div>
        ) : (
          <>
            <p className="py-4 text-center">{level} / 20</p>
            {currentBread && (
              <div className="flex items-center justify-center w-full h-70 rounded-xl bg-white">
                <Image src={currentBread.images.official} width={250} height={250} alt={currentBread.name} />
              </div>
            )}
            <ul className="py-4">
              {randomCategories &&
                randomCategories.map((category) => (
                  <li key={category.id}>
                    <Button
                      onClick={() => {
                        handleClick(category.id);
                      }}
                    >
                      {category.name}
                    </Button>
                  </li>
                ))}
            </ul>
          </>
        )}
      </main>

      {currentBread && (
        <ResultModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isAnswer={isAnswer}
          breadName={currentBread.name}
          categoryName={categories[currentBread.category].name}
          handleClickNext={handleClickNext}
        />
      )}
    </>
  );
}

export default CategoryQuiz;
