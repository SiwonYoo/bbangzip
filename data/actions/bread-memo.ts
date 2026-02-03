"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/auth";

export async function createBreadMemo(breadId: number, content: string) {
  const session = await auth();
  if (!session?.user?.dbId) {
    throw new Error("로그인이 필요합니다");
  }

  const { error } = await supabase
    .from("bread_memos")
    .insert([{ user_id: session.user.dbId, bread_id: breadId, content: content }])
    .select()
    .single();

  if (error) throw error;
}

export async function updateBreadMemo(breadId: number, content: string) {
  const session = await auth();
  if (!session?.user?.dbId) {
    throw new Error("로그인이 필요합니다");
  }

  const { error } = await supabase
    .from("bread_memos")
    .update({ content })
    .eq("user_id", session.user.dbId)
    .eq("bread_id", breadId)
    .select()
    .single();

  if (error) throw error;
}

export async function deleteBreadMemo(breadId: number) {
  const session = await auth();
  if (!session?.user?.dbId) {
    throw new Error("로그인이 필요합니다");
  }

  const { error } = await supabase
    .from("bread_memos")
    .delete()
    .eq("user_id", session.user.dbId)
    .eq("bread_id", breadId);

  if (error) throw error;
}
