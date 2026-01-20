import { supabase } from "@/lib/supabase";

export async function fetchBreadMemo(userId: number, breadId: number) {
  const { data, error } = await supabase.from("bread_memos").select("*").eq("user_id", userId).eq("bread_id", breadId).single();

  // PGRST116: 데이터 없음 (정상이므로 무시)
  if (error && error.code !== "PGRST116") throw error;

  return data;
}
