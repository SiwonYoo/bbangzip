import { LogIn } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function UserInfo() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  if (status === "loading") {
    return;
  }

  return (
    <div className="flex-1">
      {user ? (
        <form onSubmit={handleLogout} className="place-self-end">
          <button type="submit" className="p-2">
            <p className="flex items-center gap-2">
              {user.image && <Image src={user.image} width={24} height={24} alt={`${user.name} 프로필 이미지`} className="rounded-full" />}
              {user.name} 님
            </p>
          </button>
        </form>
      ) : (
        <div className="flex justify-end">
          <button onClick={() => signIn("kakao", { callbackUrl: "/" })} className="p-2">
            <LogIn size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
