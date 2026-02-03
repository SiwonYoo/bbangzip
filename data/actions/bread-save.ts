"use server";

import { supabase } from "@/lib/supabase";
import { auth } from "@/auth";

export async function saveBread(breadId: number) {
  const session = await auth();
  if (!session?.user?.dbId) {
    throw new Error("로그인이 필요합니다");
  }

  const { error } = await supabase
    .from("bread_saves")
    .insert([{ user_id: session.user.dbId, bread_id: breadId }])
    .select()
    .single();

  if (error) throw error;
}

export async function unsaveBread(breadId: number) {
  const session = await auth();
  if (!session?.user?.dbId) {
    throw new Error("로그인이 필요합니다");
  }

  const { error } = await supabase
    .from("bread_saves")
    .delete()
    .eq("user_id", session.user.dbId)
    .eq("bread_id", breadId);

  if (error) throw error;
}
