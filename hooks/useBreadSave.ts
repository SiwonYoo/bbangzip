import { saveBread, unsaveBread } from "@/data/actions/bread-save";
import { fetchSavedBreadIds } from "@/data/functions/bread-save";
import { SaveBreadParams, UnsaveBreadParams } from "@/types/saves";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * 특정 유저의 저장된 빵 Id 배열 조회
 */
export function useSavedBreadIds(userId: number | null) {
  return useQuery({
    queryKey: ["breadSaveIds", userId],
    queryFn: () => fetchSavedBreadIds(),
    enabled: !!userId,
  });
}

/**
 * 빵 저장
 */
export function useSaveBread(userId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ breadId }: SaveBreadParams) => saveBread(breadId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["breadSaveIds", userId],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("빵 저장에 실패했습니다.");
    },
  });
}

/**
 * 빵 저장 해제
 */
export function useUnsaveBread(userId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ breadId }: UnsaveBreadParams) => unsaveBread(breadId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["breadSaveIds", userId],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("빵 저장 해제에 실패했습니다.");
    },
  });
}
