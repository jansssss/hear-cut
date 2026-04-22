import Link from "next/link";
import { featuredTags, salons, type SalonTag } from "@/data/salons";

const totalCount = salons.length;
const reservableCount = salons.filter((salon) =>
  salon.tags.includes("네이버예약")
).length;
const eveningCount = salons.filter((salon) => salon.tags.includes("퇴근후")).length;

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

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="shell">
          <div className="hero-card">
            <div className="hero-grid">
              <span className="eyebrow">나주혁신도시 미용실 한눈에 비교</span>
              <h1>고르기 어렵던 미용실, 이제는 비교하고 예약만 누르면 된다.</h1>
              <p>
                hear-cut은 나주혁신도시와 빛가람동 미용실을 모바일에서 빠르게
                비교하기 위한 가이드 웹앱 초안이다. 예약 시스템을 새로 만들지
                않고, 사용자가 고르기 쉽게 정리한 뒤 기존 예약 링크로 연결하는
                구조를 목표로 한다.
              </p>
            </div>
            <div className="stats">
              <div className="stat">
                <strong>{totalCount}</strong>
                <span>초기 수록 샵 수</span>
              </div>
              <div className="stat">
                <strong>{reservableCount}</strong>
                <span>예약 링크 확인 샘플</span>
              </div>
              <div className="stat">
                <strong>{eveningCount}</strong>
                <span>퇴근 후 탐색 후보</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2>바로 찾기</h2>
              <p>초기 MVP에서는 태그와 비교 카드만으로도 빠르게 후보를 추릴 수 있게 한다.</p>
            </div>
          </div>
          <div className="chip-row" aria-label="추천 필터">
            {featuredTags.map((tag) => (
              <span key={tag} className="chip">
                {labels[tag]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell layout-grid">
          <aside className="panel filter-panel">
            <div className="field">
              <label htmlFor="search">검색 구조 초안</label>
              <input
                className="search"
                id="search"
                type="text"
                placeholder="상호명, 동네, 태그 검색"
                readOnly
              />
            </div>
            <div className="field">
              <label>이 MVP에서 보여줄 핵심</label>
              <div className="pill-row">
                <span className="pill">가격대</span>
                <span className="pill">주차</span>
                <span className="pill">예약</span>
                <span className="pill">강점</span>
              </div>
            </div>
            <p className="helper">
              현재 버전은 정적 데이터 기반이다. 이후 Supabase를 데이터 원본으로
              바꾸면 전수조사, 제보, 수정요청, 클릭 로그까지 같은 구조로 확장할 수
              있다.
            </p>
          </aside>

          <div className="results">
            {salons.map((salon) => (
              <article className="card" key={salon.id}>
                <div className="card-top">
                  <div>
                    <h3>{salon.name}</h3>
                    <p className="summary">{salon.summary}</p>
                  </div>
                  <span className="pill pill-muted">{salon.area}</span>
                </div>

                <div className="pill-row">
                  {salon.tags.slice(0, 4).map((tag) => (
                    <span className="pill" key={tag}>
                      {labels[tag]}
                    </span>
                  ))}
                </div>

                <div className="meta-grid">
                  <div className="meta">
                    <span>가격대</span>
                    <strong>{salon.priceSummary}</strong>
                  </div>
                  <div className="meta">
                    <span>주차</span>
                    <strong>{salon.parking}</strong>
                  </div>
                  <div className="meta">
                    <span>예약</span>
                    <strong>{salon.reservation}</strong>
                  </div>
                  <div className="meta">
                    <span>추천</span>
                    <strong>{salon.recommendedFor}</strong>
                  </div>
                </div>

                <div className="actions">
                  <Link className="button button-secondary" href={`/salons/${salon.slug}`}>
                    자세히 보기
                  </Link>
                  <a
                    className="button button-primary"
                    href={salon.reservationUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    예약 링크 보기
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
