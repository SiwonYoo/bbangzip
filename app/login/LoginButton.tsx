"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <button type="button" onClick={() => signIn("kakao", { callbackUrl: "/" })} className="p-2 cursor-pointer">
      <Image src={"/images/auth/kakao-login.png"} width={200} height={100} alt="카카오 로그인" />
    </button>
  );
}

export default LoginButton;
