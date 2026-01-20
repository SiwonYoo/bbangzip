import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import { createUserWithOAuth } from "@/data/actions/user";
import { OAuthUser } from "@/types";
import { supabase } from "@/lib/supabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 배포 시 현재 호스트를 신뢰하도록 설정 (AUTH_TRUST_HOST=true와 동일)
  trustHost: true,

  // 인증 제공자 설정
  providers: [Kakao],

  // 인증 과정에서 호출되는 콜백 함수들
  callbacks: {
    // 로그인 처리 콜백
    async signIn({ user, account, profile }) {
      switch (account?.provider) {
        case "kakao":
          // OAuth 인증이 완료된 후 자동으로 회원 가입 처리
          try {
            // 이메일로 기존 사용자 확인
            const { data: existingUser } = await supabase
              .from("users")
              .select("id")
              .filter("extra->>providerAccountId", "eq", account.providerAccountId)
              .maybeSingle();

            if (existingUser) {
              // 기존 사용자 - DB ID 저장
              user.dbId = existingUser.id;
            } else {
              // 자동 회원 가입
              const newUser: OAuthUser = {
                loginType: account.provider,
                name: user.name || undefined,
                email: user.email || undefined,
                image: user.image || undefined,
                // 인증 제공자에서 받은 정보를 extra 객체에 전달
                extra: {
                  ...profile,
                  providerAccountId: account.providerAccountId,
                },
              };

              // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
              const createdUser = await createUserWithOAuth(newUser);
              user.dbId = createdUser.id; // DB ID 저장
            }
          } catch (error) {
            // 이미 가입된 사용자인 경우 에러가 발생하지만 로그인은 계속 진행
            console.error("회원가입 중 에러:", error);

            const { data: fallbackUser } = await supabase.from("users").select("id").eq("email", user.email).single();

            if (fallbackUser) user.dbId = fallbackUser.id;
          }

          // NextAuth가 제공하는 user, account 정보 사용
          // providerAccountId를 user.id로 사용
          user.id = account.providerAccountId;

          break;
      }

      return true;
    },

    // JWT 토큰 생성 콜백
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id; // provider ID
        token.dbId = user.dbId; // DB ID

        // OAuth 로그인 시 account에서 토큰 정보 저장
        if (account) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.dbId = token.dbId as number;

      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;

      return session;
    },
  },
});
