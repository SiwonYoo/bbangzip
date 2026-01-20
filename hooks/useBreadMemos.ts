"use client";

import { createBreadMemo, deleteBreadMemo, updateBreadMemo } from "@/data/actions/bread-memo";
import { fetchBreadMemo } from "@/data/functions/bread-memo";
import { CreateMemoParams, DeleteMemoParams, UpdateMemoParams } from "@/types/memo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * 메모 조회 훅 - 특정 유저의 특정 빵 메모 가져오기
 */
export function useBreadMemos(userId: number, breadId: number) {
  return useQuery({
    queryKey: ["breadMemo", userId, breadId],
    queryFn: () => fetchBreadMemo(userId, breadId),
    enabled: !!userId && !!breadId,
  });
}

/**
 * 메모 생성 훅 - 새 메모 추가
 */
export function useCreateMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ breadId, userId, content }: CreateMemoParams) => createBreadMemo(breadId, userId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["breadMemo", variables.userId, variables.breadId],
      });
    },
  });
}

/**
 * 메모 수정 훅 - 기존 메모 내용 변경
 */
export function useUpdateMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ breadId, userId, content }: UpdateMemoParams) => updateBreadMemo(breadId, userId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["breadMemo", variables.userId, variables.breadId],
      });
    },
  });
}

/**
 * 메모 삭제 훅 - 메모 제거
 */
export function useDeleteMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ breadId, userId }: DeleteMemoParams) => deleteBreadMemo(userId, breadId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["breadMemo", variables.userId, variables.breadId],
      });
    },
  });
}
