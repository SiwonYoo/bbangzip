import { supabase } from "@/lib/supabase";
import { OAuthUser } from "@/types";

function convertToSnakeCase(user: OAuthUser) {
  return {
    login_type: user.loginType,
    name: user.name,
    email: user.email,
    image: user.image,
    extra: user.extra,
  };
}

export async function createUserWithOAuth(user: OAuthUser) {
  const dbUser = convertToSnakeCase(user);
  const { data, error } = await supabase.from("users").insert([dbUser]).select().single();

  if (error) {
    console.error("OAuth 회원가입 실패", error);
    throw error;
  }
  return data;
}
