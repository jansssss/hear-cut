import SalonDirectory from "@/components/salon-directory";
import { featuredTags, salons } from "@/data/salons";

const totalCount = salons.length;
const parkingKnownCount = salons.filter((salon) =>
  salon.parking.includes("가능")
).length;
const onePersonCount = salons.filter((salon) =>
  salon.tags.includes("1인샵")
).length;
const bookingKnownCount = salons.filter(
  (salon) => salon.reservation !== "공개 예약 링크 확인 필요"
).length;

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="shell">
          <div className="hero-card">
            <div className="hero-grid">
              <span className="eyebrow">빛가람동 헤어 디렉토리</span>
              <h1>한눈에 추리고, 조합해서 고르고, 바로 예약으로 넘긴다.</h1>
              <p>
                hear-cut은 나주혁신도시 미용실을 예쁘게 나열하는 사이트가 아니라,
                실제로 고르기 쉽게 만드는 비교 화면을 목표로 한다. 검색어, 권역,
                태그를 같이 써서 후보를 빠르게 좁히고, 최종 행동은 상세 확인 또는
                예약 링크 이동으로 단순화했다.
              </p>
              <p className="hero-note">
                이번 버전은 데스크톱과 모바일 모두에서 대비를 높이고, 카드 정보가
                흐트러지지 않도록 밀도와 위계를 다시 정리한 2차 UI다.
              </p>
            </div>

            <div className="stats">
              <div className="stat">
                <strong>{totalCount}</strong>
                <span>공개 소스 기준 수록 샵</span>
              </div>
              <div className="stat">
                <strong>{bookingKnownCount}</strong>
                <span>예약 방식 확인 샵</span>
              </div>
              <div className="stat">
                <strong>{parkingKnownCount}</strong>
                <span>주차 정보 확인 샵</span>
              </div>
              <div className="stat">
                <strong>{onePersonCount}</strong>
                <span>1인샵 태그 반영 샵</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SalonDirectory featuredTags={featuredTags} salons={salons} />
    </main>
  );
}
