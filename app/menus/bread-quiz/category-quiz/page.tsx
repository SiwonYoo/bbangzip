"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBreadStore } from "@/store/breadStore";
import { useQuizStore } from "@/store/quizStore";
import { useRandomBreads } from "@/hooks/useRandomBreads";
import { useRandomCategories } from "@/hooks/useRandomCategories";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import ResultModal from "@/components/common/ResultModal";
import { CATEGORY_QUIZ_TOTAL_COUNT } from "@/constants/quiz";

function CategoryQuiz() {
  const categories = useBreadStore((state) => state.categories);
  const breads = useBreadStore((state) => state.breads);
  const { addWrongBread, resetWrongBreads } = useQuizStore();
  const [level, setLevel] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    resetWrongBreads();
  }, []);

  // 랜덤 빵
  const randomBreads = useRandomBreads(breads, categories);

  // 현재 라운드 빵 설정
  const currentBread = randomBreads?.[level - 1];

  // 랜덤 카테고리
  const randomCategories = useRandomCategories(categories, currentBread);

  // 보기 선택
  const handleClick = (categoryId: number) => {
    if (!currentBread) return;

    if (categoryId === currentBread.category) {
      setIsAnswer(true);
    } else {
      setIsAnswer(false);
      addWrongBread({ name: currentBread.name, category: categories[currentBread.category].name });
    }

    setIsOpen(true);
  };

  // [다음] 버튼 클릭 시
  const handleClickNext = () => {
    // Quiz 종료 시
    if (level === CATEGORY_QUIZ_TOTAL_COUNT) {
      navigate.replace(`/menus/bread-quiz/category-quiz/result`);
      return;
    }

    setLevel((prev) => prev + 1);
  };

  return (
    <>
      <Header title="카테고리 퀴즈" backBtn={true} />

      <main className="px-4">
        {!currentBread || !randomCategories ? (
          <div className="flex flex-col items-center gap-4 mt-40">
            <Image src="/images/main/logo.png" alt="로딩 아이콘" width={100} height={100} className="animate-bounce" />
            <p className="text-center">빵 굽는 중...</p>
          </div>
        ) : (
          <>
            <p className="py-4 text-center">
              {level} / {CATEGORY_QUIZ_TOTAL_COUNT}
            </p>

            <div className="flex items-center justify-center w-full h-70 rounded-xl bg-white">
              <Image src={currentBread.images.official} width={250} height={250} alt={currentBread.name} />
            </div>

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
