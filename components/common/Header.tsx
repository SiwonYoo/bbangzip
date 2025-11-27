"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserInfo from "@/components/common/UserInfo";

function Header({ title, backBtn = false }: { title: string; backBtn?: boolean }) {
  const navigate = useRouter();

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between p-2 w-full h-12 bg-white shadow-sm">
        {backBtn ? (
          <button
            onClick={() => {
              navigate.back();
            }}
            className="flex-1 w-fit h-fit p-2"
          >
            <Image src={"/images/bbangzip-icons/back-icon.png"} width={30} height={30} alt="이전 페이지로 이동" />
          </button>
        ) : (
          <Link href={"/"} className="flex-1 w-fit h-fit p-2 block">
            <Image src={"/images/main/logo.png"} width={30} height={30} alt="home으로 이동" />
          </Link>
        )}
        <h1 className="flex-1 text-xl text-center">{title}</h1>
        <UserInfo />
      </header>
    </>
  );
}

export default Header;
