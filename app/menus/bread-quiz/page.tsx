import Header from "@/components/common/Header";
import MenuItem from "@/components/common/MenuItem";

function BreadQuiz() {
  const quizMenus = [
    {
      link: "./bread-quiz/category-quiz",
      imgPath: "/images/main/breadpedia-icon.png",
      title: "빵 카테고리 퀴즈",
      description: "🌱 Lv.1 | 빵린이의 첫걸음",
    },
    {
      link: "./bread-quiz/real-quiz",
      imgPath: "/images/main/categoryquiz-icon.png",
      title: "퀴즈 - 실전편",
      description: "🔥 Lv.2 | 이제 진짜 빵이다!",
    },
    {
      link: "./bread-quiz/master-quiz",
      imgPath: "/images/main/sendfeedback-icon.png",
      title: "퀴즈 - 심화편",
      description: "🏆 Lv.3 | 준비 중이에요",
      disabled: true,
    },
  ];

  return (
    <>
      <Header title="빵 퀴즈" />
      <main className="px-4">
        <div className="mt-5 text-center">
          <h1 className="mb-4 text-t-primary text-2xl">빵 마스터로 가는 3단계</h1>
          <p>기초부터 심화까지,</p>
          <p>다양한 모드로 퀴즈를 즐겨보세요!</p>
        </div>
        <nav className="flex flex-col gap-6 my-10">
          <ul className="contents">
            {quizMenus.map((menu, idx) => (
              <li key={idx}>
                <MenuItem menu={menu} />
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-right text-sm">TIP: 카테고리 퀴즈부터 시작하는 걸 추천해요!</p>
      </main>
    </>
  );
}

export default BreadQuiz;
