"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";

function ResultContent() {
  const searchParams = useSearchParams();
  const answerCount = searchParams.get("answerCount");
  const wrongBreads = useQuizStore((state) => state.wrongBreads);
  const router = useRouter();

  return (
    <>
      <Header title="퀴즈 결과" />
      <main className="px-4">
        <div className="flex flex-col gap-4 items-center py-20">
          <Image src={"/images/bbangzip-icons/happy-bbangzip.png"} alt="빵집 아이콘" width={100} height={100} className="animate-bounce" />
          <p className="text-4xl">{answerCount} / 20</p>
          {wrongBreads.length > 0 ? (
            <section className="flex flex-col items-center p-2 w-full bg-white text-center">
              <p className="text-t-primary">헷갈렸던 빵들</p>
              <hr className="my-1 w-[50%]" />
              <ul className="max-h-20 overflow-auto">
                {wrongBreads.map((bread, idx) => (
                  <li key={`${bread.name}+${idx}`}>
                    {bread.name} : {bread.category}
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <p>🎉 우와! 모든 빵을 맞혔어요! 🙌</p>
          )}
          <div className="flex justify-center gap-4 w-full px-4">
            <Button
              size="full"
              onClick={() => {
                router.replace("/");
              }}
            >
              홈으로
            </Button>
            <Button
              onClick={() => {
                router.replace("/menus/bread-quiz/category-quiz");
              }}
            >
              다시하기
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default function Result() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <ResultContent />
    </Suspense>
  );
}
