"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBreadStore } from "@/store/breadStore";
import { useQuizStore } from "@/store/quizStore";
import { useRandomBreads } from "@/hooks/useRandomBreads";
import { useRandomCategories } from "@/hooks/useRandomCategories";
import Header from "@/components/common/Header";
import ResultModal from "@/components/common/ResultModal";
import { REAL_QUIZ_TOTAL_COUNT } from "@/constants/quiz";

function RealQuiz() {
  const [level, setLevel] = useState(1);
  const [checkedCategory, setCheckedCategory] = useState("");
  const [checkedBreadName, setCheckedBreadName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useRouter();
  const [categoryAnswers, setCategoryAnswers] = useState<{ [category: string]: "correct" | "wrong" | null }>({});
  const [breadNameAnswers, setBreadNameAnswers] = useState<{ [breadName: string]: "correct" | "wrong" | null }>({});
  const { addWrongBread, resetWrongBreads } = useQuizStore();

  // 실제 사진이 있는 빵 목록 구독 (zustand)
  const realBreads = useBreadStore((state) => state.breadsWithRealImages);
  // 카테고리 구독 (zustand)
  const categories = useBreadStore((state) => state.categories);

  // 문제 빵(랜덤) 10개 설정
  const randomBreads = useRandomBreads(realBreads, categories);
  // 현재 문제 빵
  const currentBread = randomBreads?.[level - 1];

  // 보기 카테고리(랜덤) 4개 설정
  const randomCategories = useRandomCategories(categories, currentBread);

  // 보기 빵이름(랜덤) 4개 선정
  const randomBreadNames = useRandomBreads(realBreads, categories, currentBread, 4, true);

  // 틀린 빵 목록 초기화
  useEffect(() => {
    resetWrongBreads();
  }, []);

  // [제출하기] 클릭 시
  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!currentBread) return;

    const correctCategoryName = categories[currentBread.category].name;

    // 빵이름 정답 체크
    if (checkedBreadName === currentBread.name) {
      setBreadNameAnswers((prev) => ({ ...prev, [checkedBreadName]: "correct" }));
    } else {
      setBreadNameAnswers((prev) => ({ ...prev, [checkedBreadName]: "wrong" }));
    }
    // 카테고리 정답 체크
    if (checkedCategory === correctCategoryName) {
      setCategoryAnswers((prev) => ({ ...prev, [checkedCategory]: "correct" }));
    } else {
      setCategoryAnswers((prev) => ({ ...prev, [checkedCategory]: "wrong" }));
    }

    // 전부 정답일 경우
    if (checkedBreadName === currentBread.name && checkedCategory === correctCategoryName) {
      setIsOpen(true);
    }
    // 오답이 있을 경우
    else {
      addWrongBread({ name: currentBread.name, category: categories[currentBread.category].name });
    }
  };

  // [다음] 버튼 클릭 시
  const handleClickNext = () => {
    // Quiz 종료 시
    if (level === REAL_QUIZ_TOTAL_COUNT) {
      navigate.replace(`/menus/bread-quiz/real-quiz/result`);
      return;
    }

    // 초기화
    setCheckedCategory("");
    setCheckedBreadName("");
    setCategoryAnswers({});
    setBreadNameAnswers({});
    setLevel((prev) => prev + 1);
  };

  return (
    <>
      <Header title="실전 퀴즈" backBtn={true} />

      <main className="px-4 mb-4">
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
                        categoryAnswers[category.name] === "correct"
                          ? "bg-success text-white"
                          : categoryAnswers[category.name] === "wrong"
                          ? "bg-error text-white"
                          : category.name === checkedCategory
                          ? "bg-accentgold text-white"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        id={category.name}
                        name="category"
                        onChange={() => setCheckedCategory(category.name)}
                        checked={category.name === checkedCategory}
                        className="hidden"
                        disabled={Object.values(categoryAnswers).includes("correct") || categoryAnswers[category.name] === "wrong"}
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
                        breadNameAnswers[bread.name] === "correct"
                          ? "bg-success text-white"
                          : breadNameAnswers[bread.name] === "wrong"
                          ? "bg-error text-white"
                          : bread.name === checkedBreadName
                          ? "bg-accentgold text-white"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        id={bread.name}
                        name="breadName"
                        onChange={() => setCheckedBreadName(bread.name)}
                        checked={bread.name === checkedBreadName}
                        className="hidden"
                        disabled={Object.values(breadNameAnswers).includes("correct") || breadNameAnswers[bread.name] === "wrong"}
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

      {currentBread && (
        <ResultModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isAnswer={true}
          breadName={currentBread.name}
          categoryName={categories[currentBread.category].name}
          handleClickNext={handleClickNext}
        />
      )}
    </>
  );
}

export default RealQuiz;
