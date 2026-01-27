"use client";

import Image from "next/image";
import { BreadType, CategoryType } from "@/types";
import { Bookmark, Check, Edit, Trash2 } from "lucide-react";
import React, { startTransition, useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { useSession } from "next-auth/react";
import { useBreadMemo, useCreateMemo, useDeleteMemo, useUpdateMemo } from "@/hooks/useBreadMemo";
import MemoEditor from "@/app/menus/bread-pedia/MemoEditor";
import { toast } from "sonner";

function BreadCard({ bread, category }: { bread: BreadType; category: CategoryType }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [content, setContent] = useState("");

  const { data: session } = useSession();
  const userId = session?.user.dbId;

  const { data: memo, isLoading } = useBreadMemo(Number(userId), bread.id, isFlipped && !!userId);
  const createMemoMutation = useCreateMemo();
  const updateMemoMutation = useUpdateMemo();
  const deleteMemoMutation = useDeleteMemo();

  useEffect(() => {
    startTransition(() => setContent(memo?.content || ""));
  }, [memo]);

  // 메모 작성
  const editMemo = (event: React.MouseEvent) => {
    event.stopPropagation();
    startTransition(() => setIsEditMode(true));
  };

  // 메모 저장
  const saveMemo = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!userId) return;

    if (memo) {
      // 메모가 있으면 update 사용
      updateMemoMutation.mutate(
        { breadId: bread.id, userId, content },
        {
          onSuccess: () => {
            toast("메모가 수정되었습니다");
            startTransition(() => setIsEditMode(false));
          },
        },
      );
    } else {
      // 메모가 없으면 create 사용
      createMemoMutation.mutate(
        { breadId: bread.id, userId, content },
        {
          onSuccess: () => {
            toast("메모가 저장되었습니다");
            startTransition(() => setIsEditMode(false));
          },
        },
      );
    }
  };

  // 메모 삭제
  const deleteMemo = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!userId) return;

    // TODO modal로 변경
    if (confirm("메모를 삭제하시겠습니까?")) {
      deleteMemoMutation.mutate(
        { breadId: bread.id, userId },
        {
          onSuccess: () => {
            toast("메모가 삭제되었습니다");
            startTransition(() => setIsEditMode(false));
          },
        },
      );
    }
  };

  return (
    <>
      <div
        className="relative aspect-3/4 sm:aspect-square cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => {
          if (!isEditMode) setIsFlipped((prev) => !prev);
        }}
      >
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
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  <h3 className="text-center text-t-primary">메모</h3>
                </div>

                {/* ViewMode && Memo 존재 : 삭제, 편집 버튼 */}
                {!isEditMode && memo && (
                  <div className="flex gap-1 items-baseline">
                    <button onClick={deleteMemo} className="p-0.5 cursor-pointer">
                      <Trash2 size={16} color={"var(--color-error)"} />
                    </button>
                    <button onClick={editMemo} className="p-0.5 cursor-pointer">
                      <Edit size={16} color={"var(--color-t-primary)"} />
                    </button>
                  </div>
                )}

                {/* EditMode : 저장 버튼 */}
                {isEditMode && (
                  <button onClick={saveMemo} className="p-0.5 cursor-pointer">
                    <Check size={16} color={"var(--color-t-primary)"} />
                  </button>
                )}
              </div>

              {isEditMode ? (
                // EditMode : 에디터
                <MemoEditor breadName={bread.name} content={content} setContent={setContent} />
              ) : isLoading ? (
                // Loading
                <p className="text-center">로딩 중...</p>
              ) : content ? (
                // ViewMode && Memo 존재 : 메모 노출
                <p className="p-1 whitespace-pre-line wrap-break-word overflow-y-auto">{content}</p>
              ) : (
                // Viewmode && Memo 미존재 : 메모 추가하기
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <p className="text-sm">등록된 메모가 없습니다.</p>
                  <Button size="fit" onClick={editMemo}>
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
