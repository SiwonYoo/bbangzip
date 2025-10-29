import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import BreadStoreInitializer from "@/components/store/BreadStoreInitializer";

const jua = Jua({ subsets: ["latin"], weight: "400", variable: "--font-jua" });

export const metadata: Metadata = {
  title: "빵.zip",
  description: "신입 알바생이 빵 종류와 카테고리를 빠르게 학습할 수 있도록 돕는 웹 기반 학습 도구",
  openGraph: {
    title: "빵.zip",
    description: "신입 알바생이 빵 종류와 카테고리를 빠르게 학습할 수 있도록 돕는 웹 기반 학습 도구",
    url: "https://bbangzip.vercel.app",
    siteName: "빵.zip",
    images: [
      {
        url: "https://bbangzip.vercel.app/images/main/logo.png",
        width: 800,
        height: 600,
        alt: "빵.zip 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "빵.zip",
    description: "신입 알바생이 빵 종류와 카테고리를 빠르게 학습할 수 있도록 돕는 웹 기반 학습 도구",
    images: ["https://bbangzip.vercel.app/images/main/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${jua.variable} antialiased`}>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-jua dark:bg-black text-t-secondary">
          <BreadStoreInitializer />
          {children}
        </div>
      </body>
    </html>
  );
}
