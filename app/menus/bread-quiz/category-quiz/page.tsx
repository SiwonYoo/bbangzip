"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBreadStore } from "@/store/breadStore";
import { useQuizStore } from "@/store/quizStore";
import { useRandomBreads } from "@/hooks/useRandomBreads";
import { useRandomCategories } from "@/hooks/useRandomCategories";
import { trackQuizAnswer, trackQuizEnd, trackQuizExit, trackQuizStart } from "@/lib/ga";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import ResultModal from "@/components/common/ResultModal";
import { CATEGORY_QUIZ_TOTAL_COUNT } from "@/constants/quiz";

function CategoryQuiz() {
  const categories = useBreadStore((state) => state.categories);
  const breads = useBreadStore((state) => state.breads);
  const { wrongBreads, addWrongBread, resetWrongBreads } = useQuizStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [level, setLevel] = useState(1);
  const levelRef = useRef(level);
  const navigate = useRouter();

  useEffect(() => {
    resetWrongBreads();

    startTransition(() => {
      setStartTime(Date.now());
    });
    // GA: 퀴즈 시작
    trackQuizStart("category");

    return () => {
      if (levelRef.current < CATEGORY_QUIZ_TOTAL_COUNT) {
        // GA: 퀴즈 중도 이탈
        trackQuizExit("category", levelRef.current, CATEGORY_QUIZ_TOTAL_COUNT);
      }
    };
  }, []);

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

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
      // GA: 정답
      trackQuizAnswer("category", true, currentBread.name);
      setIsAnswer(true);
    } else {
      // GA: 오답
      trackQuizAnswer("category", false, currentBread.name);
      setIsAnswer(false);
      addWrongBread({ name: currentBread.name, category: categories[currentBread.category].name });
    }

    setIsOpen(true);
  };

  // [다음] 버튼 클릭 시
  const handleClickNext = () => {
    // Quiz 종료 시
    if (level === CATEGORY_QUIZ_TOTAL_COUNT) {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      // GA: 퀴즈 종료
      trackQuizEnd("category", CATEGORY_QUIZ_TOTAL_COUNT - wrongBreads.length, CATEGORY_QUIZ_TOTAL_COUNT, timeTaken);

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
