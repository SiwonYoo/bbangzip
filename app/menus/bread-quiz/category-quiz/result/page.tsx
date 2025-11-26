"use client";

import { useQuizStore } from "@/store/quizStore";
import Header from "@/components/common/Header";
import { CATEGORY_QUIZ_TOTAL_COUNT } from "@/constants/quiz";
import QuizResult from "@/components/common/QuizResult";

function Result() {
  const wrongBreads = useQuizStore((state) => state.wrongBreads);

  const answerCount = CATEGORY_QUIZ_TOTAL_COUNT - wrongBreads.length;

  return (
    <>
      <Header title="카테고리 퀴즈 결과" backBtn={true} />
      <main className="px-4">
        <QuizResult answerCount={answerCount} wrongBreads={wrongBreads} totalCount={CATEGORY_QUIZ_TOTAL_COUNT} />
      </main>
    </>
  );
}

export default Result;
