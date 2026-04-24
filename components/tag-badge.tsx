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
  남성커트:  { icon: ManRounded,              color: "#3B82F6", bg: "rgba(59,130,246,0.1)"  },
  여성커트:  { icon: WomanRounded,            color: "#EC4899", bg: "rgba(236,72,153,0.1)"  },
  펌:       { icon: AutoAwesomeRounded,       color: "#A855F7", bg: "rgba(168,85,247,0.1)"  },
  염색:     { icon: ColorLensRounded,         color: "#F97316", bg: "rgba(249,115,22,0.1)"  },
  클리닉:   { icon: HealthAndSafetyRounded,   color: "#0891B2", bg: "rgba(8,145,178,0.1)"   },
  "1인샵":  { icon: PersonRounded,            color: "#0D9488", bg: "rgba(13,148,136,0.1)"  },
  주차:     { icon: LocalParkingRounded,      color: "#F59E0B", bg: "rgba(245,158,11,0.1)"  },
  네이버예약:{ icon: EventAvailableRounded,   color: "#22C55E", bg: "rgba(34,197,94,0.1)"   },
  퇴근후:   { icon: NightlightRounded,        color: "#64748B", bg: "rgba(100,116,139,0.1)" },
  가성비:   { icon: SavingsRounded,           color: "#10B981", bg: "rgba(16,185,129,0.1)"  },
  키즈:     { icon: ChildCareRounded,         color: "#F43F5E", bg: "rgba(244,63,94,0.1)"   },
  두피관리: { icon: SpaRounded,               color: "#14B8A6", bg: "rgba(20,184,166,0.1)"  },
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
