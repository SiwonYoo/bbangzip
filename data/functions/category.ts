import { supabase } from "@/lib/supabase";
import { CategoryType } from "@/types";

export async function fetchCategories(): Promise<CategoryType[]> {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return [{ id: 0, name: "전체" }, ...data] as CategoryType[];
}
