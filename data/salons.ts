export type SalonTag =
  | "남성커트"
  | "여성커트"
  | "펌"
  | "염색"
  | "클리닉"
  | "1인샵"
  | "주차"
  | "네이버예약"
  | "퇴근후"
  | "가성비"
  | "키즈"
  | "두피관리";

export type Salon = {
  id: string;
  slug: string;
  name: string;
  area: string;
  address: string;
  hours: string;
  phone: string;
  parking: string;
  reservation: string;
  reservationUrl: string;
  summary: string;
  recommendedFor: string;
  priceSummary: string;
  specialties: string[];
  tags: SalonTag[];
  instagramUrl?: string;
  sourceLabel: string;
  source: string;
  lastCheckedAt: string;
};

export const featuredTags: SalonTag[] = [
  "남성커트",
  "염색",
  "펌",
  "1인샵",
  "주차",
  "네이버예약",
  "키즈",
  "두피관리"
];

export const tagLabels: Record<SalonTag, string> = {
  남성커트: "남성 커트",
  여성커트: "여성 커트",
  펌: "펌",
  염색: "염색",
  클리닉: "클리닉",
  "1인샵": "1인샵",
  주차: "주차 가능",
  네이버예약: "네이버 예약",
  퇴근후: "퇴근 후 방문",
  가성비: "가성비",
  키즈: "키즈",
  두피관리: "두피 관리"
};

export const salons: Salon[] = [
  {
    id: "kiki-healing-park",
    slug: "kiki-healing-park",
    name: "KIKI HEALING PARK",
    area: "정보화길권",
    address: "전남 나주시 정보화길 52 대건빌딩 301호",
    hours: "10:00 - 20:00 · 일요일 휴무",
    phone: "공개 전화번호 확인 필요",
    parking: "불가",
    reservation: "전화 예약 · 100% 예약제",
    reservationUrl:
      "https://beautyntoktok.com/pc/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EC%A0%95%EB%B3%B4%ED%99%94%EA%B8%B8+52++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+%EB%8C%80%EA%B1%B4%EB%B9%8C%EB%94%A9+301%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302151353155000&title=KIKI+HEALING+PARK",
    summary: "헤드스파컷트와 열펌을 내세우는 1인 살롱이다.",
    recommendedFor: "프라이빗한 1인샵과 헤드스파 중심 시술을 찾는 경우",
    priceSummary: "남성컷 50,000원~ · 여성컷 70,000원~",
    specialties: ["헤드스파컷트", "열펌", "원장 단독 시술"],
    tags: ["1인샵", "클리닉", "펌"],
    sourceLabel: "뷰티앤톡톡",
    source:
      "https://beautyntoktok.com/pc/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EC%A0%95%EB%B3%B4%ED%99%94%EA%B8%B8+52++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+%EB%8C%80%EA%B1%B4%EB%B9%8C%EB%94%A9+301%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302151353155000&title=KIKI+HEALING+PARK",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "madew-hair",
    slug: "madew-hair",
    name: "메이듀 헤어",
    area: "그린로권",
    address: "전남 나주시 그린로 155 110호",
    hours: "10:00 - 19:00 · 월요일 휴무",
    phone: "061-820-8335",
    parking: "가능",
    reservation: "전화 예약 · 카톡 상담",
    reservationUrl:
      "https://m.beautyntoktok.com/m/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EA%B7%B8%EB%A6%B0%EB%A1%9C+155++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+110%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302142406442000&title=%EB%A9%94%EC%9D%B4%EB%93%80+%ED%97%A4%EC%96%B4",
    summary: "강남 대치동 근무 경력을 강조하는 빛가람동 미용실이다.",
    recommendedFor: "주차 가능하고 기본 컷 가격이 비교적 분명한 샵을 찾는 경우",
    priceSummary: "남성컷 18,000원~ · 여성컷 20,000원~",
    specialties: ["여성 컷", "남성 컷", "다운펌"],
    tags: ["여성커트", "펌", "염색", "주차", "가성비"],
    sourceLabel: "뷰티앤톡톡",
    source:
      "https://m.beautyntoktok.com/m/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EA%B7%B8%EB%A6%B0%EB%A1%9C+155++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+110%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302142406442000&title=%EB%A9%94%EC%9D%B4%EB%93%80+%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "shuilga-headspa",
    slug: "shuilga-headspa",
    name: "쉴가헤어 head spa 빛가람점",
    area: "배멧권",
    address: "전남 나주시 빛가람동 160-6 102호",
    hours: "11:30 - 20:00 · 일요일 휴무",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "마메드네 예약",
    reservationUrl: "https://mamedene.com/shops/14570",
    summary: "헤드스파와 클리닉 계열 메뉴가 전면에 나온다.",
    recommendedFor: "두피 관리와 헤드스파 시술을 우선으로 보는 경우",
    priceSummary: "남자컷 15,000원~ · 일반펌 60,000원~",
    specialties: ["헤드스파", "클리닉", "에너지 테라피"],
    tags: ["클리닉", "두피관리", "펌"],
    sourceLabel: "마메드네",
    source: "https://mamedene.com/shops/14570",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "sinaum-hair",
    slug: "sinaum-hair",
    name: "시나움헤어",
    area: "문화로권",
    address: "전남 나주시 문화로 216(빛가람동)",
    hours: "10:00 - 20:00 · 월요일 휴무",
    phone: "010-7725-7765",
    parking: "확인 필요",
    reservation: "전화 예약",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%EC%8B%9C%EB%82%98%EC%9B%80%ED%97%A4%EC%96%B4sinauum%EB%AF%B8%EC%9A%A9%EC%8B%A4-7qbfiz24bah3/",
    summary: "염색과 남자머리를 강조하는 오픈형 살롱으로 노출돼 있다.",
    recommendedFor: "남성 커트나 트렌디한 염색 키워드로 찾는 경우",
    priceSummary: "남성커트 · 여성커트 18,000원~",
    specialties: ["남성 스타일", "염색", "슬릭펌"],
    tags: ["남성커트", "염색", "펌", "가성비"],
    instagramUrl: "http://instagram.com/sinauum",
    sourceLabel: "당근 동네업체",
    source:
      "https://www.daangn.com/kr/local-profile/%EC%8B%9C%EB%82%98%EC%9B%80%ED%97%A4%EC%96%B4sinauum%EB%AF%B8%EC%9A%A9%EC%8B%A4-7qbfiz24bah3/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "sam-and-sam-hair",
    slug: "sam-and-sam-hair",
    name: "삼앤삼헤어",
    area: "빛가람로권",
    address: "전남 나주시 빛가람로 680 103호",
    hours: "운영시간 확인 필요",
    phone: "061-332-3837",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%EC%82%BC%EC%95%A4%EC%82%BC%ED%97%A4%EC%96%B4-2v9gefxw8b1f/",
    summary: "빛가람로 쪽에서 확인되는 기본 수록 대상이다.",
    recommendedFor: "빛가람로 라인에서 가까운 샵을 찾는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트", "기본 펌"],
    tags: ["여성커트", "펌"],
    sourceLabel: "당근 동네업체",
    source:
      "https://www.daangn.com/kr/local-profile/%EC%82%BC%EC%95%A4%EC%82%BC%ED%97%A4%EC%96%B4-2v9gefxw8b1f/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "handsome-mens",
    slug: "handsome-mens",
    name: "핸썸맨즈",
    area: "상야4길권",
    address: "전남 나주시 상야4길 22 (빛가람동)",
    hours: "09:00 - 21:00 · 월요일 휴무",
    phone: "0504-0548-1497",
    parking: "가능",
    reservation: "예약 가능",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%ED%95%B8%EC%8D%B8%EB%A7%A8%EC%A6%88-x3rgvtnerc2r/",
    summary: "남성 스타일 전문점을 전면에 내세우며 운영 시간도 긴 편이다.",
    recommendedFor: "퇴근 후 남성 커트를 빠르게 해결하고 싶은 경우",
    priceSummary: "남성컷 10,000원~",
    specialties: ["남성 커트", "남성 펌", "학생 컷"],
    tags: ["남성커트", "주차", "퇴근후", "가성비"],
    sourceLabel: "당근 동네업체",
    source:
      "https://www.daangn.com/kr/local-profile/%ED%95%B8%EC%8D%B8%EB%A7%A8%EC%A6%88-x3rgvtnerc2r/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "daol-hair",
    slug: "daol-hair",
    name: "다올헤어",
    area: "상야4길권",
    address: "전남 나주시 상야4길 22 (빛가람동)",
    hours: "운영시간 확인 필요",
    phone: "010-8594-4436",
    parking: "가능",
    reservation: "예약 가능",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%EB%8B%A4%EC%98%AC%ED%97%A4%EC%96%B4-o8udbr7erirh/",
    summary: "펌과 염색 할인 공지를 전면에 걸고 있는 동네 미용실이다.",
    recommendedFor: "주차 가능 여부와 펌·염색 할인 공지가 중요한 경우",
    priceSummary: "펌·염색 할인 공지",
    specialties: ["펌", "염색"],
    tags: ["펌", "염색", "주차"],
    sourceLabel: "당근 동네업체",
    source:
      "https://www.daangn.com/kr/local-profile/%EB%8B%A4%EC%98%AC%ED%97%A4%EC%96%B4-o8udbr7erirh/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "hair-salon-m",
    slug: "hair-salon-m",
    name: "헤어살롱M",
    area: "우정로권",
    address: "전남 나주시 우정로 75 (빛가람동)",
    hours: "10:00 - 20:00 · 수요일 휴무",
    phone: "061-331-3603",
    parking: "가능",
    reservation: "예약 가능",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%ED%97%A4%EC%96%B4%EC%82%B4%EB%A1%B1m-a1npd5gu3doq/",
    summary: "1인 미용실을 강조하며 가격 만족 후기 노출이 있는 편이다.",
    recommendedFor: "1인샵과 합리적 가격을 함께 보는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["1인 시술", "가르마펌", "기본 커트"],
    tags: ["1인샵", "주차", "펌"],
    sourceLabel: "당근 동네업체",
    source:
      "https://www.daangn.com/kr/local-profile/%ED%97%A4%EC%96%B4%EC%82%B4%EB%A1%B1m-a1npd5gu3doq/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "ppeum-hair",
    slug: "ppeum-hair",
    name: "쁨헤어",
    area: "우정로권",
    address: "전남 나주시 우정로 106",
    hours: "09:00 - 20:00",
    phone: "010-8570-0507",
    parking: "가능",
    reservation: "예약 가능",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%EC%81%A8%ED%97%A4%EC%96%B4-zds1y3gcf15a/",
    summary: "복구매직, 복구셋팅, 크리닉 중심으로 노출되는 미용실이다.",
    recommendedFor: "손상모 관리나 클리닉 중심 시술을 우선으로 보는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["복구매직", "복구셋팅", "크리닉"],
    tags: ["클리닉", "두피관리", "주차", "염색"],
    sourceLabel: "당근 동네업체",
    source:
      "https://www.daangn.com/kr/local-profile/%EC%81%A8%ED%97%A4%EC%96%B4-zds1y3gcf15a/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "jiho-hair",
    slug: "jiho-hair",
    name: "지호헤어 나주혁신 본점",
    area: "배멧3길권",
    address: "전남 나주시 배멧3길 11 드림타워 2층 204호",
    hours: "운영시간 확인 필요",
    phone: "061-820-7122",
    parking: "건물 주차장 및 인근 공영주차장 가능",
    reservation: "네이버예약 가능",
    reservationUrl:
      "https://m.booking.naver.com/booking/13/bizes/704497/items/4442683?area=ple",
    summary: "당근 비즈 포스트에서 네이버예약과 주차 동선을 반복 노출하고 있다.",
    recommendedFor: "네이버예약으로 바로 넘어가고 싶은 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["매직셋팅", "손상모 매직", "예약 우선"],
    tags: ["펌", "네이버예약", "주차", "퇴근후"],
    sourceLabel: "당근 비즈",
    source:
      "https://www.daangn.com/kr/business-post/%EA%B8%B4%EB%A8%B8%EB%A6%AC%EB%A7%A4%EC%A7%81%EC%85%8B%ED%8C%85%ED%8E%8C-b3eyews5qzdi/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "zio-hair",
    slug: "zio-hair",
    name: "지오헤어",
    area: "상야1길권",
    address: "전남 나주시 상야1길 7 201호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948939&placeName=%EC%A7%80%EC%98%A4%ED%97%A4%EC%96%B4",
    summary: "상야1길권에서 확인되는 기본 수록 샵이다.",
    recommendedFor: "상야1길권에서 가까운 샵을 우선 보는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트"],
    tags: [],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/place.php?id=948939&placeName=%EC%A7%80%EC%98%A4%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "haessum-hair",
    slug: "haessum-hair",
    name: "해썸헤어",
    area: "상야2길권",
    address: "전남 나주시 상야2길 16 토담휴로스 1차 205호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948926&placeName=%ED%95%B4%EC%8D%B8%ED%97%A4%EC%96%B4",
    summary: "상야2길권에서 함께 비교할 가치가 있는 기본 수록 샵이다.",
    recommendedFor: "상야2길권 비교용 기준선",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트"],
    tags: [],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/place.php?id=948926&placeName=%ED%95%B4%EC%8D%B8%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "luna-mijangwon",
    slug: "luna-mijangwon",
    name: "루나미장원",
    area: "우정로권",
    address: "전남 나주시 우정로 72 1층 104호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl: "https://place.udanax.org/p/1345272/%EB%A3%A8%EB%82%98%EB%AF%B8%EC%9E%A5%EC%9B%90",
    summary: "우정로권에서 확인되는 로컬 미용실이다.",
    recommendedFor: "우정로권 비교 리스트 보강",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트"],
    tags: [],
    sourceLabel: "업체창고",
    source: "https://place.udanax.org/p/1345272/%EB%A3%A8%EB%82%98%EB%AF%B8%EC%9E%A5%EC%9B%90",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "jung-and-jin-hair",
    slug: "jung-and-jin-hair",
    name: "정앤진헤어",
    area: "상야1길권",
    address: "전남 나주시 상야1길 21 킹덤프라자 B동 2층 205호",
    hours: "10:00 - 20:00 · 일요일 휴무",
    phone: "공개 전화번호 확인 필요",
    parking: "가능",
    reservation: "전화 예약",
    reservationUrl:
      "https://m.beautyntoktok.com/m/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EC%83%81%EC%95%BC1%EA%B8%B8+21++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+%ED%82%B9%EB%8D%A4%ED%94%84%EB%9D%BC%EC%9E%90+B%EB%8F%99+2%EC%B8%B5+205%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302150130973000&title=%EC%A0%95%EC%95%A4%EC%A7%84%ED%97%A4%EC%96%B4",
    summary: "상야1길권에서 주차 가능 여부가 명시된 샵 중 하나다.",
    recommendedFor: "상야1길권에서 주차 가능한 샵을 찾는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트", "기본 펌"],
    tags: ["주차", "여성커트"],
    sourceLabel: "뷰티앤톡톡",
    source:
      "https://m.beautyntoktok.com/m/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EC%83%81%EC%95%BC1%EA%B8%B8+21++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+%ED%82%B9%EB%8D%A4%ED%94%84%EB%9D%BC%EC%9E%90+B%EB%8F%99+2%EC%B8%B5+205%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302150130973000&title=%EC%A0%95%EC%95%A4%EC%A7%84%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "daon-hair",
    slug: "daon-hair",
    name: "다온헤어",
    area: "배멧3길권",
    address: "전남 나주시 배멧3길 5-4 108호",
    hours: "10:00 - 19:00 · 일요일 휴무",
    phone: "010-7411-5186",
    parking: "가능",
    reservation: "예약 가능",
    reservationUrl: "https://m.bizw.kr/m_review.php?id=134577",
    summary: "헤어스파와 두피클리닉, 1인 미용실 키워드가 명시된 샵이다.",
    recommendedFor: "1인샵 + 두피 관리 조합을 찾는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["헤어스파", "두피클리닉", "1인 미용실"],
    tags: ["1인샵", "두피관리", "주차", "클리닉"],
    sourceLabel: "비즈워크",
    source: "https://m.bizw.kr/m_review.php?id=134577",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "rinu-hair-salon",
    slug: "rinu-hair-salon",
    name: "리누헤어살롱",
    area: "배멧3길권",
    address: "전남 나주시 배멧3길 19-3 2층 202호",
    hours: "10:30 - 20:00 · 월요일 휴무",
    phone: "061-331-5626",
    parking: "가능",
    reservation: "전화 예약 · 카톡 상담",
    reservationUrl:
      "https://beautyntoktok.com/pc/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EB%B0%B0%EB%A9%A73%EA%B8%B8+19-3++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+2%EC%B8%B5+202%ED%98%B8+%EB%A6%AC%EB%88%84%ED%97%A4%EC%96%B4%EC%82%B4%EB%A1%B1&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302143222674000&title=%EB%A6%AC%EB%88%84%ED%97%A4%EC%96%B4%EC%82%B4%EB%A1%B1",
    summary: "상시 할인 문구와 기본 가격대가 공개된 감각형 살롱이다.",
    recommendedFor: "기본 컷 가격과 상시 할인 여부를 같이 보고 싶은 경우",
    priceSummary: "남성컷 18,000원~ · 일반펌 55,000원~",
    specialties: ["상시 할인", "프리미엄 셋팅", "염색"],
    tags: ["펌", "염색", "주차", "가성비"],
    sourceLabel: "뷰티앤톡톡",
    source:
      "https://beautyntoktok.com/pc/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EB%B0%B0%EB%A9%A73%EA%B8%B8+19-3++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+2%EC%B8%B5+202%ED%98%B8+%EB%A6%AC%EB%88%84%ED%97%A4%EC%96%B4%EC%82%B4%EB%A1%B1&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302143222674000&title=%EB%A6%AC%EB%88%84%ED%97%A4%EC%96%B4%EC%82%B4%EB%A1%B1",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "bubble-story-bitgaram",
    slug: "bubble-story-bitgaram",
    name: "버블스토리 빛가람점",
    area: "그린로권",
    address: "전남 나주시 그린로 208 105호",
    hours: "10:30 - 19:00 · 월요일 휴무",
    phone: "061-332-1788",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://hotel-iu.tistory.com/6604",
    summary: "어린이 전용 미용실로 소개되는 키즈 특화 샵이다.",
    recommendedFor: "아이와 함께 갈 키즈 헤어숍을 찾는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["키즈 미용", "어린이 컷"],
    tags: ["키즈"],
    sourceLabel: "순위·소개 페이지",
    source: "https://hotel-iu.tistory.com/6604",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "haven-hair",
    slug: "haven-hair",
    name: "헤이븐헤어",
    area: "배멧3길권",
    address: "전남 나주시 배멧3길 19-13 110호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=1345271&placeName=%ED%97%A4%EC%9D%B4%EB%B8%90%ED%97%A4%EC%96%B4",
    summary: "배멧3길권에서 함께 비교할 만한 기본 수록 샵이다.",
    recommendedFor: "배멧3길권 비교 폭을 넓히고 싶은 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트"],
    tags: [],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/place.php?id=1345271&placeName=%ED%97%A4%EC%9D%B4%EB%B8%90%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "bk-mens-cut",
    slug: "bk-mens-cut",
    name: "BK남성컷트",
    area: "월정1길권",
    address: "전남 나주시 월정1길 10 영무예다음아파트 상가 117호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/p/3099483/%EB%B9%84%EC%BC%80%EC%9D%B4%EB%82%A8%EC%84%B1%EC%BB%A4%ED%8A%B8",
    summary: "월정1길권 남성 커트 비교용으로 넣어둘 만한 샵이다.",
    recommendedFor: "남성 커트 중심으로 월정1길권을 보는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["남성 커트"],
    tags: ["남성커트"],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/p/3099483/%EB%B9%84%EC%BC%80%EC%9D%B4%EB%82%A8%EC%84%B1%EC%BB%A4%ED%8A%B8",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "mensik-naju-innovation",
    slug: "mensik-naju-innovation",
    name: "맨시크 나주혁신점",
    area: "전력로권",
    address: "전남 나주시 전력로 6 207호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948952&placeName=%EB%A7%A8%EC%8B%9C%ED%81%AC+%EB%82%98%EC%A3%BC%ED%98%81%EC%8B%A0%EC%A0%90",
    summary: "전력로권에서 확인되는 남성 이미지 중심 샵이다.",
    recommendedFor: "전력로권 남성 스타일 샵 후보를 넓혀볼 때",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["남성 스타일"],
    tags: ["남성커트"],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/place.php?id=948952&placeName=%EB%A7%A8%EC%8B%9C%ED%81%AC+%EB%82%98%EC%A3%BC%ED%98%81%EC%8B%A0%EC%A0%90",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "for-men",
    slug: "for-men",
    name: "포맨",
    area: "전력로권",
    address: "전남 나주시 전력로 6 펠리시티s 107호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948945&placeName=%ED%8F%AC%EB%A7%A8",
    summary: "전력로권 남성 스타일 샵 비교군으로 함께 볼 만하다.",
    recommendedFor: "포맨, 맨시크, 지오헤어를 묶어 비교하고 싶은 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["남성 스타일"],
    tags: ["남성커트"],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/place.php?id=948945&placeName=%ED%8F%AC%EB%A7%A8",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "leecheol-hairkker-naju",
    slug: "leecheol-hairkker-naju",
    name: "이철헤어커커 나주혁신점",
    area: "상야2길권",
    address: "전남 나주시 상야2길 22 선도타워 2F",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/p/948956/%EC%9D%B4%EC%B2%A0%ED%97%A4%EC%96%B4%EC%BB%A4%EC%BB%A4%2B%EB%82%98%EC%A3%BC%ED%98%81%EC%8B%A0%EC%A0%90",
    summary: "브랜드 인지도가 있는 체인형 샵으로 비교군에 넣을 가치가 있다.",
    recommendedFor: "체인형 살롱과 로컬 샵을 함께 비교하고 싶은 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["브랜드 살롱"],
    tags: ["펌", "여성커트"],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/p/948956/%EC%9D%B4%EC%B2%A0%ED%97%A4%EC%96%B4%EC%BB%A4%EC%BB%A4%2B%EB%82%98%EC%A3%BC%ED%98%81%EC%8B%A0%EC%A0%90",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "barda-hair",
    slug: "barda-hair",
    name: "바르다헤어",
    area: "그린로권",
    address: "전남 나주시 그린로 197 (빛가람동)",
    hours: "매주 월 휴무",
    phone: "0504-2545-6239",
    parking: "가능",
    reservation: "예약 가능",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%EB%B0%94%EB%A5%B4%EB%8B%A4%ED%97%A4%EC%96%B4-mkj9rxrv6pqw/",
    summary: "후기 수와 가격 공개 폭이 비교적 큰 컬러·펌 중심 살롱이다.",
    recommendedFor: "염색·펌 가격대를 먼저 비교하고 싶은 경우",
    priceSummary: "뿌리염색 20,000원~ · 베이직펌 40,000원~",
    specialties: ["염색", "펌", "두피·탈모 관리"],
    tags: ["염색", "펌", "주차", "두피관리", "네이버예약"],
    sourceLabel: "당근 동네업체",
    source:
      "https://www.daangn.com/kr/local-profile/%EB%B0%94%EB%A5%B4%EB%8B%A4%ED%97%A4%EC%96%B4-mkj9rxrv6pqw/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "soi-salon",
    slug: "soi-salon",
    name: "쏘이살롱",
    area: "상야4길권",
    address: "전남 나주시 상야4길 22 대양스퀘어가든 3층 315호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948931&placeName=%EC%8F%98%EC%9D%B4%EC%82%B4%EB%A1%B1",
    summary: "상야4길권 비교군에서 빠지기 어려운 살롱으로 직접 페이지가 잡힌다.",
    recommendedFor: "상야4길권 미용실들을 한 번에 좁혀보는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트", "상야4길권 비교군"],
    tags: [],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/place.php?id=948931&placeName=%EC%8F%98%EC%9D%B4%EC%82%B4%EB%A1%B1",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "amy-hair-studio-bitgaram",
    slug: "amy-hair-studio-bitgaram",
    name: "에이미헤어스튜디오 나주 빛가람점",
    area: "우정로권",
    address: "전남 나주시 우정로 106 토담스타타워 B동 206호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/p/948934/%EC%97%90%EC%9D%B4%EB%AF%B8%ED%97%A4%EC%96%B4%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EB%82%98%EC%A3%BC%20%EB%B9%9B%EA%B0%80%EB%9E%8C%EC%A0%90",
    summary: "우정로권에서 직접 이름이 확인되는 살롱으로 주요 상권에 있다.",
    recommendedFor: "우정로권에서 가까운 샵을 우선 보는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트", "우정로권 비교"],
    tags: [],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/p/948934/%EC%97%90%EC%9D%B4%EB%AF%B8%ED%97%A4%EC%96%B4%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EB%82%98%EC%A3%BC%20%EB%B9%9B%EA%B0%80%EB%9E%8C%EC%A0%90",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "iyu-hair",
    slug: "iyu-hair",
    name: "이유헤어",
    area: "우정로권",
    address: "전남 나주시 우정로 103 이유헤어",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948937&placeName=%EC%9D%B4%EC%9C%A0%ED%97%A4%EC%96%B4",
    summary: "우정로권에서 직접 잡히는 기본 수록 살롱이다.",
    recommendedFor: "우정로권 후보를 넓혀서 비교하고 싶은 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트"],
    tags: [],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/place.php?id=948937&placeName=%EC%9D%B4%EC%9C%A0%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "hair-bin",
    slug: "hair-bin",
    name: "헤어빈",
    area: "우정로권",
    address: "전남 나주시 우정로 75 상가동143동123호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/p/948976/%ED%97%A4%EC%96%B4%EB%B9%88",
    summary: "우정로권에서 직접 페이지가 확인되는 살롱으로 기본 비교군에 적합하다.",
    recommendedFor: "우정로권에서 더 많은 후보를 보고 싶은 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트"],
    tags: [],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/p/948976/%ED%97%A4%EC%96%B4%EB%B9%88",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "yumi-hair",
    slug: "yumi-hair",
    name: "유미헤어",
    area: "우정로권",
    address: "전남 나주시 우정로 72 더클래스빌딩 B동 2층 유미헤어",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948973&placeName=%EC%9C%A0%EB%AF%B8%ED%97%A4%EC%96%B4",
    summary: "우정로권 빌딩 내에 있는 살롱으로 공개 페이지가 확인된다.",
    recommendedFor: "우정로권 건물형 미용실까지 함께 보고 싶은 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["기본 커트"],
    tags: [],
    sourceLabel: "업체창고",
    source:
      "https://place.udanax.org/place.php?id=948973&placeName=%EC%9C%A0%EB%AF%B8%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "huiwa-salon",
    slug: "huiwa-salon",
    name: "희와살롱",
    area: "상야4길권",
    address: "전남 나주시 상야4길 22 211호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948931&placeName=%EC%8F%98%EC%9D%B4%EC%82%B4%EB%A1%B1",
    summary: "인근 미용실 목록에서 반복적으로 확인되는 상야4길권 살롱이다.",
    recommendedFor: "상야4길권을 놓치지 않고 넓게 비교하는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["상야4길권 비교군"],
    tags: [],
    sourceLabel: "업체창고 주변정보",
    source:
      "https://place.udanax.org/place.php?id=948931&placeName=%EC%8F%98%EC%9D%B4%EC%82%B4%EB%A1%B1",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "labelle-hair-salon",
    slug: "labelle-hair-salon",
    name: "라벨르헤어살롱",
    area: "상야3길권",
    address: "전남 나주시 상야3길 17 휴로스센트럴 203호",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948931&placeName=%EC%8F%98%EC%9D%B4%EC%82%B4%EB%A1%B1",
    summary: "상야권 주변 정보에서 반복적으로 잡히는 살롱이다.",
    recommendedFor: "상야3길·상야4길권을 함께 비교하는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["상야권 비교군"],
    tags: [],
    sourceLabel: "업체창고 주변정보",
    source:
      "https://place.udanax.org/place.php?id=948931&placeName=%EC%8F%98%EC%9D%B4%EC%82%B4%EB%A1%B1",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "iseo-hair",
    slug: "iseo-hair",
    name: "이서헤어",
    area: "빛가람로권",
    address: "전남 나주시 빛가람로 731 ks프라자 1층 이서헤어",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948968&placeName=%ED%95%B8%EC%8D%B8%EB%A7%A8%EC%A6%88",
    summary: "빛가람로권에서 주변 목록으로 확인되는 살롱이다.",
    recommendedFor: "빛가람로권 샵까지 범위를 넓히는 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["빛가람로권 비교군"],
    tags: [],
    sourceLabel: "업체창고 주변정보",
    source:
      "https://place.udanax.org/place.php?id=948968&placeName=%ED%95%B8%EC%8D%B8%EB%A7%A8%EC%A6%88",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "shop-odd-eye",
    slug: "shop-odd-eye",
    name: "샵오드아이",
    area: "배멧1길권",
    address: "전남 나주시 배멧1길 46 402호(빛가람동)",
    hours: "운영시간 확인 필요",
    phone: "공개 전화번호 확인 필요",
    parking: "확인 필요",
    reservation: "공개 예약 링크 확인 필요",
    reservationUrl:
      "https://place.udanax.org/place.php?id=948968&placeName=%ED%95%B8%EC%8D%B8%EB%A7%A8%EC%A6%88",
    summary: "배멧1길권 후보를 넓힐 때 주변 목록으로 확인되는 살롱이다.",
    recommendedFor: "배멧권 미용실까지 같이 비교하고 싶은 경우",
    priceSummary: "공개 가격 확인 필요",
    specialties: ["배멧권 비교군"],
    tags: [],
    sourceLabel: "업체창고 주변정보",
    source:
      "https://place.udanax.org/place.php?id=948968&placeName=%ED%95%B8%EC%8D%B8%EB%A7%A8%EC%A6%88",
    lastCheckedAt: "2026-04-22"
  }
];
