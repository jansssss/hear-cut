"use client";

import Link from "next/link";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import DirectionsCarRounded from "@mui/icons-material/DirectionsCarRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import SpaRounded from "@mui/icons-material/SpaRounded";
import StorefrontRounded from "@mui/icons-material/StorefrontRounded";
import { Avatar, Box, Button, Chip, Paper, Typography } from "@mui/material";
import KakaoMapPanel from "@/components/kakao-map-panel";
import { TagPill } from "@/components/tag-badge";
import Stack from "@/components/ui-stack";
import { type Salon } from "@/data/salons";

function DetailMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Paper sx={{ p: 1.5, borderRadius: 3, bgcolor: "rgba(255,255,255,0.72)" }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
        <Avatar sx={{ width: 28, height: 28, bgcolor: "rgba(37,99,235,0.08)", color: "primary.main" }}>
          {icon}
        </Avatar>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: "0.03em" }}>
          {label}
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        sx={{ fontWeight: 700, lineHeight: 1.55, pl: 0.25 }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

export default function SalonDetailView({ salon }: { salon: Salon }) {
  return (
    <Box component="main" sx={{ py: { xs: 2, md: 3 }, pb: 7 }}>
      <Box className="shell" sx={{ display: "grid", gap: 2 }}>

        {/* 상단 내비 */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Button component={Link} href="/" variant="text" color="inherit" size="small" sx={{ fontWeight: 700 }}>
            ← 목록
          </Button>
          <Chip label={salon.sourceLabel} size="small" variant="outlined" />
        </Stack>

        {/* 메인 카드 */}
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 5 }}>
          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(340px, 0.9fr)" },
            }}
          >
            <Stack spacing={2}>
              {/* 권역 + 이름 */}
              <Stack spacing={1}>
                <Chip label={salon.area} color="primary" size="small" sx={{ alignSelf: "flex-start" }} />
                <Typography
                  variant="h1"
                  sx={{ fontSize: { xs: "2.1rem", md: "3.2rem" }, lineHeight: 0.95 }}
                >
                  {salon.name}
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 580, lineHeight: 1.75, fontSize: "0.95rem" }}>
                  {salon.summary}
                </Typography>
              </Stack>

              {/* 태그 pill (아이콘 + 라벨) */}
              {salon.tags.length > 0 && (
                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                  {salon.tags.map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </Box>
              )}

              {/* 핵심 메트릭 그리드 */}
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                }}
              >
                <DetailMetric icon={<StorefrontRounded sx={{ fontSize: 16 }} />} label="가격대" value={salon.priceSummary} />
                <DetailMetric icon={<CalendarMonthRounded sx={{ fontSize: 16 }} />} label="예약 방식" value={salon.reservation} />
                <DetailMetric icon={<DirectionsCarRounded sx={{ fontSize: 16 }} />} label="주차" value={salon.parking} />
                <DetailMetric icon={<SpaRounded sx={{ fontSize: 16 }} />} label="대표 강점" value={salon.specialties.join(", ")} />
              </Box>

              {/* CTA */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Button
                  component="a"
                  href={salon.reservationUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  endIcon={<ArrowOutwardRounded sx={{ color: "#fff" }} />}
                  sx={{ color: "#fff !important" }}
                >
                  예약 링크
                </Button>
                <Button component="a" href={salon.source} target="_blank" rel="noreferrer" variant="outlined">
                  {salon.sourceLabel}
                </Button>
              </Stack>
            </Stack>

            <KakaoMapPanel address={salon.address} salonName={salon.name} />
          </Box>
        </Paper>

        {/* 하단 2열 */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", lg: "1.05fr 0.95fr" },
          }}
        >
          {/* 방문 정보 */}
          <Paper sx={{ p: 2.25, borderRadius: 4 }}>
            <Stack spacing={1.75}>
              <Stack spacing={0.5}>
                <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800, letterSpacing: "0.08em" }}>
                  방문 정보
                </Typography>
                <Typography variant="h4">운영 정보</Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                }}
              >
                <DetailMetric icon={<PlaceRounded sx={{ fontSize: 16 }} />} label="주소" value={salon.address} />
                <DetailMetric icon={<ScheduleRounded sx={{ fontSize: 16 }} />} label="운영시간" value={salon.hours} />
                <DetailMetric icon={<StorefrontRounded sx={{ fontSize: 16 }} />} label="전화" value={salon.phone} />
                <DetailMetric icon={<SpaRounded sx={{ fontSize: 16 }} />} label="추천 대상" value={salon.recommendedFor} />
              </Box>
            </Stack>
          </Paper>

          {/* 큐레이션 */}
          <Paper sx={{ p: 2.25, borderRadius: 4 }}>
            <Stack spacing={1.75}>
              <Stack spacing={0.5}>
                <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 800, letterSpacing: "0.08em" }}>
                  큐레이션
                </Typography>
                <Typography variant="h4">빠른 포인트</Typography>
              </Stack>

              <Paper
                variant="outlined"
                sx={{
                  p: 1.75,
                  borderRadius: 3,
                  bgcolor: "rgba(37,99,235,0.04)",
                  borderColor: "rgba(37,99,235,0.12)",
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                  추천 포인트
                </Typography>
                <Typography sx={{ mt: 0.75, lineHeight: 1.7, fontWeight: 700, fontSize: "0.92rem" }}>
                  {salon.recommendedFor}
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 1.75, borderRadius: 3 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                  운영 메모
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.72, fontSize: "0.88rem" }}>
                  공개 소스 기준으로 정리한 비교 데이터다. 실제 방문 전 영업시간·가격·예약 가능 여부는 직접 확인이 필요하다.
                </Typography>
              </Paper>

              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                <Chip label={`확인 ${salon.lastCheckedAt}`} color="secondary" variant="outlined" size="small" />
                <Chip label={salon.sourceLabel} variant="outlined" size="small" />
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
