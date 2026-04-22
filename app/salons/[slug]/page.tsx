import Link from "next/link";
import { notFound } from "next/navigation";
import { salons, tagLabels } from "@/data/salons";

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
              {salon.tags.length > 0 ? (
                salon.tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tagLabels[tag]}
                  </span>
                ))
              ) : (
                <span className="pill pill-muted">기본 정보 수집 완료</span>
              )}
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
                {salon.sourceLabel} 보기
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
                <span>예약 방식</span>
                <strong>{salon.reservation}</strong>
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
                <span>최종 확인일</span>
                <strong>{salon.lastCheckedAt}</strong>
              </div>
              <div className="detail-item">
                <span>운영 메모</span>
                <strong>
                  공개 소스 기준으로 정리한 비교 데이터다. 실제 방문 전 영업시간,
                  가격, 예약 가능 여부는 다시 확인하는 전제가 필요하다.
                </strong>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
