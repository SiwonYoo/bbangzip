"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { useBreadStore } from "@/store/breadStore";
import { useQuizStore } from "@/store/quizStore";
import { useRandomBreads } from "@/hooks/useRandomBreads";
import { useRandomCategories } from "@/hooks/useRandomCategories";
import { trackQuizAnswer, trackQuizEnd, trackQuizExit, trackQuizStart } from "@/lib/ga";
import Header from "@/components/common/Header";
import ResultModal from "@/components/common/ResultModal";
import { REAL_QUIZ_TOTAL_COUNT } from "@/constants/quiz";

function RealQuiz() {
  const [level, setLevel] = useState(1);
  const levelRef = useRef(level);
  const [checkedCategory, setCheckedCategory] = useState("");
  const [checkedBreadName, setCheckedBreadName] = useState("");
  const [results, setResults] = useState<(null | boolean)[]>(new Array(REAL_QUIZ_TOTAL_COUNT).fill(null));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useRouter();
  const [categoryAnswers, setCategoryAnswers] = useState<{ [category: string]: "correct" | "wrong" | null }>({});
  const [breadNameAnswers, setBreadNameAnswers] = useState<{ [breadName: string]: "correct" | "wrong" | null }>({});
  const [startTime, setStartTime] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const { wrongBreads, addWrongBread, resetWrongBreads } = useQuizStore();

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

    startTransition(() => {
      setStartTime(Date.now());
    });
    // GA: 퀴즈 시작
    trackQuizStart("real");

    return () => {
      if (levelRef.current < REAL_QUIZ_TOTAL_COUNT) {
        // GA: 퀴즈 중도 이탈
        trackQuizExit("real", levelRef.current, REAL_QUIZ_TOTAL_COUNT);
      }
    };
  }, []);

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  // [제출하기] 클릭 시
  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!currentBread) return;
    if (!checkedBreadName || !checkedCategory) return;

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
      // GA: 정답
      if (retryCount === 0) {
        trackQuizAnswer("real", true, currentBread.name);
        setResults((prev) => {
          prev[level - 1] = true;
          return prev;
        });
      }

      setIsOpen(true);
    }
    // 오답이 있을 경우
    else {
      // GA: 오답
      if (retryCount === 0) {
        trackQuizAnswer("real", false, currentBread.name);

        addWrongBread({ name: currentBread.name, category: categories[currentBread.category].name });

        setResults((prev) => {
          prev[level - 1] = false;
          return prev;
        });
      }

      setRetryCount((prev) => prev + 1);
    }
  };

  // [다음] 버튼 클릭 시
  const handleClickNext = () => {
    // Quiz 종료 시
    if (level === REAL_QUIZ_TOTAL_COUNT) {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      // GA: 퀴즈 종료
      trackQuizEnd("real", REAL_QUIZ_TOTAL_COUNT - wrongBreads.length, REAL_QUIZ_TOTAL_COUNT, timeTaken);

      navigate.replace(`/menus/bread-quiz/real-quiz/result`);
      return;
    }

    // 초기화
    setCheckedCategory("");
    setCheckedBreadName("");
    setCategoryAnswers({});
    setBreadNameAnswers({});
    setRetryCount(0);

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
              {currentBread.images.real && <Image src={currentBread.images.real} width={220} height={220} alt={currentBread.name} className="rounded-full" />}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-8">
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
                <div className="grid grid-cols-2 gap-2 mt-4">
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

              <p className={`mt-2 text-error text-xs text-center ${retryCount > 0 ? "opacity-100" : "opacity-0"}`}>
                틀린 문제를 수정한 후, [제출하기]를 눌러주세요
              </p>
              <button
                type="submit"
                className={`p-2 w-full rounded-lg border border-accentgold text-center bg-white ${
                  !checkedBreadName || !checkedCategory ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!checkedBreadName || !checkedCategory}
              >
                제출하기
              </button>
            </form>

            {/* ST: 정답 현황 */}
            <ul className="grid grid-cols-10 place-items-center gap-y-2 mt-8">
              {results.map((result, idx) => (
                <li key={idx} className={`w-4 h-4 rounded-full ${result === null ? "bg-gray-300" : result ? "bg-success" : "bg-error"}`}></li>
              ))}
            </ul>
            {/* ED: 정답 현황 */}
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
