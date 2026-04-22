import type { Metadata } from "next";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "hear-cut | 나주혁신도시 미용실 한눈에 비교",
  description:
    "나주혁신도시와 빛가람동 미용실을 한눈에 비교하고 네이버 예약으로 바로 이동하는 모바일 퍼스트 가이드."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/">
              <span className="brand-mark">HC</span>
              <span className="brand-meta">
                <span>hear-cut</span>
                <span className="brand-subtitle">나주혁신도시 미용실 비교 가이드</span>
              </span>
            </Link>
            <a
              className="header-link"
              href="mailto:hello@hear-cut.local"
              aria-label="제보 메일 보내기"
            >
              제보·수정 요청
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
