import Image from "next/image";
import Link from "next/link";

function Header({ title }: { title: string }) {
  return (
    <>
      <header className="flex sticky items-center top-0 p-2 w-full h-12 bg-white">
        <Link href={"/"} className="w-8 h-8">
          <Image src={"/images/main/logo.png"} width={30} height={30} alt="home으로 이동" className="absolute top-1/2 -translate-y-1/2" />
        </Link>
        <h1 className="flex-1 text-xl text-center">{title}</h1>
      </header>
    </>
  );
}

export default Header;
