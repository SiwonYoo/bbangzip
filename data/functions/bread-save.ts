"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/auth";

export async function fetchSavedBreadIds() {
  const session = await auth();
  if (!session?.user?.dbId) {
    throw new Error("로그인이 필요합니다");
  }

  const { data, error } = await supabase.from("bread_saves").select("bread_id").eq("user_id", session.user.dbId);

  if (error && error.code !== "PGRST116") throw error;

  return data?.map((item) => item.bread_id) ?? [];
}
