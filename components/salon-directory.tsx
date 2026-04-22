"use client";

import Link from "next/link";
import { useState } from "react";
import { tagLabels, type Salon, type SalonTag } from "@/data/salons";

type SalonDirectoryProps = {
  featuredTags: SalonTag[];
  salons: Salon[];
};

export default function SalonDirectory({
  featuredTags,
  salons
}: SalonDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<SalonTag | "전체">("전체");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSalons = salons.filter((salon) => {
    const matchesTag =
      selectedTag === "전체" ? true : salon.tags.includes(selectedTag);

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

    return matchesTag && matchesQuery;
  });

  const resetFilters = () => {
    setQuery("");
    setSelectedTag("전체");
  };

  return (
    <section className="section">
      <div className="shell layout-grid">
        <aside className="panel filter-panel">
          <div className="field">
            <label htmlFor="search">미용실 빠르게 찾기</label>
            <input
              className="search"
              id="search"
              type="text"
              placeholder="상호명, 도로명, 특징 검색"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="field">
            <label>빠른 조건</label>
            <div className="chip-row">
              <button
                className={`chip chip-button ${selectedTag === "전체" ? "chip-active" : ""}`}
                onClick={() => setSelectedTag("전체")}
                type="button"
              >
                전체
              </button>
              {featuredTags.map((tag) => (
                <button
                  className={`chip chip-button ${selectedTag === tag ? "chip-active" : ""}`}
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  type="button"
                >
                  {tagLabels[tag]}
                </button>
              ))}
            </div>
          </div>

          <div className="meta-grid">
            <div className="meta">
              <span>현재 결과</span>
              <strong>{filteredSalons.length}곳</strong>
            </div>
            <div className="meta">
              <span>선택 조건</span>
              <strong>{selectedTag === "전체" ? "전체 보기" : tagLabels[selectedTag]}</strong>
            </div>
          </div>

          <p className="helper">
            첫 메인 페이지는 소개용 랜딩보다 비교 홈이 맞다. 사용자가 들어오자마자
            검색, 필터, 카드 비교를 시작할 수 있어야 한다.
          </p>

          <button
            className="button button-secondary"
            onClick={resetFilters}
            type="button"
          >
            검색·필터 초기화
          </button>
        </aside>

        <div className="results-stage">
          <div className="results-head">
            <div>
              <h2>전체 비교</h2>
              <p className="helper">
                공개 소스 기준으로 수집한 정보를 같은 형식으로 맞췄다. 방문 전
                운영시간과 예약 가능 여부는 다시 확인하는 전제가 필요하다.
              </p>
            </div>
            <div className="results-meta">
              <span>{filteredSalons.length}곳 표시 중</span>
              <span>기준일 2026-04-22</span>
            </div>
          </div>

          {filteredSalons.length === 0 ? (
            <div className="empty">
              검색 결과가 없다. 상호명 대신 상야, 배멧, 남성, 1인샵 같은
              조건으로 다시 찾아보는 편이 낫다.
            </div>
          ) : (
            <div className="results">
              {filteredSalons.map((salon) => (
                <article className="card" key={salon.id}>
                  <div className="card-top">
                    <div>
                      <h3>{salon.name}</h3>
                      <p className="summary">{salon.summary}</p>
                    </div>
                    <span className="pill pill-muted">{salon.area}</span>
                  </div>

                  <div className="pill-row">
                    {salon.tags.length > 0 ? (
                      salon.tags.slice(0, 4).map((tag) => (
                        <span className="pill" key={tag}>
                          {tagLabels[tag]}
                        </span>
                      ))
                    ) : (
                      <span className="pill pill-muted">기본 정보 수집 완료</span>
                    )}
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
                      rel="noreferrer"
                      target="_blank"
                    >
                      예약·출처 보기
                    </a>
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
