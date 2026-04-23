"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { tagLabels, type Salon, type SalonTag } from "@/data/salons";

type SalonDirectoryProps = {
  featuredTags: SalonTag[];
  salons: Salon[];
};

type SortKey = "추천순" | "이름순" | "가격순" | "예약우선" | "주차우선" | "좋아요순";

const sortOptions: SortKey[] = ["추천순", "가격순", "예약우선", "주차우선", "좋아요순", "이름순"];

const knownReservation = (reservation: string) =>
  !reservation.includes("확인 필요") && !reservation.includes("공개");

const knownParking = (parking: string) => parking.includes("가능");

const knownPrice = (price: string) =>
  !price.includes("확인 필요") && !price.includes("추후");

const getPriceFloor = (price: string) => {
  const match = price.replace(/,/g, "").match(/(\d{4,})원/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
};

const scoreSalon = (salon: Salon) => {
  let score = 0;

  if (knownReservation(salon.reservation)) score += 3;
  if (knownParking(salon.parking)) score += 2;
  if (knownPrice(salon.priceSummary)) score += 2;
  score += salon.tags.length;

  if (salon.tags.includes("네이버예약")) score += 2;
  if (salon.tags.includes("주차")) score += 1;
  if (salon.tags.includes("1인샵")) score += 1;

  return score;
};

export default function SalonDirectory({
  featuredTags,
  salons
}: SalonDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("전체");
  const [selectedTags, setSelectedTags] = useState<SalonTag[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("추천순");

  const areas = useMemo(
    () => ["전체", ...Array.from(new Set(salons.map((salon) => salon.area)))],
    [salons]
  );

  const normalizedQuery = query.trim().toLowerCase();

  const stats = useMemo(
    () => ({
      total: salons.length,
      reservationReady: salons.filter((salon) => knownReservation(salon.reservation)).length,
      parkingReady: salons.filter((salon) => knownParking(salon.parking)).length,
      privateShops: salons.filter((salon) => salon.tags.includes("1인샵")).length
    }),
    [salons]
  );

  const filteredSalons = useMemo(() => {
    const matched = salons.filter((salon) => {
      const matchesArea = selectedArea === "전체" || salon.area === selectedArea;
      const matchesTags = selectedTags.every((tag) => salon.tags.includes(tag));

      const searchableText = [
        salon.name,
        salon.area,
        salon.address,
        salon.summary,
        salon.recommendedFor,
        salon.priceSummary,
        salon.specialties.join(" "),
        salon.tags.map((tag) => tagLabels[tag]).join(" ")
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesArea && matchesTags && matchesQuery;
    });

    return matched.sort((left, right) => {
      if (sortKey === "이름순") {
        return left.name.localeCompare(right.name, "ko");
      }

      if (sortKey === "예약우선") {
        return Number(knownReservation(right.reservation)) - Number(knownReservation(left.reservation));
      }

      if (sortKey === "주차우선") {
        return Number(knownParking(right.parking)) - Number(knownParking(left.parking));
      }

      if (sortKey === "가격순") {
        return getPriceFloor(left.priceSummary) - getPriceFloor(right.priceSummary);
      }

      if (sortKey === "좋아요순") {
        return (right.favoriteCount ?? 0) - (left.favoriteCount ?? 0);
      }

      return scoreSalon(right) - scoreSalon(left);
    });
  }, [normalizedQuery, salons, selectedArea, selectedTags, sortKey]);

  const activeFilterCount =
    selectedTags.length +
    (selectedArea === "전체" ? 0 : 1) +
    (normalizedQuery.length > 0 ? 1 : 0);

  const toggleTag = (tag: SalonTag) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((entry) => entry !== tag)
        : [...current, tag]
    );
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedArea("전체");
    setSelectedTags([]);
    setSortKey("추천순");
  };

  return (
    <section className="section directory-section">
      <div className="shell directory-stage">
        <section className="directory-hero-card">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light">빛가람동 살롱 디렉토리</span>
            <h1>조건을 먼저 좁히고, 지도까지 보고, 바로 예약으로 넘긴다.</h1>
            <p>
              hear-cut은 로컬 미용실 정보를 단순 나열하지 않는다. 가격대, 예약 가능
              여부, 주차, 추천 포인트를 먼저 스캔하고 갈 만한 샵만 빠르게 남기는
              비교 허브를 목표로 한다.
            </p>
            <div className="hero-accent-list">
              <span>멀티 조건 필터</span>
              <span>카카오 지도 연결</span>
              <span>예약 링크 바로 이동</span>
            </div>
          </div>

          <div className="hero-stat-grid">
            <div className="hero-stat-card">
              <span>수록 미용실</span>
              <strong>{stats.total}</strong>
              <p>빛가람동 기준 공개 소스 수집본</p>
            </div>
            <div className="hero-stat-card">
              <span>예약 정보 확인</span>
              <strong>{stats.reservationReady}</strong>
              <p>전화, 플랫폼, 링크 기준 확인 샵</p>
            </div>
            <div className="hero-stat-card">
              <span>주차 확인</span>
              <strong>{stats.parkingReady}</strong>
              <p>차량 방문 기준 우선 추린 샵</p>
            </div>
            <div className="hero-stat-card hero-stat-card-accent">
              <span>1인샵 태그</span>
              <strong>{stats.privateShops}</strong>
              <p>프라이빗 선호 사용자용 큐레이션</p>
            </div>
          </div>
        </section>

        <div className="directory-workbench">
          <aside className="filter-sidebar">
            <div className="panel filter-panel sticky-panel">
              <div className="filter-panel-head">
                <div>
                  <span className="eyebrow">필터 랩</span>
                  <h2>원하는 조건만 남기기</h2>
                </div>
                <p>
                  검색, 권역, 정렬, 태그를 겹쳐서 바로 추린다. 스크롤보다 먼저
                  판단하게 만드는 쪽으로 UX를 재정리했다.
                </p>
              </div>

              <div className="field field-grow">
                <label htmlFor="search">검색</label>
                <input
                  className="search"
                  id="search"
                  type="text"
                  placeholder="상호명, 도로명, 특징, 태그 검색"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              <div className="filter-block">
                <div className="filter-block-head">
                  <span className="filter-block-title">권역</span>
                  {selectedArea !== "전체" ? (
                    <button className="filter-inline-reset" onClick={() => setSelectedArea("전체")} type="button">
                      전체로
                    </button>
                  ) : null}
                </div>
                <div className="chip-row chip-grid">
                  {areas.map((area) => (
                    <button
                      key={area}
                      className={`chip chip-button ${selectedArea === area ? "chip-active" : ""}`}
                      onClick={() => setSelectedArea(area)}
                      type="button"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-block">
                <span className="filter-block-title">정렬</span>
                <div className="chip-row chip-grid">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      className={`chip chip-button ${sortKey === option ? "chip-active" : ""}`}
                      onClick={() => setSortKey(option)}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-block">
                <span className="filter-block-title">빠른 조건</span>
                <div className="chip-row chip-grid">
                  {featuredTags.map((tag) => {
                    const active = selectedTags.includes(tag);

                    return (
                      <button
                        className={`chip chip-button ${active ? "chip-active" : ""}`}
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        type="button"
                      >
                        {tagLabels[tag]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="filter-summary">
                <div className="active-filters">
                  <span className="source-badge">{filteredSalons.length}곳 표시 중</span>
                  <span className="source-badge">활성 필터 {activeFilterCount}개</span>

                  {selectedArea !== "전체" ? (
                    <button className="active-pill" onClick={() => setSelectedArea("전체")} type="button">
                      권역: {selectedArea} ×
                    </button>
                  ) : null}

                  {selectedTags.map((tag) => (
                    <button className="active-pill" key={tag} onClick={() => toggleTag(tag)} type="button">
                      {tagLabels[tag]} ×
                    </button>
                  ))}

                  {normalizedQuery ? (
                    <button className="active-pill" onClick={() => setQuery("")} type="button">
                      검색어: {query} ×
                    </button>
                  ) : null}
                </div>

                <button className="button button-secondary filter-reset" onClick={resetFilters} type="button">
                  필터 초기화
                </button>
              </div>
            </div>
          </aside>

          <div className="results-stage">
            <div className="results-intro panel">
              <div className="results-intro-copy">
                <span className="eyebrow">비교 보드</span>
                <h2>고르기 전, 먼저 후보를 2~3곳으로 줄인다.</h2>
                <p>
                  카드마다 가격대, 예약 방식, 주차, 대표 강점을 먼저 펼쳐서
                  상세페이지에 들어가기 전에도 판단이 되도록 구성했다.
                </p>
              </div>
              <div className="results-meta">
                <span>{filteredSalons.length}곳 표시 중</span>
                <span>공개 소스 기준 2026-04-22 정리</span>
              </div>
            </div>

            {filteredSalons.length === 0 ? (
              <div className="empty">
                결과가 없다. 상호명보다 권역 + 태그 조합으로 다시 좁혀보는 편이
                더 빠르다.
              </div>
            ) : (
              <div className="results results-rich">
                {filteredSalons.map((salon) => (
                  <article className="salon-card" key={salon.id}>
                    <div className="salon-card-top">
                      <div className="card-title-wrap">
                        <div className="salon-card-topline">
                          <span className="salon-area">{salon.area}</span>
                          <span className="salon-score">큐레이션 {scoreSalon(salon)}</span>
                        </div>
                        <h3>{salon.name}</h3>
                        <p className="summary clamp-2">{salon.summary}</p>
                      </div>

                      <button className="like-button" aria-label="좋아요" title="좋아요" type="button">
                        <span className="like-icon">♥</span>
                      </button>
                    </div>

                    <div className="pill-row">
                      {salon.tags.length > 0 ? (
                        salon.tags.slice(0, 5).map((tag) => (
                          <span className="pill" key={tag}>
                            {tagLabels[tag]}
                          </span>
                        ))
                      ) : (
                        <span className="pill pill-muted">기본 정보 수집</span>
                      )}
                    </div>

                    <div className="salon-card-spotlight">
                      <span>추천 포인트</span>
                      <strong className="clamp-2">{salon.recommendedFor}</strong>
                    </div>

                    <div className="salon-card-metrics">
                      <div className="metric-tile">
                        <span>가격대</span>
                        <strong className="clamp-2">{salon.priceSummary}</strong>
                      </div>
                      <div className="metric-tile">
                        <span>예약</span>
                        <strong className="clamp-2">{salon.reservation}</strong>
                      </div>
                      <div className="metric-tile">
                        <span>주차</span>
                        <strong className="clamp-2">{salon.parking}</strong>
                      </div>
                      <div className="metric-tile">
                        <span>대표 강점</span>
                        <strong className="clamp-2">{salon.specialties.join(", ")}</strong>
                      </div>
                    </div>

                    <div className="salon-card-footer">
                      <div className="card-meta-row">
                        <span className="source-badge">{salon.sourceLabel}</span>
                        <span className="source-badge">최종 확인 {salon.lastCheckedAt}</span>
                      </div>
                      <div className="actions">
                        <Link className="button button-secondary" href={`/salons/${salon.slug}`}>
                          상세 보기
                        </Link>
                        <a
                          className="button button-primary"
                          href={salon.reservationUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          예약 이동
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
