"use client";

import { createBreadMemo, deleteBreadMemo, updateBreadMemo } from "@/data/actions/bread-memo";
import { fetchBreadMemo } from "@/data/functions/bread-memo";
import { CreateMemoParams, DeleteMemoParams, UpdateMemoParams } from "@/types/memo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * 메모 조회 훅 - 특정 유저의 특정 빵 메모 가져오기
 */
export function useBreadMemo(userId: number | undefined, breadId: number, enabled?: boolean) {
  return useQuery({
    queryKey: ["breadMemo", userId, breadId],
    queryFn: () => fetchBreadMemo(breadId),
    enabled: (enabled ?? true) && !!userId && !!breadId,
  });
}

/**
 * 메모 생성 훅 - 새 메모 추가
 */
export function useCreateMemo(userId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ breadId, content }: CreateMemoParams) => createBreadMemo(breadId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["breadMemo", userId, variables.breadId],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("메모 저장에 실패했습니다");
    },
  });
}

/**
 * 메모 수정 훅 - 기존 메모 내용 변경
 */
export function useUpdateMemo(userId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ breadId, content }: UpdateMemoParams) => updateBreadMemo(breadId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["breadMemo", userId, variables.breadId],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("메모 수정에 실패했습니다");
    },
  });
}

/**
 * 메모 삭제 훅 - 메모 제거
 */
export function useDeleteMemo(userId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ breadId }: DeleteMemoParams) => deleteBreadMemo(breadId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["breadMemo", userId, variables.breadId],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("메모 삭제에 실패했습니다");
    },
  });
}
