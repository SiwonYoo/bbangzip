import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";

const jua = Jua({ subsets: ["latin"], weight: "400", variable: "--font-jua" });

export const metadata: Metadata = {
  title: "빵.zip",
  description: "뚜레쥬르 신입 알바생이 빵 종류와 카테고리를 빠르게 학습할 수 있도록 돕는 웹 기반 학습 도구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${jua.variable} antialiased`}>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-jua dark:bg-black text-t-secondary">{children}</div>
      </body>
    </html>
  );
}
