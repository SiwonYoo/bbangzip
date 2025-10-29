import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const data = JSON.parse(fs.readFileSync("./breads.json", "utf-8"));

async function seed() {
  await supabase.rpc("exec_sql", {
    query: `
        truncate table breads restart identity cascade;
        truncate table categories restart identity cascade;
      `,
  });

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
