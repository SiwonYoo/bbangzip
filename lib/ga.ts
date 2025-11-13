export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

const gtag = (...args: unknown[]) => {
  if (typeof window === "undefined") return;
  (window as Window & { dataLayer?: unknown[] }).dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer || [];
  (window as Window & { dataLayer?: unknown[] }).dataLayer?.push(args);
};

export const pageview = (url: string) => {
  if (APP_ENV !== "production") return;
  gtag("event", "page_view", { page_path: url });
};

export const track404 = (path: string, referrer: string) => {
  if (APP_ENV !== "production") return;
  gtag("event", "page_not_found", {
    page_path: path,
    referrer,
  });
};

// 퀴즈 시작
export const trackQuizStart = (quizType: "category" | "real") => {
  if (APP_ENV !== "production") return;
  gtag("event", "quiz_start", {
    quiz_type: quizType,
  });
};

// 퀴즈 종료 (결과 포함)
export const trackQuizEnd = (quizType: "category" | "real", score: number, totalQuestions: number, timeTaken: number) => {
  if (APP_ENV !== "production") return;
  gtag("event", "quiz_complete", {
    quiz_type: quizType,
    score: score,
    total_questions: totalQuestions,
    time_taken: timeTaken,
    accuracy: Math.round((score / totalQuestions) * 100),
  });
};

// 정답/오답
export const trackQuizAnswer = (quizType: "category" | "real", isCorrect: boolean, breadName: string) => {
  if (APP_ENV !== "production") return;
  gtag("event", "quiz_answer", {
    quiz_type: quizType,
    is_correct: isCorrect,
    bread_name: breadName,
  });
};

// 퀴즈 중도 이탈
export const trackQuizExit = (quizType: "category" | "real", exitedAt: number, totalQuestions: number) => {
  if (APP_ENV !== "production") return;
  gtag("event", "quiz_exit", {
    quiz_type: quizType,
    exited_at: exitedAt,
    completion_rate: Math.round((exitedAt / totalQuestions) * 100),
  });
};

// 빵 도감 조회 (연결 전)
export const trackBreadView = (breadName: string, category: string) => {
  if (APP_ENV !== "production") return;
  gtag("event", "bread_view", {
    bread_name: breadName,
    category: category,
  });
};
