import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/news";
import MenuItem, { MenuItemProps } from "@/components/common/MenuItem";
import Header from "@/components/common/Header";
import SearchBar from "@/components/common/SearchBar";

export default function Home() {
  const menus: MenuItemProps[] = [
    { link: "./menus/bread-pedia", imgPath: "/images/main/breadpedia-icon.png", title: "빵 도감", description: "모든 빵을 한눈에", direction: "col" },
    {
      link: "./menus/bread-quiz",
      imgPath: "/images/main/quiz-icon.png",
      title: "빵 퀴즈",
      description: "퀴즈로 마스터하기",
      direction: "col",
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
      <div className="flex-1 w-full max-w-2xl bg-white">
        <Header title="빵.zip" />

        <main className="mb-5">
          <section className="my-2">
            <div className="w-full text-center">
              <p className="text-sm">💌 {news[0].message}</p>
            </div>
          </section>

          <section className="flex justify-center gap-10 px-5 h-40 bg-linear-to-r from-offwhite via-white to-offwhite overflow-hidden">
            <Image src={"/images/main/preview-mock.png"} width={150} height={200} alt="빵.zip 미리보기 아이폰 목업 이미지" className="self-start mt-5" />
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
            <p className="text-center">궁금한 빵을 검색해 보세요!</p>
            <SearchBar />
          </section>

          <section className="p-6 text-center whitespace-normal">
            <p className="mb-4 text">빵.zip, 이렇게 활용해 보세요!</p>
            <div className="flex flex-col gap-8 items-center justify-center py-8 bg-offwhite text-sm">
              <p>
                <span className="text-t-primary underline">Step 1.</span>
                <br />
                [빵 도감]에서 카테고리별로 이미지와 정보를 익히고,
              </p>
              <Image src={"/images/main/tutorial-1.png"} width={150} height={200} alt="빵 도감 스크린샷" />
              <p>
                <span className="text-t-primary underline">Step 2.</span>
                <br />
                단계별 퀴즈를 통해 실력을 쌓아보세요!
              </p>
              <div className="flex max-[23.75rem]:flex-col gap-4">
                <Image src={"/images/main/tutorial-2-1.png"} width={150} height={200} alt="빵 퀴즈 - 기본편 스크린샷" />
                <Image src={"/images/main/tutorial-2-2.png"} width={150} height={200} alt="빵 퀴즈 - 실전편 스크린샷" />
              </div>

              <p>
                <span className="text-t-primary underline">Step 3.</span>
                <br />
                앱 사용 소감을 알려주세요!
                <br />
                어떤 의견이든 큰 도움이 돼요 :)
              </p>
              <Link
                href={"https://forms.gle/Rs3A1JZhoX7rFeAd6"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-2 rounded-xl border border-accentgold"
              >
                피드백 보내기
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
