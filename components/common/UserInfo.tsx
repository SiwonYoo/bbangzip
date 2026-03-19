"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogIn } from "lucide-react";

function UserInfo() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return;
  }

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-2">
      {user ? (
        <Link href={"/mypage"} className="p-2" aria-label="마이페이지">
          MY
        </Link>
      ) : (
        <Link href={"/login"} className="p-2" aria-label="로그인">
          <LogIn size={24} />
        </Link>
      )}
    </div>
  );
}

export default UserInfo;
