"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header({ title, backBtn = false }: { title: string; backBtn?: boolean }) {
  const navigate = useRouter();

  return (
    <>
      <header className="flex sticky items-center top-0 p-2 w-full h-12 bg-white">
        {backBtn ? (
          <button
            onClick={() => {
              navigate.back();
            }}
            className="absolute top-1/2 -translate-y-1/2 w-fit h-fit p-2"
          >
            <Image src={"/images/bbangzip-icons/back-icon.png"} width={30} height={30} alt="이전 페이지로 이동" />
          </button>
        ) : (
          <Link href={"/"} className="absolute top-1/2 -translate-y-1/2 w-fit h-fit p-2 block">
            <Image src={"/images/main/logo.png"} width={30} height={30} alt="home으로 이동" />
          </Link>
        )}
        <h1 className="flex-1 text-xl text-center">{title}</h1>
      </header>
    </>
  );
}

export default Header;
