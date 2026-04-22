"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { tagLabels, type Salon, type SalonTag } from "@/data/salons";

type SalonDirectoryProps = {
  featuredTags: SalonTag[];
  salons: Salon[];
};

type SortKey = "추천순" | "이름순" | "가격순" | "예약우선" | "주차우선" | "좋아요순";

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
      <div className="shell directory-shell">
        <div className="filter-controls panel">
          <div className="filter-grid">
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

            <div className="field">
              <label htmlFor="area">권역</label>
              <select
                className="select"
                id="area"
                value={selectedArea}
                onChange={(event) => setSelectedArea(event.target.value)}
              >
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="sort">정렬</label>
              <select
                className="select"
                id="sort"
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as SortKey)}
              >
                <option value="추천순">추천순</option>
                <option value="이름순">이름순</option>
                <option value="가격순">가격순</option>
                <option value="예약우선">예약 확인 우선</option>
                <option value="주차우선">주차 가능 우선</option>
                <option value="좋아요순">좋아요순</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>빠른 조건</label>
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

          <div className="filter-footer">
            <div className="active-filters">
              <span className="source-badge">{filteredSalons.length}곳 표시 중</span>
              <span className="source-badge">활성 필터 {activeFilterCount}개</span>

              {selectedArea !== "전체" ? (
                <button
                  className="active-pill"
                  onClick={() => setSelectedArea("전체")}
                  type="button"
                >
                  권역: {selectedArea} ×
                </button>
              ) : null}

              {selectedTags.map((tag) => (
                <button
                  className="active-pill"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  type="button"
                >
                  {tagLabels[tag]} ×
                </button>
              ))}

              {normalizedQuery ? (
                <button className="active-pill" onClick={() => setQuery("")} type="button">
                  검색어: {query} ×
                </button>
              ) : null}
            </div>

            <button className="button button-secondary" onClick={resetFilters} type="button">
              필터 초기화
            </button>
          </div>
        </div>

        <div className="results-stage">
          <div className="results-head">
            <div>
              <h2>전체 비교</h2>
              <p className="helper">
                카드 안에서 가격대, 예약 방식, 주차, 추천 대상을 먼저 보고, 마음에
                들면 상세 페이지나 예약 링크로 바로 넘어가는 흐름이다.
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
              빠르다.
            </div>
          ) : (
            <div className="results results-rich">
              {filteredSalons.map((salon) => (
                <article className="card card-rich" key={salon.id}>
                  <div className="card-top">
                    <div className="card-title-wrap">
                      <h3>{salon.name}</h3>
                      <p className="summary clamp-2">{salon.summary}</p>
                    </div>
                    <span className="area-badge">{salon.area}</span>
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

                  <div className="highlight-box">
                    <span>이런 경우에 맞음</span>
                    <strong className="clamp-2">{salon.recommendedFor}</strong>
                  </div>

                  <div className="meta-grid meta-grid-compact">
                    <div className="meta">
                      <span>가격대</span>
                      <strong className="clamp-2">{salon.priceSummary}</strong>
                    </div>
                    <div className="meta">
                      <span>예약</span>
                      <strong className="clamp-2">{salon.reservation}</strong>
                    </div>
                    <div className="meta">
                      <span>주차</span>
                      <strong className="clamp-2">{salon.parking}</strong>
                    </div>
                    <div className="meta">
                      <span>대표 강점</span>
                      <strong className="clamp-2">{salon.specialties.join(", ")}</strong>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="card-meta-row">
                      <span className="source-badge">{salon.sourceLabel}</span>
                      <button
                        className="like-button"
                        aria-label="좋아요"
                        title="좋아요"
                        type="button"
                      >
                        <span className="like-icon">♥</span>
                      </button>
                    </div>
                    <div className="actions">
                      <Link className="button button-secondary" href={`/salons/${salon.slug}`}>
                        자세히 보기
                      </Link>
                      <a
                        className="button button-primary"
                        href={salon.reservationUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        예약 링크
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
