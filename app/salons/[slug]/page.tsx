import Link from "next/link";
import { notFound } from "next/navigation";
import { salons, type SalonTag } from "@/data/salons";

const labels: Record<SalonTag, string> = {
  남성커트: "남성 커트",
  여성커트: "여성 커트",
  펌: "펌",
  염색: "염색",
  클리닉: "클리닉",
  "1인샵": "1인샵",
  주차: "주차 가능",
  네이버예약: "네이버 예약",
  퇴근후: "퇴근 후 방문",
  가성비: "가성비"
};

export function generateStaticParams() {
  return salons.map((salon) => ({
    slug: salon.slug
  }));
}

export default async function SalonDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const salon = salons.find((entry) => entry.slug === slug);

  if (!salon) {
    notFound();
  }

  return (
    <main className="detail-shell">
      <div className="shell">
        <Link className="detail-back" href="/">
          ← 목록으로 돌아가기
        </Link>

        <div className="detail-grid">
          <section className="detail-card detail-head">
            <span className="eyebrow">{salon.area}</span>
            <h1>{salon.name}</h1>
            <p className="caption">{salon.summary}</p>
            <div className="pill-row">
              {salon.tags.map((tag) => (
                <span key={tag} className="pill">
                  {labels[tag]}
                </span>
              ))}
            </div>
            <div className="actions">
              <a
                className="button button-primary"
                href={salon.reservationUrl}
                target="_blank"
                rel="noreferrer"
              >
                예약 링크 열기
              </a>
              <a className="button button-secondary" href={salon.source} target="_blank" rel="noreferrer">
                출처 보기
              </a>
            </div>
          </section>

          <section className="detail-columns">
            <div className="detail-card detail-list">
              <div className="detail-item">
                <span>주소</span>
                <strong>{salon.address}</strong>
              </div>
              <div className="detail-item">
                <span>운영시간</span>
                <strong>{salon.hours}</strong>
              </div>
              <div className="detail-item">
                <span>전화</span>
                <strong>{salon.phone}</strong>
              </div>
              <div className="detail-item">
                <span>주차</span>
                <strong>{salon.parking}</strong>
              </div>
              <div className="detail-item">
                <span>추천 대상</span>
                <strong>{salon.recommendedFor}</strong>
              </div>
            </div>

            <aside className="detail-card detail-list">
              <div className="detail-item">
                <span>가격대</span>
                <strong>{salon.priceSummary}</strong>
              </div>
              <div className="detail-item">
                <span>대표 강점</span>
                <strong>{salon.specialties.join(", ")}</strong>
              </div>
              <div className="detail-item">
                <span>예약 방식</span>
                <strong>{salon.reservation}</strong>
              </div>
              <div className="detail-item">
                <span>최종 확인일</span>
                <strong>{salon.lastCheckedAt}</strong>
              </div>
              <div className="detail-item">
                <span>운영 메모</span>
                <strong>
                  이 상세 페이지는 전수조사형 MVP 구조를 보여주기 위한 초안이다.
                  이후 Supabase 원본 데이터와 연결해 필드를 보강할 수 있다.
                </strong>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
