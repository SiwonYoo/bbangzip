import { DefaultSession } from "next-auth";

export declare module "@auth/core/types" {
  interface User {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: { id: string; accessToken?: string; refreshToken?: string } & DefaultSession["user"];
  }
}

export declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
