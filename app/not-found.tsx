"use client";

import { useEffect } from "react";
import { track404 } from "@/lib/ga";
import LinkButton from "@/components/common/LinkButton";

export default function NotFound() {
  useEffect(() => {
    track404(window.location.pathname, document.referrer);
  }, []);

  return (
    <main className="px-4">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
        <p className="text-gray-600">요청하신 페이지가 존재하지 않습니다.</p>
        <LinkButton href="/" size="fit">
          빵.zip으로 돌아가기
        </LinkButton>
      </div>
    </main>
  );
}
