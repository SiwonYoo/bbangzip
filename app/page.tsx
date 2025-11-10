import { news } from "@/data/news";
import MenuItem from "@/components/common/MenuItem";

export default function Home() {
  const menus = [
    { link: "./menus/bread-pedia", imgPath: "/images/main/breadpedia-icon.png", title: "빵 도감", description: "모든 빵을 한눈에" },
    {
      link: "./menus/bread-quiz",
      imgPath: "/images/main/quiz-icon.png",
      title: "빵 퀴즈",
      description: "게임으로 빵 마스터하기",
    },
    {
      link: "https://forms.gle/Rs3A1JZhoX7rFeAd6",
      imgPath: "/images/main/sendfeedback-icon.png",
      title: "1분 응원하기",
      description: "초보 개발자에게 힘이 돼요!",
      blank: true,
    },
  ];

  return (
    <main className="flex gap-4 h-screen w-full max-w-3xl flex-col items-center py-24 px-12 bg-[url('/images/main/main-bg.jpg')] bg-white/70 bg-blend-overlay">
      <h1 className="text-6xl text-t-primary">빵.zip</h1>
      <p className="text-3xl">오늘도 빵빵하게 🍞</p>

      <nav className="flex flex-col justify-center gap-6 flex-1 w-full">
        <ul className="contents">
          {menus.map((menu, idx) => (
            <li key={idx}>
              <MenuItem menu={menu} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-2 w-full border-y border-accentgold text-center bg-white">
        <p className="pb-2 text-t-primary">💌 오늘의 빵.zip 소식 💌</p>
        <p>{news[0].message}</p>
      </div>
    </main>
  );
}
