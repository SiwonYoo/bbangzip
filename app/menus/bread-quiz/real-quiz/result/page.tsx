"use client";

import { useQuizStore } from "@/store/quizStore";
import Header from "@/components/common/Header";
import { REAL_QUIZ_TOTAL_COUNT } from "@/constants/quiz";
import QuizResult from "@/components/common/QuizResult";

function Result() {
  const wrongBreads = useQuizStore((state) => state.wrongBreads);

  const answerCount = REAL_QUIZ_TOTAL_COUNT - wrongBreads.length;

  return (
    <>
      <Header title="실전 퀴즈 결과" backBtn={true} />
      <main className="px-4">
        <QuizResult answerCount={answerCount} wrongBreads={wrongBreads} totalCount={REAL_QUIZ_TOTAL_COUNT} />
      </main>
    </>
  );
}

export default Result;
