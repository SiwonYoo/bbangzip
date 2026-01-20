"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Header from "@/components/common/Header";

function Mypage() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
      return;
    }
  }, [session, status, router]);

  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <>
      <Header title="마이페이지" />

      {user && (
        <main className="p-4">
          <div className="flex items-center gap-2 p-4 rounded-2xl bg-white">
            {user.image && <Image src={user.image} width={40} height={40} alt={`${user.name} 프로필 이미지`} className="rounded-full" />}
            <p>{user.name}님 안녕하세요!</p>
          </div>

          <section className="my-4">
            <div className="flex justify-between items-end">
              <h2>나의 빵 컬렉션</h2>
              <span className="underline text-sm cursor-pointer">전체 보기</span>
            </div>
            <div></div>
          </section>

          <section className="my-4">
            <div className="flex justify-between items-end">
              <h2>공유한 빵 정보</h2>
              <span className="underline text-sm cursor-pointer">전체 보기</span>
            </div>
            <div></div>
          </section>

          <section className="my-4">
            <div className="flex justify-between items-end">
              <h2>숨긴 빵 목록</h2>
              <span className="underline text-sm cursor-pointer">전체 보기</span>
            </div>
            <div></div>
          </section>

          <div className="flex gap-4 justify-end">
            <form onClick={handleLogout} className="underline cursor-pointer">
              로그아웃
            </form>
            <form className="text-error underline cursor-pointer">탈퇴</form>
          </div>
        </main>
      )}
    </>
  );
}

export default Mypage;
