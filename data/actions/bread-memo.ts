import { supabase } from "@/lib/supabase";

export async function createBreadMemo(breadId: number, userId: number, content: string) {
  const { data, error } = await supabase
    .from("bread_memos")
    .insert([{ user_id: userId, bread_id: breadId, content: content }])
    .select()
    .single();

  if (error) {
    console.error("메모 추가 실패", error);
    throw error;
  }

  return data;
}

export async function updateBreadMemo(breadId: number, userId: number, content: string) {
  const { data, error } = await supabase.from("bread_memos").update({ content }).eq("user_id", userId).eq("bread_id", breadId).select().single();

  if (error) {
    console.error("메모 업데이트 실패", error);
    throw error;
  }

  return data;
}

export async function deleteBreadMemo(breadId: number, userId: number) {
  const { data, error } = await supabase.from("bread_memos").delete().eq("user_id", userId).eq("bread_id", breadId);

  if (error) throw error;
}
