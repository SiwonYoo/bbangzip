import { DefaultSession } from "next-auth";

export declare module "@auth/core/types" {
  interface User {
    id?: string;
    dbId?: number;
    email?: string;
    name?: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: {
      id: string;
      dbId: number;
      email: string;
      name?: string;
      image?: string;
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession["user"];
  }
}

export declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    dbId?: number;
    email?: string;
    name?: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
