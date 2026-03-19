export interface User {
  _id: number;
  email: string;
  name: string;
  loginType: "email" | "kakao";
  image?: string;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

export type OAuthUser = Required<Pick<User, "loginType">> &
  Partial<Pick<User, "name" | "email" | "image">> & {
    extra: {
      providerAccountId: string;
    };
  };
