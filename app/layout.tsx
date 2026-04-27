import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import MuiProvider from "@/components/mui-provider";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans"
});

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
      <body className={notoSans.variable}>
        <MuiProvider>
          {/* Samsung Life style fixed header */}
          <header className="sl-header">
            <Link href="/" className="sl-header-home" aria-label="홈">
              🏠
            </Link>
            <span className="sl-header-title">hear-cut</span>
            <div className="sl-header-actions">
              <a
                href="mailto:hello@hear-cut.local"
                className="sl-header-consult"
                aria-label="제보하기"
              >
                제보
              </a>
              <span className="sl-header-menu" aria-hidden>≡</span>
            </div>
          </header>

          {/* Page content — padded for fixed header */}
          <div style={{ paddingTop: 52 }}>
            {children}
          </div>
        </MuiProvider>
      </body>
    </html>
  );
}
