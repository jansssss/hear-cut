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
  | "가성비";

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
  "퇴근후",
  "가성비"
];

export const salons: Salon[] = [
  {
    id: "kiki-healing-park",
    slug: "kiki-healing-park",
    name: "KIKI HEALING PARK",
    area: "빛가람동",
    address: "전남 나주시 정보화길 52 대건빌딩 301호",
    hours: "매일 운영 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "건물 또는 인근 주차 확인 필요",
    reservation: "네이버 예약 또는 외부 예약 링크 확인 필요",
    reservationUrl:
      "https://m.beautyntoktok.com/m/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EC%A0%95%EB%B3%B4%ED%99%94%EA%B8%B8+52++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+%EB%8C%80%EA%B1%B4%EB%B9%8C%EB%94%A9+301%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302151353155000&title=KIKI+HEALING+PARK",
    summary: "혁신도시권에서 먼저 확인된 샵 중 하나로, 기본 정보 수집이 가능한 공개 페이지가 있다.",
    recommendedFor: "초기 MVP에서 대표 데이터 구조를 검증할 샘플 샵",
    priceSummary: "가격표 추후 보강",
    specialties: ["헤어 전반", "추가 확인 필요"],
    tags: ["여성커트", "펌", "염색"],
    source:
      "https://m.beautyntoktok.com/m/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EC%A0%95%EB%B3%B4%ED%99%94%EA%B8%B8+52++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+%EB%8C%80%EA%B1%B4%EB%B9%8C%EB%94%A9+301%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302151353155000&title=KIKI+HEALING+PARK",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "madew-hair",
    slug: "madew-hair",
    name: "메이듀 헤어",
    area: "빛가람동",
    address: "전남 나주시 그린로 155 110호",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "상가 주차 가능 여부 확인 필요",
    reservation: "외부 예약 페이지 확인 가능",
    reservationUrl:
      "https://m.beautyntoktok.com/m/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EA%B7%B8%EB%A6%B0%EB%A1%9C+155++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+110%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302142406442000&title=%EB%A9%94%EC%9D%B4%EB%93%80+%ED%97%A4%EC%96%B4",
    summary: "혁신도시 상권에 위치한 헤어숍으로 기본 노출 구조가 명확하다.",
    recommendedFor: "주차 가능 여부와 가격 보강 시 비교 가치가 높아질 후보",
    priceSummary: "가격표 추후 보강",
    specialties: ["커트", "펌", "염색"],
    tags: ["여성커트", "펌", "염색", "네이버예약"],
    source:
      "https://m.beautyntoktok.com/m/clientShopDtl/?ADDR=%3D%EC%A0%84%EB%82%A8+%EB%82%98%EC%A3%BC%EC%8B%9C+%EA%B7%B8%EB%A6%B0%EB%A1%9C+155++%28%EB%B9%9B%EA%B0%80%EB%9E%8C%EB%8F%99%29+110%ED%98%B8&SHOP_CATEGORY_NM=%ED%97%A4%EC%96%B4&shopSeq=SHP20220302142406442000&title=%EB%A9%94%EC%9D%B4%EB%93%80+%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "shuilga-headspa",
    slug: "shuilga-headspa",
    name: "쉴가헤어 head spa 빛가람점",
    area: "빛가람동",
    address: "전남 나주시 배멧1길 40",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "주차 정보 확인 필요",
    reservation: "예약 정보 확인 필요",
    reservationUrl: "https://mamedene.com/shops/14570",
    summary: "헤드스파 중심 포지션을 강조할 수 있는 샵으로 차별화 태그에 적합하다.",
    recommendedFor: "클리닉이나 관리 중심 샵을 찾는 사용자",
    priceSummary: "가격표 추후 보강",
    specialties: ["헤드스파", "클리닉"],
    tags: ["클리닉", "여성커트", "퇴근후"],
    source: "https://mamedene.com/shops/14570",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "sinaum-hair",
    slug: "sinaum-hair",
    name: "시나움헤어",
    area: "빛가람동",
    address: "전남 나주시 빛가람동 권역",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "확인 필요",
    reservation: "예약 정보 확인 필요",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%EC%8B%9C%EB%82%98%EC%9B%80%ED%97%A4%EC%96%B4sinauum%EB%AF%B8%EC%9A%A9%EC%8B%A4-7qbfiz24bah3/",
    summary: "당근 지역 프로필로 공개 노출된 샵으로 지역 기반 탐색에 적합하다.",
    recommendedFor: "지역 커뮤니티 기반으로 찾는 사용자",
    priceSummary: "가격표 추후 보강",
    specialties: ["커트", "염색"],
    tags: ["여성커트", "염색"],
    source:
      "https://www.daangn.com/kr/local-profile/%EC%8B%9C%EB%82%98%EC%9B%80%ED%97%A4%EC%96%B4sinauum%EB%AF%B8%EC%9A%A9%EC%8B%A4-7qbfiz24bah3/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "sam-and-sam-hair",
    slug: "sam-and-sam-hair",
    name: "삼앤삼헤어",
    area: "빛가람동",
    address: "전남 나주시 빛가람동 권역",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "확인 필요",
    reservation: "예약 정보 확인 필요",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%EC%82%BC%EC%95%A4%EC%82%BC%ED%97%A4%EC%96%B4-2v9gefxw8b1f/",
    summary: "초기 전수조사 대상에 포함할 공개 노출 샵.",
    recommendedFor: "전체 비교 커버리지 확보",
    priceSummary: "가격표 추후 보강",
    specialties: ["커트", "펌"],
    tags: ["여성커트", "펌"],
    source:
      "https://www.daangn.com/kr/local-profile/%EC%82%BC%EC%95%A4%EC%82%BC%ED%97%A4%EC%96%B4-2v9gefxw8b1f/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "handsome-mens",
    slug: "handsome-mens",
    name: "핸썸맨즈",
    area: "빛가람동",
    address: "전남 나주시 빛가람동 권역",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "확인 필요",
    reservation: "예약 정보 확인 필요",
    reservationUrl:
      "https://www.daangn.com/kr/local-profile/%ED%95%B8%EC%8D%B8%EB%A7%A8%EC%A6%88-10582954/",
    summary: "남성 커트/바버 성향 비교 섹션에 배치하기 좋은 샵.",
    recommendedFor: "남성 커트 위주로 빠르게 찾는 사용자",
    priceSummary: "가격표 추후 보강",
    specialties: ["남성커트", "스타일링"],
    tags: ["남성커트", "가성비"],
    source:
      "https://www.daangn.com/kr/local-profile/%ED%95%B8%EC%8D%B8%EB%A7%A8%EC%A6%88-10582954/",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "haessum-hair",
    slug: "haessum-hair",
    name: "해썸헤어",
    area: "빛가람동",
    address: "전남 나주시 빛가람동 권역",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "확인 필요",
    reservation: "예약 정보 확인 필요",
    reservationUrl: "https://place.udanax.org/place.php?id=948926&placeName=%ED%95%B4%EC%8D%B8%ED%97%A4%EC%96%B4",
    summary: "장소 데이터베이스 기반으로 확인된 혁신도시권 샵.",
    recommendedFor: "기본 디렉토리 수록용",
    priceSummary: "가격표 추후 보강",
    specialties: ["커트", "펌"],
    tags: ["여성커트", "펌"],
    source: "https://place.udanax.org/place.php?id=948926&placeName=%ED%95%B4%EC%8D%B8%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "luna-mijangwon",
    slug: "luna-mijangwon",
    name: "루나미장원",
    area: "빛가람동",
    address: "전남 나주시 빛가람동 권역",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "확인 필요",
    reservation: "예약 정보 확인 필요",
    reservationUrl: "https://place.udanax.org/p/1345272/%EB%A3%A8%EB%82%98%EB%AF%B8%EC%9E%A5%EC%9B%90",
    summary: "비교 디렉토리 전체성 확보에 필요한 샵.",
    recommendedFor: "로컬 전수조사 기준선 확보",
    priceSummary: "가격표 추후 보강",
    specialties: ["커트", "염색"],
    tags: ["여성커트", "염색"],
    source: "https://place.udanax.org/p/1345272/%EB%A3%A8%EB%82%98%EB%AF%B8%EC%9E%A5%EC%9B%90",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "jiu-hair",
    slug: "jiu-hair",
    name: "지우 헤어",
    area: "빛가람동",
    address: "전남 나주시 빛가람동 권역",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "확인 필요",
    reservation: "예약 정보 확인 필요",
    reservationUrl: "https://place.udanax.org/p/948929/%EC%A7%80%EC%9A%B0%2B%ED%97%A4%EC%96%B4",
    summary: "공개 장소 데이터에서 확인 가능한 기본 수록 대상.",
    recommendedFor: "전체 리스트 커버리지 보강",
    priceSummary: "가격표 추후 보강",
    specialties: ["커트", "펌"],
    tags: ["여성커트", "펌"],
    source: "https://place.udanax.org/p/948929/%EC%A7%80%EC%9A%B0%2B%ED%97%A4%EC%96%B4",
    lastCheckedAt: "2026-04-22"
  },
  {
    id: "jiho-hair",
    slug: "jiho-hair",
    name: "지호헤어",
    area: "빛가람동",
    address: "전남 나주시 빛가람동 권역",
    hours: "운영시간 공개 정보 확인 필요",
    phone: "공개 정보 확인 필요",
    parking: "확인 필요",
    reservation: "예약 게시물 확인 가능",
    reservationUrl:
      "https://www.daangn.com/kr/business-post/%EA%B8%B4%EB%A8%B8%EB%A6%AC%EB%A7%A4%EC%A7%81%EC%85%8B%ED%8C%85%ED%8E%8C-b3eyews5qzdi/",
    summary: "예약 또는 시술 게시물이 공개된 샵으로 상세형 페이지 후보.",
    recommendedFor: "예약 CTA 실험용 샘플",
    priceSummary: "가격표 추후 보강",
    specialties: ["펌", "긴머리 스타일"],
    tags: ["펌", "네이버예약", "퇴근후"],
    source:
      "https://www.daangn.com/kr/business-post/%EA%B8%B4%EB%A8%B8%EB%A6%AC%EB%A7%A4%EC%A7%81%EC%85%8B%ED%8C%85%ED%8E%8C-b3eyews5qzdi/",
    lastCheckedAt: "2026-04-22"
  }
];
