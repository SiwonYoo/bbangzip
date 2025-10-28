import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const data = JSON.parse(fs.readFileSync("./breads.json", "utf-8"));

async function seed() {
  const { error: categoriesError } = await supabase.from("categories").insert(data.categories);

  if (categoriesError) {
    console.log("categories 업로드 실패", categoriesError);
  } else {
    console.log("categories 업로드 성공");
  }

  const { error: breadsError } = await supabase.from("breads").insert(data.breads);

  if (breadsError) {
    console.log("breads 업로드 실패", breadsError);
  } else {
    console.log("breads 업로드 성공");
  }
}

seed();
