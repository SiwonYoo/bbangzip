"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/auth";

export async function fetchBreadMemo(breadId: number) {
  const session = await auth();
  if (!session?.user?.dbId) {
    throw new Error("로그인이 필요합니다");
  }

  const { data, error } = await supabase
    .from("bread_memos")
    .select("*")
    .eq("user_id", session.user.dbId)
    .eq("bread_id", breadId)
    .maybeSingle();

  // PGRST116: 데이터 없음 (정상이므로 무시)
  if (error && error.code !== "PGRST116") throw error;

  return data;
}
