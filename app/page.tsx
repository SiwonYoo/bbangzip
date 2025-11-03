import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const menus = [
    { link: "./menus/bread-pedia", imgPath: "/images/main/breadpedia-icon.png", title: "빵 도감", description: "모든 빵을 한눈에", blank: false },
    {
      link: "./menus/category-quiz",
      imgPath: "/images/main/categoryquiz-icon.png",
      title: "카테고리 퀴즈",
      description: "게임으로 빵 마스터하기",
      blank: false,
    },
    {
      link: "https://forms.gle/Rs3A1JZhoX7rFeAd6",
      imgPath: "/images/main/sendfeedback-icon.png",
      title: "피드백 보내기",
      description: "의견을 들려주세요",
      blank: true,
    },
  ];

  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-[url('/images/main/main-bg.jpg')] bg-white/70 bg-blend-overlay">
      <h1 className="mb-4 text-6xl text-t-primary">빵.zip</h1>
      <p className="text-3xl">오늘도 빵빵하게 🍞</p>

      <nav className="flex flex-col justify-center gap-4 flex-1 w-full">
        <ul className="contents">
          {menus.map((item, idx) => (
            <li key={idx} className="block rounded-xl border border-accentgold bg-offwhite">
              <Link
                href={item.link}
                target={item.blank ? "_blank" : "_self"}
                rel={item.blank ? "noopener noreferrer" : undefined}
                className="flex gap-4 items-center p-4"
              >
                <Image src={item.imgPath} width={70} height={70} alt={`${item.title} 아이콘`} className="h-15 object-contain" />
                <span className="flex flex-col">
                  <span className="text-xl text-t-primary">{item.title}</span>
                  <span>{item.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
