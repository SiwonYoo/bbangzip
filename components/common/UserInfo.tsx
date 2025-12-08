import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogIn } from "lucide-react";

function UserInfo() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return;
  }

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-0 p-2">
      {user ? (
        <Link href={"/mypage"} type="submit" className="p-2">
          <p className="flex items-center gap-2">MY</p>
        </Link>
      ) : (
        <div className="flex justify-end">
          <Link href={"/login"}>
            <LogIn size={24} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
