"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { salons } from "@/data/salons";
import type { Salon, SalonTag } from "@/data/salons";

// ─── constants ───────────────────────────────────────────────────────────────

const TABS = ["특장점", "살롱목록", "FAQ"] as const;
type Tab = (typeof TABS)[number];

const AREA_COLORS: Record<string, string> = {
  그린로권: "#6EBF8B",
  "배멧3길권": "#F4A261",
  "상야4길권": "#E07070",
  우정로권: "#7AADCF",
  "중흥s클래스권": "#B07FD4",
  정보화길권: "#8FB8E0",
  천문로권: "#D4A853",
};

const TAG_EMOJI: Record<SalonTag, string> = {
  남성커트: "✂️", 여성커트: "💇", 펌: "🌀", 염색: "🎨",
  클리닉: "💆", "1인샵": "👤", 주차: "🅿️", 네이버예약: "📱",
  퇴근후: "🌙", 가성비: "💰", 키즈: "👶", 두피관리: "🧴",
};

const TAG_LABEL: Record<SalonTag, string> = {
  남성커트: "남성커트", 여성커트: "여성커트", 펌: "펌", 염색: "염색",
  클리닉: "클리닉", "1인샵": "1인샵", 주차: "주차", 네이버예약: "네이버예약",
  퇴근후: "퇴근후방문", 가성비: "가성비", 키즈: "키즈", 두피관리: "두피관리",
};

const FAQ_ITEMS = [
  {
    q: "살롱 정보는 얼마나 정확한가요?",
    a: "네이버 지도, 뷰티앤톡톡, 당근 동네업체 등 공개 소스를 직접 확인해 정리한 데이터입니다. 변동 가능성이 있으니 방문 전 전화로 확인을 권장합니다.",
  },
  {
    q: "네이버 예약은 어떻게 이용하나요?",
    a: "살롱 카드의 '네이버 예약' 버튼을 탭하면 해당 살롱의 네이버 예약 페이지로 바로 이동합니다.",
  },
  {
    q: "주차 가능 여부는 어떻게 확인하나요?",
    a: "각 살롱 카드의 🅿️ 주차 태그로 확인하세요. 주차 태그가 있는 살롱은 전용 주차 공간이 있습니다.",
  },
  {
    q: "잘못된 정보를 발견했어요",
    a: "제보·수정 요청 링크를 통해 알려주시면 빠르게 수정하겠습니다. 감사합니다!",
  },
  {
    q: "살롱을 추가하거나 소개할 수 있나요?",
    a: "나주혁신도시·빛가람동 지역 살롱이라면 이메일이나 GitHub 이슈로 제보해 주세요!",
  },
  {
    q: "데이터는 얼마나 자주 업데이트되나요?",
    a: "수동으로 관리하는 정적 데이터입니다. 추후 정기 업데이트 사이클을 마련할 예정입니다.",
  },
];

// ─── shared atoms ─────────────────────────────────────────────────────────────

function TagPill({ tag }: { tag: SalonTag }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "4px 10px",
        borderRadius: 999,
        background: "#F5F5F5",
        fontSize: 12,
        color: "#555",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {TAG_EMOJI[tag]} #{TAG_LABEL[tag]}
    </span>
  );
}

function SectionDivider() {
  return <div style={{ height: 8, background: "#F5F5F5" }} />;
}

function IllustPlaceholder({
  emoji,
  label,
  bgFrom = "#F8F8F8",
  bgTo = "#F0F0F0",
}: {
  emoji: string;
  label: string;
  bgFrom?: string;
  bgTo?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4 / 3",
        maxHeight: 240,
        background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        margin: "20px 0",
      }}
    >
      <div style={{ fontSize: 56 }}>{emoji}</div>
      <div style={{ fontSize: 12, color: "#AAAAAA" }}>{label}</div>
    </div>
  );
}

// ─── salon card (review-card style) ──────────────────────────────────────────

function SalonCard({ salon }: { salon: Salon }) {
  const color = AREA_COLORS[salon.area] ?? "#888";
  const hasNaver = salon.tags.includes("네이버예약");

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: "18px 20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        marginBottom: 12,
      }}
    >
      {/* header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: color + "22",
            border: `2px solid ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          ✂️
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "#1C1C1E",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {salon.name}
          </div>
          <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
            {salon.area}
          </div>
        </div>
        <span
          style={{
            padding: "3px 8px",
            borderRadius: 999,
            background: color + "22",
            color: color,
            fontSize: 11,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {salon.area}
        </span>
      </div>

      {/* summary */}
      <p
        style={{
          fontSize: 13,
          color: "#555",
          lineHeight: 1.65,
          margin: "0 0 10px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {salon.summary}
      </p>

      {/* tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          marginBottom: 12,
        }}
      >
        {salon.tags.slice(0, 4).map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 8 }}>
        {hasNaver && salon.reservationUrl && (
          <a
            href={salon.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 10,
              background: "#FF6B6B",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              textAlign: "center",
              textDecoration: "none",
              display: "block",
            }}
          >
            네이버 예약
          </a>
        )}
        <Link
          href={`/salons/${salon.slug}`}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 10,
            background: "#F5F5F5",
            color: "#444",
            fontWeight: 600,
            fontSize: 13,
            textAlign: "center",
            textDecoration: "none",
            display: "block",
          }}
        >
          자세히 보기 →
        </Link>
      </div>
    </div>
  );
}

// ─── feature block (Samsung Life section style) ───────────────────────────────

function FeatureBlock({
  label,
  heading,
  subtext,
  emoji,
  illustLabel,
  bgFrom,
  bgTo,
  ctaText,
  ctaOnClick,
}: {
  label: string;
  heading: string;
  subtext: string;
  emoji: string;
  illustLabel: string;
  bgFrom?: string;
  bgTo?: string;
  ctaText?: string;
  ctaOnClick?: () => void;
}) {
  return (
    <section style={{ padding: "28px 20px" }}>
      <div
        style={{
          fontSize: 13,
          color: "#FF6B6B",
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 900,
          lineHeight: 1.35,
          color: "#1C1C1E",
          margin: "0 0 8px",
          whiteSpace: "pre-line",
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#6B7280",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {subtext}
      </p>
      <IllustPlaceholder
        emoji={emoji}
        label={illustLabel}
        bgFrom={bgFrom}
        bgTo={bgTo}
      />
      {ctaText && (
        <button
          onClick={ctaOnClick}
          style={{
            display: "block",
            width: "100%",
            padding: "14px 0",
            borderRadius: 999,
            background: "#FF6B6B",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            textAlign: "center",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {ctaText}
        </button>
      )}
    </section>
  );
}

// ─── Tab 1: 특장점 ─────────────────────────────────────────────────────────────

function FeaturesTab({
  naverCount,
  parkingCount,
  onSwitchTab,
}: {
  naverCount: number;
  parkingCount: number;
  onSwitchTab: (tab: Tab) => void;
}) {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "32px 20px 24px" }}>
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(255, 107, 107, 0.10)",
            color: "#FF6B6B",
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          나주혁신도시 · 빛가람동
        </div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 900,
            lineHeight: 1.35,
            color: "#1C1C1E",
            margin: "0 0 10px",
          }}
        >
          가장 가까운 미용실
          <br />
          한눈에 비교하기
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#6B7280",
            margin: "0 0 24px",
            lineHeight: 1.65,
          }}
        >
          지역 살롱 정보를 직접 발품 팔아 모았어요.
          <br />
          네이버 예약, 주차 정보까지 한 번에 확인하세요.
        </p>

        {/* Hero illustration */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            background: "linear-gradient(135deg, #FFF0EE 0%, #FFE4E1 100%)",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 64 }}>✂️</div>
          <div style={{ fontSize: 13, color: "#FF6B6B", fontWeight: 600 }}>
            Lottie 일러스트 준비 중
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
          <div
            style={{
              width: 20,
              height: 5,
              borderRadius: 999,
              background: "#1C1C1E",
            }}
          />
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: 999,
              background: "#DDDDDD",
            }}
          />
        </div>
      </section>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
          borderTop: "1px solid #EBEBEB",
          borderBottom: "1px solid #EBEBEB",
        }}
      >
        {[
          { value: salons.length, label: "등록 살롱" },
          { value: naverCount, label: "네이버 예약" },
          { value: parkingCount, label: "주차 가능" },
        ].map(({ value, label }, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: i > 0 ? 0 : 0 }}>
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  height: 36,
                  background: "#EBEBEB",
                  marginRight: 24,
                }}
              />
            )}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#1C1C1E",
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{ fontSize: 12, color: "#6B7280", marginTop: 5 }}
              >
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionDivider />

      <FeatureBlock
        label="살롱 정보 한눈에"
        heading={"36곳의 미용실\n직접 발품 팔아 정리했어요"}
        subtext="빛가람동·나주혁신도시 전 권역 살롱을 공개 정보 기준으로 큐레이션했습니다."
        emoji="🗂️"
        illustLabel="살롱 목록 일러스트 (Lottie/undraw 예정)"
        bgFrom="#F5F8FF"
        bgTo="#EBF0FF"
        ctaText="살롱 목록 전체 보기"
        ctaOnClick={() => onSwitchTab("살롱목록")}
      />

      <SectionDivider />

      <FeatureBlock
        label="기다리지 말고 예약"
        heading={`${naverCount}곳에서\n네이버 예약 가능해요`}
        subtext="예약 없이 기다리지 마세요. 원하는 시간에 미리 예약하고 편하게 방문하세요."
        emoji="📱"
        illustLabel="네이버 예약 일러스트 (Lottie/undraw 예정)"
        bgFrom="#F0FFF4"
        bgTo="#E6FAF0"
        ctaText="네이버 예약 가능 살롱 보기"
        ctaOnClick={() => onSwitchTab("살롱목록")}
      />

      <SectionDivider />

      <FeatureBlock
        label="주차 걱정 없이"
        heading={`${parkingCount}곳에\n주차 공간이 있어요`}
        subtext="차를 가지고 방문하는 분들을 위해 주차 가능 여부를 미리 확인할 수 있습니다."
        emoji="🅿️"
        illustLabel="주차 일러스트 (Lottie/undraw 예정)"
        bgFrom="#FFFBF0"
        bgTo="#FFF5DC"
        ctaText="주차 가능 살롱 보기"
        ctaOnClick={() => onSwitchTab("살롱목록")}
      />

      <SectionDivider />

      {/* Editor picks (review card style) */}
      <section style={{ padding: "28px 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <span
              style={{
                fontWeight: 800,
                fontSize: 18,
                color: "#1C1C1E",
              }}
            >
              에디터 픽
            </span>
            <span
              style={{
                fontSize: 16,
                color: "#AAAAAA",
                marginLeft: 6,
              }}
            >
              {salons.length}
            </span>
          </div>
          <button
            onClick={() => onSwitchTab("살롱목록")}
            style={{
              fontSize: 13,
              color: "#FF6B6B",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            전체보기 &gt;
          </button>
        </div>

        {salons.slice(0, 3).map((salon) => {
          const color = AREA_COLORS[salon.area] ?? "#888";
          return (
            <div
              key={salon.id}
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                padding: "18px 20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: color + "22",
                    border: `2px solid ${color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  ✂️
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {salon.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                    {salon.area} ·{" "}
                    {salon.tags.includes("1인샵") ? "1인샵" : "헤어살롱"}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#BBBBBB",
                    flexShrink: 0,
                  }}
                >
                  {salon.lastCheckedAt}
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#555",
                  lineHeight: 1.65,
                  margin: "0 0 10px",
                }}
              >
                {salon.summary}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {salon.tags.slice(0, 3).map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

// ─── Tab 2: 살롱목록 ───────────────────────────────────────────────────────────

function SalonListTab({
  filteredSalons,
  areas,
  selectedArea,
  onAreaChange,
}: {
  filteredSalons: Salon[];
  areas: string[];
  selectedArea: string;
  onAreaChange: (area: string) => void;
}) {
  return (
    <div>
      {/* Area filter chips */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid #EBEBEB",
          display: "flex",
          gap: 8,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {areas.map((area) => (
          <button
            key={area}
            onClick={() => onAreaChange(area)}
            style={{
              flexShrink: 0,
              padding: "7px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              background: selectedArea === area ? "#1C1C1E" : "#F2F2F2",
              color: selectedArea === area ? "#FFFFFF" : "#666",
              transition: "all 0.15s",
              fontFamily: "inherit",
            }}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Count */}
      <div
        style={{
          padding: "14px 20px 6px",
          fontSize: 14,
          color: "#6B7280",
        }}
      >
        <span style={{ fontWeight: 700, color: "#1C1C1E" }}>
          {filteredSalons.length}개
        </span>
        의 살롱
      </div>

      {/* List */}
      <div style={{ padding: "8px 20px 120px" }}>
        {filteredSalons.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </div>
    </div>
  );
}

// ─── Tab 3: FAQ ───────────────────────────────────────────────────────────────

function FAQTab() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div>
      {/* Header */}
      <div style={{ padding: "20px 20px 8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{ fontWeight: 800, fontSize: 18, color: "#1C1C1E" }}
            >
              자주 하는 질문
            </span>
            <span style={{ fontSize: 16, color: "#AAAAAA", marginLeft: 6 }}>
              {FAQ_ITEMS.length}
            </span>
          </div>
        </div>
      </div>

      {/* FAQ accordion */}
      <div style={{ paddingBottom: 8 }}>
        {FAQ_ITEMS.map((item, idx) => (
          <div key={idx}>
            <div style={{ height: 1, background: "#EBEBEB", margin: "0 20px" }} />
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 20px",
                background: "transparent",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  color: "#1C1C1E",
                  fontWeight: 500,
                  flex: 1,
                  lineHeight: 1.5,
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: "#AAAAAA",
                  marginLeft: 12,
                  display: "inline-block",
                  transform: openIdx === idx ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              >
                ∨
              </span>
            </button>
            {openIdx === idx && (
              <div
                style={{
                  padding: "0 20px 18px",
                  fontSize: 14,
                  color: "#6B7280",
                  lineHeight: 1.7,
                }}
              >
                {item.a}
              </div>
            )}
          </div>
        ))}
        <div style={{ height: 1, background: "#EBEBEB", margin: "0 20px" }} />
      </div>

      <SectionDivider />

      {/* Help section */}
      <section style={{ padding: "24px 20px" }}>
        <div
          style={{
            fontSize: 16,
            color: "#FF6B6B",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          도움이 필요하신가요?
        </div>
        <p
          style={{
            fontSize: 13,
            color: "#6B7280",
            margin: "0 0 20px",
            lineHeight: 1.65,
          }}
        >
          데이터 오류나 추가 요청은 제보해 주세요.
          <br />
          직접 확인 후 빠르게 업데이트합니다.
        </p>

        <div
          style={{
            borderRadius: 16,
            border: "1px solid #EBEBEB",
            overflow: "hidden",
          }}
        >
          <a
            href="mailto:hello@hear-cut.local"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: "1px solid #EBEBEB",
              textDecoration: "none",
              color: "#1C1C1E",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ fontSize: 22 }}>✉️</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  이메일 제보하기
                </div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                  hello@hear-cut.local
                </div>
              </div>
            </div>
            <span style={{ color: "#AAAAAA", fontSize: 18 }}>›</span>
          </a>
          <a
            href="https://github.com/jansssss/hear-cut"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              textDecoration: "none",
              color: "#1C1C1E",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ fontSize: 22 }}>💬</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  GitHub 이슈 남기기
                </div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                  github.com/jansssss/hear-cut
                </div>
              </div>
            </div>
            <span style={{ color: "#AAAAAA", fontSize: 18 }}>›</span>
          </a>
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 11,
            color: "#BBBBBB",
            lineHeight: 1.6,
          }}
        >
          hear-cut은 나주혁신도시 지역 살롱 정보를 공개 출처 기준으로
          정리한 비공식 디렉토리입니다.
        </div>
      </section>

      <div style={{ height: 100 }} />
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function HearPage() {
  const [activeTab, setActiveTab] = useState<Tab>("특장점");
  const [selectedArea, setSelectedArea] = useState("전체");

  const areas = useMemo(
    () => ["전체", ...Array.from(new Set(salons.map((s) => s.area)))],
    []
  );

  const filteredSalons = useMemo(
    () =>
      selectedArea === "전체"
        ? salons
        : salons.filter((s) => s.area === selectedArea),
    [selectedArea]
  );

  const naverCount = useMemo(
    () => salons.filter((s) => s.tags.includes("네이버예약")).length,
    []
  );
  const parkingCount = useMemo(
    () => salons.filter((s) => s.tags.includes("주차")).length,
    []
  );

  const handleSwitchTab = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      {/* Tab navigation */}
      <div
        style={{
          position: "sticky",
          top: 52,
          zIndex: 10,
          background: "#FFFFFF",
          borderBottom: "1px solid #EBEBEB",
          padding: "10px 20px",
          display: "flex",
          gap: 8,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleSwitchTab(tab)}
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              background: activeTab === tab ? "#1C1C1E" : "#F2F2F2",
              color: activeTab === tab ? "#FFFFFF" : "#888888",
              transition: "background 0.15s, color 0.15s",
              fontFamily: "inherit",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "특장점" && (
        <FeaturesTab
          naverCount={naverCount}
          parkingCount={parkingCount}
          onSwitchTab={handleSwitchTab}
        />
      )}
      {activeTab === "살롱목록" && (
        <SalonListTab
          filteredSalons={filteredSalons}
          areas={areas}
          selectedArea={selectedArea}
          onAreaChange={setSelectedArea}
        />
      )}
      {activeTab === "FAQ" && <FAQTab />}

      {/* Fixed bottom CTA bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 480,
          background: "#FFFFFF",
          borderTop: "1px solid #EBEBEB",
          padding: "12px 16px",
          display: "flex",
          gap: 8,
          zIndex: 100,
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <button
          onClick={() => handleSwitchTab("살롱목록")}
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 12,
            border: "1px solid #EBEBEB",
            background: "#F8F8F8",
            color: "#555",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          살롱 목록 보기
        </button>
        <button
          onClick={() => handleSwitchTab("살롱목록")}
          style={{
            flex: 1.5,
            padding: "14px 0",
            borderRadius: 12,
            border: "none",
            background: "#FF6B6B",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          네이버 예약 가능 살롱 →
        </button>
      </div>
    </div>
  );
}
