import Image from "next/image";
import { Search } from "lucide-react";
import { news } from "@/data/news";
import MenuItem from "@/components/common/MenuItem";
import Header from "@/components/common/Header";

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
    <>
      <div className="flex-1 bg-white">
        <Header title="빵.zip" />
        <main>
          <div className="p-2 w-full border-y border-accentgold text-center bg-white">
            <p>💌 {news[0].message}</p>
          </div>

          <section className="flex justify-center gap-10 px-5 h-50 bg-offwhite">
            <Image src={"/images/main/preview-mock.png"} width={150} height={200} alt="빵.zip 미리보기 아이폰 목업 이미지" className="self-end" />
            <div className="self-center text-center">
              <p className="mb-2 text-xl">오늘도 빵빵하게</p>
              <p className="text-4xl text-t-primary">빵.zip</p>
            </div>
          </section>

          <section className="p-6">
            <nav className="grid grid-cols-2 gap-4">
              <ul className="contents">
                <li>
                  <MenuItem menu={menus[0]} />
                </li>
                <li>
                  <MenuItem menu={menus[1]} />
                </li>
                <li className="col-span-2">
                  <MenuItem menu={menus[2]} />
                </li>
              </ul>
            </nav>
          </section>

          <section className="p-6">
            <p className="pb-4 text-center">궁금한 빵을 검색해 보세요!</p>
            <div className="flex gap-1 items-center">
              <input type="text" className="flex-1 p-2 border-b border-accentgold" placeholder="이름, 맛, 카테고리 등으로 검색해 보세요!" />
              <Search color="var(--color-primary)" />
            </div>
          </section>

          {/* TODO 추가할 섹션 */}
          {/* <section className="p-6">
            <p className="text-center">빵.zip을 이렇게 활용해 보세요!</p>
          </section> */}
        </main>
      </div>
    </>
  );
}
