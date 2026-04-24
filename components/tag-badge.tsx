"use client";

import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import ChildCareRounded from "@mui/icons-material/ChildCareRounded";
import ColorLensRounded from "@mui/icons-material/ColorLensRounded";
import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import HealthAndSafetyRounded from "@mui/icons-material/HealthAndSafetyRounded";
import LocalParkingRounded from "@mui/icons-material/LocalParkingRounded";
import ManRounded from "@mui/icons-material/ManRounded";
import NightlightRounded from "@mui/icons-material/NightlightRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import SavingsRounded from "@mui/icons-material/SavingsRounded";
import SpaRounded from "@mui/icons-material/SpaRounded";
import WomanRounded from "@mui/icons-material/WomanRounded";
import { Box, Tooltip, Typography } from "@mui/material";
import { tagLabels, type SalonTag } from "@/data/salons";

export const tagStyleMap: Record<SalonTag, { icon: React.ElementType; color: string; bg: string }> = {
  남성커트: { icon: ManRounded, color: "#1565c0", bg: "rgba(21,101,192,0.1)" },
  여성커트: { icon: WomanRounded, color: "#ad1457", bg: "rgba(173,20,87,0.1)" },
  펌: { icon: AutoAwesomeRounded, color: "#6a1b9a", bg: "rgba(106,27,154,0.1)" },
  염색: { icon: ColorLensRounded, color: "#e64a19", bg: "rgba(230,74,25,0.1)" },
  클리닉: { icon: HealthAndSafetyRounded, color: "#00838f", bg: "rgba(0,131,143,0.1)" },
  "1인샵": { icon: PersonRounded, color: "#2c6c66", bg: "rgba(44,108,102,0.1)" },
  주차: { icon: LocalParkingRounded, color: "#ef6c00", bg: "rgba(239,108,0,0.1)" },
  네이버예약: { icon: EventAvailableRounded, color: "#2e7d32", bg: "rgba(46,125,50,0.1)" },
  퇴근후: { icon: NightlightRounded, color: "#546e7a", bg: "rgba(84,110,122,0.1)" },
  가성비: { icon: SavingsRounded, color: "#2e7d32", bg: "rgba(27,94,32,0.1)" },
  키즈: { icon: ChildCareRounded, color: "#c2185b", bg: "rgba(194,24,91,0.1)" },
  두피관리: { icon: SpaRounded, color: "#00695c", bg: "rgba(0,105,92,0.1)" },
};

/** 카드용: 원형 아이콘 배지 (hover 시 tooltip) */
export function TagIconBadge({ tag, size = 28 }: { tag: SalonTag; size?: number }) {
  const style = tagStyleMap[tag];
  const Icon = style.icon;
  return (
    <Tooltip title={tagLabels[tag]} placement="top" arrow>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          borderRadius: "50%",
          bgcolor: style.bg,
          color: style.color,
          flexShrink: 0,
          transition: "transform 0.12s",
          "&:hover": { transform: "scale(1.18)" },
        }}
      >
        <Icon sx={{ fontSize: size * 0.54 }} />
      </Box>
    </Tooltip>
  );
}

/** 상세 페이지용: 아이콘 + 라벨 pill */
export function TagPill({ tag }: { tag: SalonTag }) {
  const style = tagStyleMap[tag];
  const Icon = style.icon;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.25,
        py: 0.5,
        borderRadius: 999,
        bgcolor: style.bg,
        color: style.color,
      }}
    >
      <Icon sx={{ fontSize: 14 }} />
      <Typography component="span" sx={{ fontSize: "0.76rem", fontWeight: 700 }}>
        {tagLabels[tag]}
      </Typography>
    </Box>
  );
}
