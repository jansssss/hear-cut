"use client";

import Link from "next/link";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import AttachMoneyRounded from "@mui/icons-material/AttachMoneyRounded";
import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import LocalParkingRounded from "@mui/icons-material/LocalParkingRounded";
import RestartAltRounded from "@mui/icons-material/RestartAltRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import { TagPill, tagStyleMap } from "@/components/tag-badge";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@/components/ui-stack";
import { useMemo, useState } from "react";
import { tagLabels, type Salon, type SalonTag } from "@/data/salons";

// ─── types ────────────────────────────────────────────────────────────────────

type SalonDirectoryProps = {
  featuredTags: SalonTag[];
  salons: Salon[];
};

type SortKey = "추천순" | "이름순" | "가격순" | "예약우선" | "주차우선";

// ─── constants ────────────────────────────────────────────────────────────────

const sortOptions: SortKey[] = ["추천순", "가격순", "예약우선", "주차우선", "이름순"];

const areaColorMap: Record<string, string> = {
  그린로권:        "#10B981",
  "배멧3길권":     "#6366F1",
  우정로권:        "#F59E0B",
  "상야4길권":     "#EC4899",
  빛가람로권:      "#0EA5E9",
  중흥로권:        "#8B5CF6",
  에듀로권:        "#14B8A6",
  "중흥s클래스권": "#8B5CF6",
  정보화길권:      "#8FB8E0",
  천문로권:        "#D4A853",
};

const knownReservation = (v: string) =>
  !v.includes("확인 필요") && !v.includes("공개");
const knownParking = (v: string) => v.includes("가능");
const knownPrice = (v: string) =>
  !v.includes("확인 필요") && !v.includes("추후");

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

// ─── hero illustration (inline SVG) ──────────────────────────────────────────

function SalonIllustration() {
  return (
    <svg
      viewBox="0 0 300 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "100%", maxWidth: 300, display: "block" }}
    >
      {/* Soft background blobs */}
      <ellipse cx="150" cy="112" rx="126" ry="100" fill="#FFF0EE" />
      <ellipse cx="150" cy="112" rx="90" ry="72" fill="#FFE8E4" opacity="0.55" />

      {/* Scissors — handle ring 1 */}
      <circle cx="90" cy="76" r="23" fill="white" stroke="#FF6B6B" strokeWidth="3" />
      <circle cx="90" cy="76" r="10" fill="rgba(255,107,107,0.14)" />
      {/* Scissors — handle ring 2 */}
      <circle cx="90" cy="136" r="23" fill="white" stroke="#FF6B6B" strokeWidth="3" />
      <circle cx="90" cy="136" r="10" fill="rgba(255,107,107,0.14)" />
      {/* Blades */}
      <line x1="90" y1="76"  x2="214" y2="103" stroke="#1C1C1E" strokeWidth="5" strokeLinecap="round" />
      <line x1="90" y1="136" x2="214" y2="103" stroke="#1C1C1E" strokeWidth="5" strokeLinecap="round" />
      {/* Pivot */}
      <circle cx="152" cy="106" r="8" fill="#1C1C1E" />
      <circle cx="152" cy="106" r="3.5" fill="white" />

      {/* Map pin — main */}
      <path
        d="M218 60 C218 45 228.5 36 241 36 C253.5 36 264 45 264 60 C264 75 241 94 241 94 C241 94 218 75 218 60Z"
        fill="#FF6B6B"
      />
      <circle cx="241" cy="59" r="8.5" fill="white" />

      {/* Map pins — secondary */}
      <path
        d="M210 140 C210 133 215 128 222 128 C229 128 234 133 234 140 C234 147 222 156 222 156 C222 156 210 147 210 140Z"
        fill="#FFAAAA"
      />
      <circle cx="222" cy="139" r="5.5" fill="white" />

      <path
        d="M248 155 C248 149 252 145 257 145 C262 145 266 149 266 155 C266 161 257 168 257 168 C257 168 248 161 248 155Z"
        fill="#FF8E8E"
      />
      <circle cx="257" cy="154" r="4" fill="white" />

      {/* Comb */}
      <rect x="52" y="168" width="96" height="9" rx="4.5" fill="#1C1C1E" opacity="0.72" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          x={57 + i * 8.5}
          y="177"
          width="5"
          height="15"
          rx="2.5"
          fill="#1C1C1E"
          opacity="0.72"
        />
      ))}

      {/* Decorative dots */}
      <circle cx="36"  cy="80"  r="7"  fill="#FF6B6B" opacity="0.30" />
      <circle cx="30"  cy="152" r="5"  fill="#FF9A9A" opacity="0.38" />
      <circle cx="278" cy="64"  r="8"  fill="#F59E0B" opacity="0.32" />
      <circle cx="282" cy="152" r="6"  fill="#FF6B6B" opacity="0.22" />

      {/* Star sparkles */}
      <path
        d="M34 46 L36.4 53 L44 53 L38.2 57.4 L40.6 64.5 L34 60 L27.4 64.5 L29.8 57.4 L24 53 L31.6 53Z"
        fill="#F59E0B"
        opacity="0.70"
      />
      <path
        d="M266 176 L267.8 181.5 L273.5 181.5 L269.2 185 L271 190.5 L266 187.5 L261 190.5 L262.8 185 L258.5 181.5 L264.2 181.5Z"
        fill="#FF6B6B"
        opacity="0.48"
      />
    </svg>
  );
}

// ─── tag filter button ────────────────────────────────────────────────────────

function TagFilterButton({
  tag,
  active,
  onToggle,
}: {
  tag: SalonTag;
  active: boolean;
  onToggle: () => void;
}) {
  const style = tagStyleMap[tag];
  const Icon = style.icon;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.3,
        flexShrink: 0,
      }}
    >
      <Box
        component="button"
        onClick={onToggle}
        aria-label={tagLabels[tag]}
        title={tagLabels[tag]}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 38,
          height: 38,
          border: "1.5px solid",
          borderColor: active ? style.color : "rgba(28,36,33,0.09)",
          borderRadius: "50%",
          bgcolor: active ? style.bg : "#FFFFFF",
          color: active ? style.color : "text.secondary",
          cursor: "pointer",
          transition: "all 0.14s",
          outline: "none",
          p: 0,
          "&:hover": {
            borderColor: style.color,
            bgcolor: style.bg,
            color: style.color,
            transform: "scale(1.08)",
          },
          "&:focus-visible": {
            outline: `2px solid ${style.color}`,
            outlineOffset: 2,
          },
        }}
      >
        <Icon sx={{ fontSize: 18 }} />
      </Box>
      <Typography
        sx={{
          fontSize: "0.6rem",
          fontWeight: 700,
          color: active ? style.color : "text.disabled",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {tagLabels[tag].slice(0, 4)}
      </Typography>
    </Box>
  );
}

// ─── info badge ───────────────────────────────────────────────────────────────

function InfoBadge({
  icon,
  label,
  highlight = false,
  highlightColor,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
  highlightColor?: string;
  muted?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.4,
        px: 1,
        py: 0.4,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: highlight && highlightColor
          ? alpha(highlightColor, 0.25)
          : "#EBEBEB",
        bgcolor: highlight && highlightColor
          ? alpha(highlightColor, 0.08)
          : "transparent",
        color: highlight && highlightColor
          ? highlightColor
          : muted
          ? "text.disabled"
          : "text.secondary",
        maxWidth: 180,
        minWidth: 0,
        flexShrink: 1,
      }}
    >
      <Box sx={{ display: "flex", flexShrink: 0, color: "inherit" }}>{icon}</Box>
      <Typography
        component="span"
        sx={{
          fontSize: "0.69rem",
          fontWeight: 700,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          lineHeight: 1.3,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function SalonDirectory({ featuredTags, salons }: SalonDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("전체");
  const [selectedTags, setSelectedTags] = useState<SalonTag[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("추천순");

  const areas = useMemo(
    () => ["전체", ...Array.from(new Set(salons.map((s) => s.area)))],
    [salons]
  );

  const naverCount = useMemo(
    () => salons.filter((s) => s.tags.includes("네이버예약")).length,
    [salons]
  );
  const parkingCount = useMemo(
    () => salons.filter((s) => s.tags.includes("주차")).length,
    [salons]
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSalons = useMemo(() => {
    const matched = salons.filter((salon) => {
      const matchesArea = selectedArea === "전체" || salon.area === selectedArea;
      const matchesTags = selectedTags.every((tag) => salon.tags.includes(tag));
      const searchableText = [
        salon.name, salon.area, salon.address, salon.summary,
        salon.recommendedFor, salon.priceSummary,
        salon.specialties.join(" "),
        salon.tags.map((tag) => tagLabels[tag]).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      return matchesArea && matchesTags && matchesQuery;
    });

    return matched.sort((a, b) => {
      if (sortKey === "이름순")
        return a.name.localeCompare(b.name, "ko");
      if (sortKey === "예약우선")
        return (
          Number(knownReservation(b.reservation)) -
          Number(knownReservation(a.reservation))
        );
      if (sortKey === "주차우선")
        return (
          Number(knownParking(b.parking)) - Number(knownParking(a.parking))
        );
      if (sortKey === "가격순")
        return getPriceFloor(a.priceSummary) - getPriceFloor(b.priceSummary);
      return scoreSalon(b) - scoreSalon(a);
    });
  }, [normalizedQuery, salons, selectedArea, selectedTags, sortKey]);

  const activeFilterCount =
    selectedTags.length +
    (selectedArea === "전체" ? 0 : 1) +
    (normalizedQuery ? 1 : 0);

  const toggleTag = (tag: SalonTag) =>
    setSelectedTags((cur) =>
      cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]
    );

  const resetFilters = () => {
    setQuery("");
    setSelectedArea("전체");
    setSelectedTags([]);
    setSortKey("추천순");
  };

  return (
    <Box component="section" sx={{ py: { xs: 2, md: 3 } }}>
      <Box className="shell" sx={{ display: "grid", gap: 2.5, pb: 5 }}>

        {/* ── Hero (Samsung Life style) ─────────────────────────────────── */}
        <Box
          sx={{
            borderRadius: 5,
            border: "1px solid #EBEBEB",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 280px" },
            alignItems: "stretch",
          }}
        >
          {/* Left: text + stats */}
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Chip
              label="나주혁신도시 · 빛가람동"
              size="small"
              sx={{
                mb: 2,
                bgcolor: "rgba(255,107,107,0.10)",
                color: "#FF6B6B",
                border: "none",
                fontWeight: 700,
                fontSize: "0.72rem",
                height: 26,
                borderRadius: 999,
              }}
            />
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "1.75rem", sm: "2.1rem", md: "2.4rem" },
                fontWeight: 900,
                lineHeight: 1.18,
                letterSpacing: "-0.03em",
                mb: 1.25,
                color: "#1C1C1E",
              }}
            >
              가장 가까운 미용실
              <br />
              한눈에 비교하기
            </Typography>
            <Typography
              sx={{ mb: 3, fontSize: "0.94rem", lineHeight: 1.72, color: "#6B7280" }}
            >
              지역 살롱 정보를 직접 발품 팔아 모았어요.
              <br />
              네이버 예약, 주차 정보까지 한 번에 확인하세요.
            </Typography>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>
              {[
                { label: "등록 살롱", value: `${salons.length}곳` },
                { label: "네이버 예약", value: `${naverCount}곳` },
                { label: "주차 가능", value: `${parkingCount}곳` },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 3,
                    background: "#F8F8F8",
                    border: "1px solid #EBEBEB",
                    textAlign: "center",
                    minWidth: 76,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.45rem",
                      fontWeight: 900,
                      color: "#FF6B6B",
                      lineHeight: 1,
                      mb: 0.4,
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right: SVG illustration */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              background: "linear-gradient(135deg, #FFF5F4 0%, #FFFAF9 100%)",
              borderLeft: "1px solid #EBEBEB",
            }}
          >
            <SalonIllustration />
          </Box>
        </Box>

        {/* ── Filter panel + results grid ──────────────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", lg: "264px minmax(0, 1fr)" },
            alignItems: "start",
          }}
        >
          {/* ── Filter panel ─────────────────────────────────────────── */}
          <Paper
            sx={{
              p: 2.25,
              borderRadius: 4,
              position: { lg: "sticky" },
              top: { lg: 68 },
              background: "#FFFFFF",
              border: "1px solid #EBEBEB",
              boxShadow: "none",
            }}
          >
            <Stack spacing={2}>
              {/* Search */}
              <TextField
                fullWidth
                size="small"
                placeholder="상호명, 도로명, 태그 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    background: "#F8F8F8",
                    "& fieldset": { borderColor: "#E5E5E5" },
                    "&:hover fieldset": { borderColor: "#CCCCCC" },
                    "&.Mui-focused fieldset": { borderColor: "#FF6B6B" },
                  },
                }}
              />

              {/* 권역 */}
              <Stack spacing={0.75}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: "0.05em" }}
                >
                  권역
                </Typography>
                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                  {areas.map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      size="small"
                      clickable
                      onClick={() => setSelectedArea(area)}
                      sx={{
                        fontSize: "0.69rem",
                        height: 26,
                        borderRadius: 999,
                        fontWeight: 700,
                        border: "none",
                        bgcolor:
                          selectedArea === area ? "#1C1C1E" : "#F2F2F2",
                        color: selectedArea === area ? "#FFFFFF" : "#555",
                        "&:hover": {
                          bgcolor:
                            selectedArea === area ? "#1C1C1E" : "#E8E8E8",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Stack>

              {/* 정렬 */}
              <Stack spacing={0.75}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: "0.05em" }}
                >
                  정렬
                </Typography>
                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                  {sortOptions.map((opt) => (
                    <Chip
                      key={opt}
                      label={opt}
                      size="small"
                      clickable
                      onClick={() => setSortKey(opt)}
                      sx={{
                        fontSize: "0.69rem",
                        height: 26,
                        borderRadius: 999,
                        fontWeight: 700,
                        border: "none",
                        bgcolor:
                          sortKey === opt ? "#FF6B6B" : "#F2F2F2",
                        color: sortKey === opt ? "#FFFFFF" : "#555",
                        "&:hover": {
                          bgcolor: sortKey === opt ? "#E53E3E" : "#E8E8E8",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Stack>

              {/* 빠른 조건 */}
              <Stack spacing={0.75}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: "0.05em" }}
                >
                  빠른 조건
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {featuredTags.map((tag) => (
                    <TagFilterButton
                      key={tag}
                      tag={tag}
                      active={selectedTags.includes(tag)}
                      onToggle={() => toggleTag(tag)}
                    />
                  ))}
                </Box>
              </Stack>

              {/* 필터 상태 요약 */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: "#F8F8F8",
                  border: "1px solid #EBEBEB",
                }}
              >
                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                  <Chip
                    size="small"
                    label={`${filteredSalons.length}곳`}
                    sx={{
                      height: 22,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      bgcolor: "#1C1C1E",
                      color: "#FFFFFF",
                      border: "none",
                    }}
                  />
                  {activeFilterCount > 0 && (
                    <Chip
                      size="small"
                      label={`필터 ${activeFilterCount}개`}
                      sx={{
                        height: 22,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        bgcolor: "rgba(255,107,107,0.10)",
                        color: "#FF6B6B",
                        border: "none",
                      }}
                    />
                  )}
                </Stack>

                {activeFilterCount > 0 && (
                  <>
                    <Stack
                      direction="row"
                      spacing={0.75}
                      flexWrap="wrap"
                      useFlexGap
                      sx={{ mt: 1 }}
                    >
                      {selectedArea !== "전체" && (
                        <Chip
                          size="small"
                          label={selectedArea}
                          onDelete={() => setSelectedArea("전체")}
                          sx={{ height: 22, fontSize: "0.67rem" }}
                        />
                      )}
                      {selectedTags.map((tag) => (
                        <Chip
                          key={tag}
                          size="small"
                          label={tagLabels[tag]}
                          onDelete={() => toggleTag(tag)}
                          sx={{ height: 22, fontSize: "0.67rem" }}
                        />
                      ))}
                      {normalizedQuery && (
                        <Chip
                          size="small"
                          label={query}
                          onDelete={() => setQuery("")}
                          sx={{ height: 22, fontSize: "0.67rem" }}
                        />
                      )}
                    </Stack>
                    <Button
                      variant="text"
                      color="inherit"
                      size="small"
                      startIcon={
                        <RestartAltRounded sx={{ fontSize: "14px !important" }} />
                      }
                      onClick={resetFilters}
                      sx={{
                        mt: 1,
                        fontSize: "0.72rem",
                        color: "text.secondary",
                        pl: 0,
                        minHeight: 28,
                      }}
                    >
                      필터 초기화
                    </Button>
                  </>
                )}
              </Box>
            </Stack>
          </Paper>

          {/* ── Results ──────────────────────────────────────────────── */}
          <Stack spacing={1.75}>
            {/* Count bar */}
            <Box
              sx={{
                px: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontSize: "0.88rem", color: "#6B7280", fontWeight: 600 }}
              >
                <Box
                  component="span"
                  sx={{ fontWeight: 900, color: "#1C1C1E", mr: 0.5 }}
                >
                  {filteredSalons.length}개
                </Box>
                의 살롱
              </Typography>
              <Chip
                label="2026-04-22 기준"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.67rem",
                  height: 22,
                  borderColor: "#E8E8E8",
                  color: "#AAAAAA",
                }}
              />
            </Box>

            {/* Empty state */}
            {filteredSalons.length === 0 ? (
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  border: "1px solid #EBEBEB",
                  boxShadow: "none",
                }}
              >
                <Typography sx={{ fontSize: "2.2rem", mb: 1.5 }}>🔍</Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontWeight: 500, lineHeight: 1.7 }}
                >
                  결과가 없어요.
                  <br />
                  권역·태그 조합을 바꾸거나 검색어를 줄여보세요.
                </Typography>
              </Paper>
            ) : (
              /* Card grid */
              <Box
                sx={{
                  display: "grid",
                  gap: 1.75,
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                    xxl: "repeat(3, minmax(0, 1fr))",
                  },
                }}
              >
                {filteredSalons.map((salon) => {
                  const areaColor = areaColorMap[salon.area] ?? "#888";
                  const hasNaver = salon.tags.includes("네이버예약");
                  const hasParking = knownParking(salon.parking);
                  const score = scoreSalon(salon);

                  return (
                    <Card
                      key={salon.id}
                      sx={{
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: "16px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        border: "1px solid #F0F0F0",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
                          transform: "translateY(-2px)",
                          borderColor: "rgba(255,107,107,0.22)",
                        },
                      }}
                    >
                      {/* Accent bar — 데이터 풍부도 */}
                      <Box
                        sx={{
                          height: 3,
                          background:
                            salon.tags.length >= 3
                              ? "linear-gradient(90deg, #FF6B6B, #FF9A9A)"
                              : salon.tags.length >= 1
                              ? "linear-gradient(90deg, #F59E0B, #FCD34D)"
                              : "#F0F0F0",
                        }}
                      />

                      <CardContent
                        sx={{
                          p: 2.25,
                          display: "grid",
                          gap: 1.5,
                          "&:last-child": { pb: 2.25 },
                        }}
                      >
                        {/* Header: avatar + name + area + score */}
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Avatar
                            sx={{
                              width: 44,
                              height: 44,
                              bgcolor: alpha(areaColor, 0.12),
                              border: `2px solid ${areaColor}`,
                              color: areaColor,
                              fontSize: "1.25rem",
                              flexShrink: 0,
                            }}
                          >
                            ✂️
                          </Avatar>
                          <Box flex={1} minWidth={0}>
                            <Typography
                              sx={{
                                fontWeight: 800,
                                fontSize: "0.97rem",
                                lineHeight: 1.2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                color: "#1C1C1E",
                              }}
                            >
                              {salon.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontWeight: 600 }}
                            >
                              {salon.area}
                            </Typography>
                          </Box>
                          <Chip
                            size="small"
                            icon={
                              <StarRounded
                                sx={{
                                  fontSize: "11px !important",
                                  ml: "4px !important",
                                }}
                              />
                            }
                            label={score}
                            sx={{
                              height: 22,
                              fontSize: "0.67rem",
                              bgcolor: "rgba(245,158,11,0.10)",
                              color: "#B45309",
                              border: "none",
                              fontWeight: 800,
                              flexShrink: 0,
                            }}
                          />
                        </Stack>

                        {/* Summary — 2-line clamp */}
                        <Typography
                          sx={{
                            fontSize: "0.83rem",
                            color: "#555",
                            lineHeight: 1.65,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {salon.summary}
                        </Typography>

                        {/* Tag pills (Samsung Life #hashtag style) */}
                        {salon.tags.length > 0 && (
                          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                            {salon.tags.slice(0, 4).map((tag) => (
                              <TagPill key={tag} tag={tag} />
                            ))}
                          </Box>
                        )}

                        {/* Info badges */}
                        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                          {knownPrice(salon.priceSummary) && (
                            <InfoBadge
                              icon={<AttachMoneyRounded sx={{ fontSize: 12 }} />}
                              label={salon.priceSummary}
                            />
                          )}
                          <InfoBadge
                            icon={<LocalParkingRounded sx={{ fontSize: 12 }} />}
                            label={
                              hasParking ? salon.parking : "주차 미확인"
                            }
                            highlight={hasParking}
                            highlightColor="#F59E0B"
                            muted={!hasParking}
                          />
                          <InfoBadge
                            icon={<EventAvailableRounded sx={{ fontSize: 12 }} />}
                            label={
                              knownReservation(salon.reservation)
                                ? salon.reservation
                                : "예약 미확인"
                            }
                            highlight={knownReservation(salon.reservation)}
                            highlightColor="#22C55E"
                            muted={!knownReservation(salon.reservation)}
                          />
                        </Box>

                        {/* CTA buttons */}
                        <Stack direction="row" spacing={1}>
                          <Button
                            component={Link}
                            href={`/salons/${salon.slug}`}
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{
                              minHeight: 38,
                              fontSize: "0.78rem",
                              borderRadius: 2,
                              borderColor: "#E5E5E5",
                              color: "#444",
                              "&:hover": {
                                borderColor: "#CCCCCC",
                                bgcolor: "#F8F8F8",
                              },
                            }}
                          >
                            자세히 보기
                          </Button>
                          <Button
                            component="a"
                            href={salon.reservationUrl}
                            target="_blank"
                            rel="noreferrer"
                            fullWidth
                            variant="contained"
                            size="small"
                            endIcon={
                              <ArrowOutwardRounded
                                sx={{
                                  fontSize: "12px !important",
                                  color: "#fff",
                                }}
                              />
                            }
                            sx={{
                              minHeight: 38,
                              fontSize: "0.78rem",
                              borderRadius: 2,
                              background:
                                "linear-gradient(135deg, #FF6B6B 0%, #FF4444 100%)",
                              boxShadow: "none",
                              "&:hover": {
                                boxShadow:
                                  "0 4px 14px rgba(255,107,107,0.38)",
                                transform: "translateY(-1px)",
                              },
                              transition: "all 0.2s",
                            }}
                          >
                            예약
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
