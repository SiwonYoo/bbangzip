"use client";

import Image from "next/image";
import { BreadType, CategoryType } from "@/types";
import { Bookmark } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { useSession } from "next-auth/react";
import { useBreadMemo } from "@/hooks/useBreadMemo";

function BreadCard({ bread, category }: { bread: BreadType; category: CategoryType }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [content, setContent] = useState("");

  const { data: session } = useSession();
  const userId = session?.user.dbId;

  const { data: memo, isLoading } = useBreadMemo(Number(userId), bread.id, isFlipped && !!userId);

  useEffect(() => {
    if (memo?.content) {
      startTransition(() => setContent(memo.content));
    }
  }, [memo]);

  return (
    <>
      <div className="relative h-60 cursor-pointer" style={{ perspective: "1000px" }} onClick={() => setIsFlipped((prev) => !prev)}>
        {/* 카드 컨테이너 */}
        <div
          className={`relative w-full h-full transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 앞면 */}
          <div className="absolute inset-0 backface-hidden flex flex-col gap-2 items-center rounded-xl p-4 bg-white">
            <Bookmark stroke="var(--color-primary)" fill="white" className="absolute right-4 bg-white" />
            <Image src={bread.images.official} width={200} height={200} alt={bread.name} className="aspect-square" />
            <div className="text-center w-full">
              <h2 className="text-t-primary text-lg truncate">{bread.name}</h2>
              <p>{category.name}</p>
            </div>
          </div>

          {/* 뒷면 */}
          <div className="absolute inset-0 backface-hidden flex flex-col gap-2 items-center rounded-xl p-4 rotate-y-180 bg-[url('/images/common/card-bg.jpg')] bg-cover bg-no-repeat">
            <div className="absolute inset-0 bg-white/70" />
            <div className="flex flex-col z-10 h-full w-full">
              <h3 className="text-center text-t-primary">메모</h3>
              {isLoading ? (
                <p className="text-center">로딩 중...</p>
              ) : content ? (
                <p>{content}</p>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <p className="text-sm">등록된 메모가 없습니다.</p>
                  <Button size="fit">
                    <span className="text-sm">메모 추가하기</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BreadCard;
