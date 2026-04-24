"use client";

import Link from "next/link";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import AttachMoneyRounded from "@mui/icons-material/AttachMoneyRounded";
import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import LocalParkingRounded from "@mui/icons-material/LocalParkingRounded";
import ManRounded from "@mui/icons-material/ManRounded";
import RestartAltRounded from "@mui/icons-material/RestartAltRounded";
import SortByAlphaRounded from "@mui/icons-material/SortByAlphaRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import { tagStyleMap, TagIconBadge } from "@/components/tag-badge";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import Stack from "@/components/ui-stack";
import { useMemo, useState } from "react";
import { tagLabels, type Salon, type SalonTag } from "@/data/salons";

type SalonDirectoryProps = {
  featuredTags: SalonTag[];
  salons: Salon[];
};

type SortKey = "추천순" | "이름순" | "가격순" | "예약우선" | "주차우선" | "좋아요순";

const sortOptions: SortKey[] = ["추천순", "가격순", "예약우선", "주차우선", "좋아요순", "이름순"];

const sortIconMap: Record<SortKey, React.ElementType> = {
  추천순: StarRounded,
  이름순: SortByAlphaRounded,
  가격순: AttachMoneyRounded,
  예약우선: EventAvailableRounded,
  주차우선: LocalParkingRounded,
  좋아요순: FavoriteRounded,
};

const knownReservation = (v: string) => !v.includes("확인 필요") && !v.includes("공개");
const knownParking = (v: string) => v.includes("가능");
const knownPrice = (v: string) => !v.includes("확인 필요") && !v.includes("추후");

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

function InfoBadge({
  icon,
  label,
  active = false,
  activeColor,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  activeColor?: string;
  muted?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1,
        py: 0.4,
        borderRadius: "4px",
        bgcolor: active && activeColor ? activeColor : "#FFFFFF",
        border: "1px solid",
        borderColor: active && activeColor ? activeColor : "rgba(15,23,42,0.08)",
        color: active && activeColor ? "#FFFFFF" : muted ? "text.disabled" : "text.secondary",
        maxWidth: 160,
        minWidth: 0,
        flexShrink: 1,
      }}
    >
      <Box sx={{ display: "flex", flexShrink: 0, color: "inherit" }}>{icon}</Box>
      <Typography
        component="span"
        sx={{
          fontSize: "0.71rem",
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
    <Tooltip title={tagLabels[tag]} placement="top" arrow>
      <Box
        component="button"
        onClick={onToggle}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          border: "1.5px solid",
          borderColor: active ? style.color : "rgba(28,36,33,0.09)",
          borderRadius: "50%",
          bgcolor: active ? style.bg : "rgba(255,255,255,0.72)",
          color: active ? style.color : "text.secondary",
          cursor: "pointer",
          transition: "all 0.14s",
          outline: "none",
          p: 0,
          flexShrink: 0,
          "&:hover": {
            borderColor: style.color,
            bgcolor: style.bg,
            color: style.color,
            transform: "scale(1.1)",
          },
          "&:focus-visible": {
            outline: `2px solid ${style.color}`,
            outlineOffset: 2,
          },
        }}
      >
        <Icon sx={{ fontSize: 18 }} />
      </Box>
    </Tooltip>
  );
}

export default function SalonDirectory({ featuredTags, salons }: SalonDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("전체");
  const [selectedTags, setSelectedTags] = useState<SalonTag[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("추천순");

  const areas = useMemo(
    () => ["전체", ...Array.from(new Set(salons.map((s) => s.area)))],
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
      ].join(" ").toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      return matchesArea && matchesTags && matchesQuery;
    });

    return matched.sort((a, b) => {
      if (sortKey === "이름순") return a.name.localeCompare(b.name, "ko");
      if (sortKey === "예약우선") return Number(knownReservation(b.reservation)) - Number(knownReservation(a.reservation));
      if (sortKey === "주차우선") return Number(knownParking(b.parking)) - Number(knownParking(a.parking));
      if (sortKey === "가격순") return getPriceFloor(a.priceSummary) - getPriceFloor(b.priceSummary);
      if (sortKey === "좋아요순") return (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0);
      return scoreSalon(b) - scoreSalon(a);
    });
  }, [normalizedQuery, salons, selectedArea, selectedTags, sortKey]);

  const activeFilterCount =
    selectedTags.length + (selectedArea === "전체" ? 0 : 1) + (normalizedQuery ? 1 : 0);

  const toggleTag = (tag: SalonTag) =>
    setSelectedTags((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]));

  const resetFilters = () => {
    setQuery("");
    setSelectedArea("전체");
    setSelectedTags([]);
    setSortKey("추천순");
  };

  return (
    <Box component="section" sx={{ py: { xs: 2, md: 3 } }}>
      <Box className="shell" sx={{ display: "grid", gap: 2.5, pb: 5 }}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", xl: "290px minmax(0, 1fr)" },
            alignItems: "start",
          }}
        >
          {/* ── Filter panel ── */}
          <Paper sx={{ p: 2, borderRadius: 4, position: { xl: "sticky" }, top: { xl: 88 } }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="상호명, 도로명, 태그 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* 권역 */}
              <Stack spacing={0.75}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: "0.05em" }}>
                  권역
                </Typography>
                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                  {areas.map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      size="small"
                      clickable
                      color={selectedArea === area ? "primary" : "default"}
                      variant={selectedArea === area ? "filled" : "outlined"}
                      onClick={() => setSelectedArea(area)}
                      sx={{ fontSize: "0.69rem", height: 24 }}
                    />
                  ))}
                </Box>
              </Stack>

              {/* 정렬 */}
              <Stack spacing={0.75}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: "0.05em" }}>
                  정렬
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  value={sortKey}
                  onChange={(_, v: SortKey | null) => v && setSortKey(v)}
                  sx={{ flexWrap: "wrap", gap: 0.75 }}
                >
                  {sortOptions.map((opt) => {
                    const Icon = sortIconMap[opt];
                    return (
                      <ToggleButton key={opt} value={opt} sx={{ gap: 0.5, py: 0.5, px: 1.1, fontSize: "0.71rem" }}>
                        <Icon sx={{ fontSize: 13 }} />
                        {opt}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </Stack>

              {/* 빠른 조건 — 아이콘 버튼 */}
              <Stack spacing={0.75}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: "0.05em" }}>
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

              {/* 상태 요약 */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: "rgba(37,99,235,0.04)",
                  border: "1px solid",
                  borderColor: "rgba(37,99,235,0.1)",
                  display: "grid",
                  gap: 1,
                }}
              >
                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                  <Chip size="small" label={`${filteredSalons.length}곳`} color="primary" />
                  {activeFilterCount > 0 && (
                    <Chip size="small" label={`필터 ${activeFilterCount}개`} variant="outlined" />
                  )}
                </Stack>

                {activeFilterCount > 0 && (
                  <>
                    <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                      {selectedArea !== "전체" && (
                        <Chip size="small" label={selectedArea} onDelete={() => setSelectedArea("전체")} />
                      )}
                      {selectedTags.map((tag) => (
                        <Chip key={tag} size="small" label={tagLabels[tag]} onDelete={() => toggleTag(tag)} />
                      ))}
                      {normalizedQuery && (
                        <Chip size="small" label={query} onDelete={() => setQuery("")} />
                      )}
                    </Stack>

                    <Button
                      variant="outlined"
                      color="inherit"
                      size="small"
                      startIcon={<RestartAltRounded sx={{ fontSize: "15px !important" }} />}
                      onClick={resetFilters}
                      sx={{ fontSize: "0.75rem" }}
                    >
                      초기화
                    </Button>
                  </>
                )}
              </Box>
            </Stack>
          </Paper>

          {/* ── Results ── */}
          <Stack spacing={1.75}>
            <Paper
              sx={{
                px: 2,
                py: 1.1,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                {filteredSalons.length}곳
              </Typography>
              <Chip label="2026-04-22 기준" size="small" variant="outlined" sx={{ fontSize: "0.68rem", height: 22 }} />
            </Paper>

            {filteredSalons.length === 0 ? (
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography color="text.secondary">
                  결과 없음. 권역·태그 조합을 바꾸거나 검색어를 줄여보세요.
                </Typography>
              </Paper>
            ) : (
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
                {filteredSalons.map((salon) => (
                  <Card key={salon.id} sx={{ height: "100%" }}>
                    <CardContent sx={{ p: 2, display: "grid", gap: 1.5, "&:last-child": { pb: 2 } }}>

                      {/* 헤더: 권역 + 점수 + 좋아요 */}
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <Chip
                          size="small"
                          label={salon.area}
                          variant="outlined"
                          sx={{ fontSize: "0.67rem", height: 22, maxWidth: 120 }}
                        />
                        <Chip
                          size="small"
                          icon={<StarRounded sx={{ fontSize: "11px !important", ml: "4px !important" }} />}
                          label={scoreSalon(salon)}
                          sx={{
                            height: 22,
                            fontSize: "0.67rem",
                            bgcolor: "rgba(245,158,11,0.1)",
                            border: "none",
                            color: "secondary.dark",
                            fontWeight: 800,
                          }}
                        />
                        <Box sx={{ flex: 1 }} />
                        <Tooltip title="좋아요">
                          <IconButton
                            size="small"
                            sx={{ width: 26, height: 26, color: alpha("#ef4444", 0.6) }}
                          >
                            <FavoriteBorderRounded sx={{ fontSize: 15 }} />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      {/* 상호명 */}
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em" }}
                      >
                        {salon.name}
                      </Typography>

                      {/* 태그 아이콘 배지 */}
                      {salon.tags.length > 0 ? (
                        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                          {salon.tags.map((tag) => (
                            <TagIconBadge key={tag} tag={tag} size={28} />
                          ))}
                        </Box>
                      ) : (
                        <Box />
                      )}

                      {/* 핵심 정보 배지 */}
                      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                        <InfoBadge
                          icon={<AttachMoneyRounded sx={{ fontSize: 13 }} />}
                          label={salon.priceSummary}
                          muted={!knownPrice(salon.priceSummary)}
                        />
                        <InfoBadge
                          icon={<LocalParkingRounded sx={{ fontSize: 13 }} />}
                          label={salon.parking}
                          active={knownParking(salon.parking)}
                          activeColor="#F59E0B"
                        />
                        <InfoBadge
                          icon={<EventAvailableRounded sx={{ fontSize: 13 }} />}
                          label={salon.reservation}
                          active={knownReservation(salon.reservation)}
                          activeColor="#22C55E"
                        />
                      </Box>

                      {/* 액션 버튼 */}
                      <Stack direction="row" spacing={1}>
                        <Button
                          component={Link}
                          href={`/salons/${salon.slug}`}
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{ minHeight: 36, fontSize: "0.78rem" }}
                        >
                          상세
                        </Button>
                        <Button
                          component="a"
                          href={salon.reservationUrl}
                          target="_blank"
                          rel="noreferrer"
                          fullWidth
                          variant="contained"
                          size="small"
                          endIcon={<ArrowOutwardRounded sx={{ fontSize: "12px !important", color: "#fff" }} />}
                          sx={{ minHeight: 36, fontSize: "0.78rem", color: "#fff !important" }}
                        >
                          예약
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
