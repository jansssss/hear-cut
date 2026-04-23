"use client";

import Link from "next/link";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import DirectionsCarRounded from "@mui/icons-material/DirectionsCarRounded";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import FlashOnRounded from "@mui/icons-material/FlashOnRounded";
import LocalOfferRounded from "@mui/icons-material/LocalOfferRounded";
import SortRounded from "@mui/icons-material/SortRounded";
import SpaRounded from "@mui/icons-material/SpaRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import {
  alpha,
  Avatar,
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
  Typography
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

const knownReservation = (reservation: string) =>
  !reservation.includes("확인 필요") && !reservation.includes("공개");

const knownParking = (parking: string) => parking.includes("가능");

const knownPrice = (price: string) => !price.includes("확인 필요") && !price.includes("추후");

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

const tagColorMap: Partial<Record<SalonTag, "primary" | "secondary" | "success" | "warning">> = {
  주차: "warning",
  네이버예약: "success",
  "1인샵": "secondary"
};

export default function SalonDirectory({ featuredTags, salons }: SalonDirectoryProps) {
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

      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      return matchesArea && matchesTags && matchesQuery;
    });

    return matched.sort((left, right) => {
      if (sortKey === "이름순") return left.name.localeCompare(right.name, "ko");
      if (sortKey === "예약우선")
        return Number(knownReservation(right.reservation)) - Number(knownReservation(left.reservation));
      if (sortKey === "주차우선")
        return Number(knownParking(right.parking)) - Number(knownParking(left.parking));
      if (sortKey === "가격순") return getPriceFloor(left.priceSummary) - getPriceFloor(right.priceSummary);
      if (sortKey === "좋아요순") return (right.favoriteCount ?? 0) - (left.favoriteCount ?? 0);
      return scoreSalon(right) - scoreSalon(left);
    });
  }, [normalizedQuery, salons, selectedArea, selectedTags, sortKey]);

  const activeFilterCount =
    selectedTags.length + (selectedArea === "전체" ? 0 : 1) + (normalizedQuery ? 1 : 0);

  const toggleTag = (tag: SalonTag) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((entry) => entry !== tag) : [...current, tag]
    );
  };

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
            gridTemplateColumns: { xs: "1fr", xl: "320px minmax(0, 1fr)" },
            alignItems: "start"
          }}
        >
          <Paper
            sx={{
              p: 2,
              borderRadius: 4,
              position: { xl: "sticky" },
              top: { xl: 92 }
            }}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                placeholder="상호명, 도로명, 태그 검색"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  권역
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {areas.map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      clickable
                      color={selectedArea === area ? "primary" : "default"}
                      variant={selectedArea === area ? "filled" : "outlined"}
                      onClick={() => setSelectedArea(area)}
                    />
                  ))}
                </Box>
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  정렬
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  value={sortKey}
                  onChange={(_, value: SortKey | null) => value && setSortKey(value)}
                  sx={{ flexWrap: "wrap", gap: 1 }}
                >
                  {sortOptions.map((option) => (
                    <ToggleButton key={option} value={option}>
                      {option}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  빠른 조건
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {featuredTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <Chip
                        key={tag}
                        label={tagLabels[tag]}
                        clickable
                        onClick={() => toggleTag(tag)}
                        color={active ? tagColorMap[tag] ?? "primary" : "default"}
                        variant={active ? "filled" : "outlined"}
                        sx={!active ? { bgcolor: "rgba(255,255,255,0.68)" } : undefined}
                      />
                    );
                  })}
                </Box>
              </Stack>

              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: alpha("#14766b", 0.04),
                  display: "grid",
                  gap: 1.25
                }}
              >
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip size="small" label={`${filteredSalons.length}곳`} color="primary" />
                  <Chip size="small" label={`필터 ${activeFilterCount}개`} variant="outlined" />
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {selectedArea !== "전체" ? (
                    <Chip size="small" label={`권역 ${selectedArea}`} onDelete={() => setSelectedArea("전체")} />
                  ) : null}
                  {selectedTags.map((tag) => (
                    <Chip
                      key={tag}
                      size="small"
                      label={tagLabels[tag]}
                      onDelete={() => toggleTag(tag)}
                    />
                  ))}
                  {normalizedQuery ? <Chip size="small" label={query} onDelete={() => setQuery("")} /> : null}
                </Stack>

                <Button variant="outlined" color="inherit" startIcon={<SortRounded />} onClick={resetFilters}>
                  필터 초기화
                </Button>
              </Paper>
            </Stack>
          </Paper>

          <Stack spacing={2}>
            <Paper
              sx={{
                p: 1.5,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                flexWrap: "wrap"
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ bgcolor: alpha("#2c6c66", 0.1), color: "primary.main", width: 38, height: 38 }}>
                  <LocalOfferRounded />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    한눈에 비교
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    배지와 핵심 칩만 먼저 보이게 정리
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label={`${filteredSalons.length}곳 표시`} color="primary" />
                <Chip label="2026-04-22 기준" variant="outlined" />
              </Stack>
            </Paper>

            {filteredSalons.length === 0 ? (
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography color="text.secondary">
                  결과가 없다. 권역과 태그 조합을 바꾸거나 검색어를 줄이는 편이 빠르다.
                </Typography>
              </Paper>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                    xxl: "repeat(3, minmax(0, 1fr))"
                  }
                }}
              >
                {filteredSalons.map((salon) => (
                  <Card key={salon.id} sx={{ height: "100%" }}>
                    <CardContent sx={{ p: 2.25, display: "grid", gap: 2 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1.5}>
                        <Stack spacing={1} minWidth={0}>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip
                              size="small"
                              label={salon.area}
                              variant="outlined"
                            />
                            <Chip
                              size="small"
                              label={`점수 ${scoreSalon(salon)}`}
                              variant="outlined"
                              sx={{
                                bgcolor: "rgba(182,122,97,0.12)",
                                borderColor: "rgba(182,122,97,0.18)",
                                color: "secondary.dark"
                              }}
                            />
                          </Stack>
                        <Typography variant="h5">{salon.name}</Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical"
                          }}
                        >
                          {salon.summary}
                        </Typography>
                        </Stack>

                        <Tooltip title="좋아요">
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: alpha("#ef4444", 0.08),
                              color: "#d53f3f",
                              border: "1px solid rgba(239,68,68,0.12)"
                            }}
                          >
                            <FavoriteBorderRounded fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {salon.tags.slice(0, 5).map((tag) => (
                          <Chip
                            key={tag}
                            size="small"
                            label={tagLabels[tag]}
                            color={tagColorMap[tag] ?? "default"}
                            variant="outlined"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.72)",
                              borderColor: "rgba(28,36,33,0.09)"
                            }}
                          />
                        ))}
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip
                          icon={<FlashOnRounded />}
                          label={salon.priceSummary}
                          variant="outlined"
                          sx={{ maxWidth: "100%", bgcolor: "rgba(255,255,255,0.72)" }}
                        />
                        <Chip
                          icon={<CalendarMonthRounded />}
                          label={salon.reservation}
                          variant="outlined"
                          sx={{ maxWidth: "100%", bgcolor: "rgba(255,255,255,0.72)" }}
                        />
                        <Chip
                          icon={<DirectionsCarRounded />}
                          label={salon.parking}
                          variant="outlined"
                          color={knownParking(salon.parking) ? "warning" : "default"}
                          sx={{ maxWidth: "100%", bgcolor: "rgba(255,255,255,0.72)" }}
                        />
                        <Chip
                          icon={<SpaRounded />}
                          label={salon.specialties[0] ?? "강점 확인"}
                          variant="outlined"
                          sx={{ maxWidth: "100%", bgcolor: "rgba(255,255,255,0.72)" }}
                        />
                      </Box>

                      <Stack spacing={1.25}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <Chip
                            size="small"
                            label={salon.sourceLabel}
                            variant="outlined"
                            sx={{ bgcolor: "rgba(255,255,255,0.72)" }}
                          />
                          <Chip
                            size="small"
                            label={`확인 ${salon.lastCheckedAt}`}
                            variant="outlined"
                            sx={{ bgcolor: "rgba(255,255,255,0.72)" }}
                          />
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                          <Button component={Link} href={`/salons/${salon.slug}`} fullWidth variant="outlined">
                            상세 보기
                          </Button>
                          <Button
                            component="a"
                            href={salon.reservationUrl}
                            target="_blank"
                            rel="noreferrer"
                            fullWidth
                            variant="contained"
                            endIcon={<ArrowOutwardRounded />}
                          >
                            예약 이동
                          </Button>
                        </Stack>
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
