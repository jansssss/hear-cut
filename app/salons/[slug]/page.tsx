import Link from "next/link";
import { notFound } from "next/navigation";
import KakaoMapPanel from "@/components/kakao-map-panel";
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
        <div className="detail-topbar">
          <Link className="detail-back" href="/">
            ← 목록으로 돌아가기
          </Link>
          <span className="source-badge">{salon.sourceLabel}</span>
        </div>

        <section className="detail-hero-card">
          <div className="detail-hero-layout">
            <div className="detail-copy-stack">
              <span className="eyebrow">{salon.area}</span>
              <div className="detail-heading-block">
                <h1>{salon.name}</h1>
                <p className="detail-lead">{salon.summary}</p>
              </div>

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

              <div className="detail-stat-grid">
                <div className="detail-stat-card">
                  <span>가격대</span>
                  <strong>{salon.priceSummary}</strong>
                </div>
                <div className="detail-stat-card">
                  <span>예약 방식</span>
                  <strong>{salon.reservation}</strong>
                </div>
                <div className="detail-stat-card">
                  <span>주차</span>
                  <strong>{salon.parking}</strong>
                </div>
                <div className="detail-stat-card">
                  <span>최종 확인</span>
                  <strong>{salon.lastCheckedAt}</strong>
                </div>
              </div>

              <div className="detail-action-row">
                <a className="button button-primary" href={salon.reservationUrl} target="_blank" rel="noreferrer">
                  예약 링크 열기
                </a>
                <a className="button button-secondary" href={salon.source} target="_blank" rel="noreferrer">
                  {salon.sourceLabel} 보기
                </a>
              </div>
            </div>

            <KakaoMapPanel address={salon.address} salonName={salon.name} />
          </div>
        </section>

        <section className="detail-secondary-grid">
          <article className="detail-card info-panel">
            <div className="section-header">
              <span className="eyebrow">방문 전 체크</span>
              <h2>운영 정보와 방문 조건</h2>
            </div>

            <div className="info-grid">
              <div className="info-chip">
                <span>주소</span>
                <strong>{salon.address}</strong>
              </div>
              <div className="info-chip">
                <span>운영시간</span>
                <strong>{salon.hours}</strong>
              </div>
              <div className="info-chip">
                <span>전화</span>
                <strong>{salon.phone}</strong>
              </div>
              <div className="info-chip">
                <span>추천 대상</span>
                <strong>{salon.recommendedFor}</strong>
              </div>
            </div>
          </article>

          <aside className="detail-card insight-panel">
            <div className="section-header">
              <span className="eyebrow">큐레이션 메모</span>
              <h2>이 샵을 봐야 하는 이유</h2>
            </div>

            <div className="detail-spotlight">
              <span>대표 강점</span>
              <strong>{salon.specialties.join(", ")}</strong>
            </div>

            <div className="note-stack">
              <div className="note-card">
                <span>추천 포인트</span>
                <strong>{salon.recommendedFor}</strong>
              </div>
              <div className="note-card">
                <span>운영 메모</span>
                <strong>
                  공개 소스 기준으로 정리한 비교 데이터다. 실제 방문 전 영업시간,
                  가격, 예약 가능 여부는 다시 확인하는 전제가 필요하다.
                </strong>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
