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
import Stack from "@/components/ui-stack";
import { tagLabels, type Salon } from "@/data/salons";

function DetailMetric({
  icon,
  label,
  value,
  centerValue = false
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  centerValue?: boolean;
}) {
  return (
    <Paper sx={{ p: 1.5, borderRadius: 3, bgcolor: "rgba(255,255,255,0.72)" }}>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(20,118,107,0.12)", color: "primary.main" }}>
          {icon}
        </Avatar>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 800 }}>
          {label}
        </Typography>
      </Stack>
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.55,
          fontWeight: 700,
          textAlign: centerValue ? "center" : "left",
          minHeight: centerValue ? 52 : "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: centerValue ? "center" : "flex-start"
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

export default function SalonDetailView({ salon }: { salon: Salon }) {
  return (
    <Box component="main" sx={{ py: { xs: 2, md: 3 }, pb: 7 }}>
      <Box className="shell" sx={{ display: "grid", gap: 2.25 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Button component={Link} href="/" variant="text" color="inherit">
            ← 목록으로 돌아가기
          </Button>
          <Chip label={salon.sourceLabel} variant="outlined" />
        </Stack>

        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 5 }}>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(380px, 0.92fr)" }
            }}
          >
            <Stack spacing={2}>
              <Stack spacing={1.25}>
                <Chip label={salon.area} color="primary" sx={{ alignSelf: "flex-start" }} />
                <Typography variant="h1" sx={{ fontSize: { xs: "2.3rem", md: "3.5rem" }, lineHeight: 0.95 }}>
                  {salon.name}
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 620, lineHeight: 1.8 }}>
                  {salon.summary}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {salon.tags.map((tag) => (
                  <Chip key={tag} label={tagLabels[tag]} variant="outlined" />
                ))}
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gap: 1.25,
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }
                }}
              >
                <DetailMetric icon={<StorefrontRounded fontSize="small" />} label="가격대" value={salon.priceSummary} />
                <DetailMetric icon={<CalendarMonthRounded fontSize="small" />} label="예약 방식" value={salon.reservation} />
                <DetailMetric icon={<DirectionsCarRounded fontSize="small" />} label="주차" value={salon.parking} />
                <DetailMetric icon={<SpaRounded fontSize="small" />} label="대표 강점" value={salon.specialties.join(", ")} />
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                <Button
                  component="a"
                  href={salon.reservationUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  endIcon={<ArrowOutwardRounded />}
                >
                  예약 링크 열기
                </Button>
                <Button component="a" href={salon.source} target="_blank" rel="noreferrer" variant="outlined">
                  {salon.sourceLabel} 보기
                </Button>
              </Stack>
            </Stack>

            <KakaoMapPanel address={salon.address} salonName={salon.name} />
          </Box>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", lg: "1.05fr 0.95fr" }
          }}
        >
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Stack spacing={2}>
              <Stack spacing={0.75}>
                <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800, letterSpacing: "0.08em" }}>
                  방문 정보
                </Typography>
                <Typography variant="h4">운영 정보와 기본 확인</Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gap: 1.25,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }
                }}
              >
                <DetailMetric icon={<PlaceRounded fontSize="small" />} label="주소" value={salon.address} centerValue />
                <DetailMetric icon={<ScheduleRounded fontSize="small" />} label="운영시간" value={salon.hours} centerValue />
                <DetailMetric icon={<StorefrontRounded fontSize="small" />} label="전화" value={salon.phone} centerValue />
                <DetailMetric icon={<SpaRounded fontSize="small" />} label="추천 대상" value={salon.recommendedFor} centerValue />
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Stack spacing={2}>
              <Stack spacing={0.75}>
                <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 800, letterSpacing: "0.08em" }}>
                  큐레이션
                </Typography>
                <Typography variant="h4">빠르게 봐야 할 포인트</Typography>
              </Stack>

              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "rgba(20,118,107,0.05)",
                  borderColor: "rgba(20,118,107,0.14)"
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                  추천 포인트
                </Typography>
                <Typography sx={{ mt: 1, lineHeight: 1.7, fontWeight: 700 }}>
                  {salon.recommendedFor}
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                  운영 메모
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.75 }}>
                  공개 소스 기준으로 정리한 비교 데이터다. 실제 방문 전 영업시간, 가격,
                  예약 가능 여부는 다시 확인하는 전제가 필요하다.
                </Typography>
              </Paper>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label={`최종 확인 ${salon.lastCheckedAt}`} color="secondary" variant="outlined" />
                <Chip label={salon.sourceLabel} variant="outlined" />
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
