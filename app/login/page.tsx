import LoginButton from "@/app/login/LoginButton";
import Header from "@/components/common/Header";

function Login() {
  return (
    <>
      <Header title="로그인" />

      <main className="p-4 contents">
        <div className="flex-1 flex flex-col items-center justify-center gap-4 h-full">
          <p className="text-center">
            카카오로 3초만에 시작하고
            <br />
            나만의 빵 컬렉션을 만들어보세요!
          </p>
          <LoginButton />
        </div>
      </main>
    </>
  );
}

export default Login;
