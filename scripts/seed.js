import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const data = JSON.parse(fs.readFileSync("./breads.json", "utf-8"));

async function seed() {
  await supabase.from("breads").delete().neq("id", 0);
  await supabase.from("categories").delete().neq("id", 0);

  try {
    const { error: categoriesError } = await supabase.from("categories").insert(data.categories);
    if (categoriesError) throw categoriesError;
    console.log("categories 업로드 성공");

    const { error: breadsError } = await supabase.from("breads").insert(data.breads);
    if (breadsError) throw breadsError;
    console.log("breads 업로드 성공");
  } catch (e) {
    console.log(e);
  }
}

seed();
