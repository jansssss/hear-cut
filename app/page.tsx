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
              <span className="eyebrow">나주혁신도시 미용실 비교 홈</span>
              <h1>메인 페이지는 소개보다 비교가 먼저여야 한다.</h1>
              <p>
                hear-cut의 첫 화면은 광고성 랜딩이 아니라 비교 홈이다. 사용자가
                들어오자마자 검색하고, 조건을 누르고, 후보를 두세 곳으로 좁힌 뒤
                상세 페이지와 네이버예약 또는 공개 예약 링크로 이동하는 흐름을
                기준으로 잡았다.
              </p>
              <p className="hero-note">
                UI/UX는 이번 단계에서 반영했다. 모바일 기준으로 검색 입력, 빠른
                태그 필터, 핵심 비교 카드, 바로가기 CTA 순서로 정리했다.
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
