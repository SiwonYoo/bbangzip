import { supabase } from "@/lib/supabase";
import { BreadType } from "@/types";

export async function fetchBreads(): Promise<BreadType[]> {
  const { data, error } = await supabase.from("breads").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data as BreadType[];
}
