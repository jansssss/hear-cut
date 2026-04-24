# hear-cut 프로젝트 컨텍스트

## 프로젝트 개요
나주혁신도시·빛가람동 미용실 비교 디렉토리 앱.
- 배포: GitHub → Vercel 자동 배포 (로컬 `npm run dev` 사용 안 함)
- 레포: https://github.com/jansssss/hear-cut

## 스택
- Next.js 15, React 19, TypeScript
- MUI v7 (Material UI)
- 폰트: `next/font` Noto Sans KR → CSS 변수 `--font-sans`
- 데이터: 정적 (`data/salons.ts`) — 추후 Supabase 연동 예정

## 현재 색상 시스템 (Graphite & Coral Punch)
```
Primary:            #1C1C1E  (애플 그라파이트)
Secondary (CTA):    #FF6B6B  (코랄 펀치)
Background default: #F7F7F7
Background paper:   #FFFFFF
Text primary:       #1C1C1E
Text secondary:     #6B6B6B
```
- CSS 변수: `app/globals.css` 단일 파일 (experience.css 제거됨)
- MUI 테마: `app/mui-theme.ts`

## 주요 컴포넌트
| 파일 | 역할 |
|---|---|
| `components/salon-directory.tsx` | 메인 디렉토리 (필터 + 카드 그리드) |
| `components/salon-detail-view.tsx` | 살롱 상세 페이지 |
| `components/tag-badge.tsx` | 태그 아이콘 배지 (tagStyleMap 12종) |
| `components/kakao-map-panel.tsx` | 카카오맵 (이미 연동됨) |
| `app/mui-theme.ts` | MUI 테마 (breakpoints xxl 포함) |
| `app/globals.css` | 전역 CSS 토큰 |

## 오늘(2026-04-24) 완료한 작업
1. CSS 단일화 — globals.css + experience.css → globals.css 통합
2. MUI 테마 색상 → Graphite & Coral Punch 팔레트 적용
3. 필터 패널 Glassmorphism (`backdrop-filter: blur(20px)`)
4. 카드 hover `translateY(-3px)` + Coral border accent
5. 카드 상단 3px accent bar (태그 수에 따라 코랄/앰버/회색)
6. 권역 Chip 색상 코드화 (`areaColorMap` 7개 권역)
7. 히어로 섹션 추가 (다크 패널 + 전체/네이버예약/주차 집계)
8. 파란색 잔존(`rgba(37,99,235,*)`) 전부 제거
9. Noto_Sans_KR 인스턴스 2개 → 1개(`--font-sans`) 통합
10. `xxl` 브레이크포인트 MUI 타입 선언 추가
11. 좋아요 버튼 제거 (Supabase 연동 후 재구현 예정)
12. `TagFilterButton` 모바일 레이블 추가

## 에이전트 분석 결과 (2026-04-24)
3개 에이전트(apple-ux-master, modern-art-ui-reviewer, library-integrator) 공통 진단:
- **현재 한계:** 이미지 없는 텍스트 카드 그리드 → 시각적 풍부함 한계
- **남은 핵심 과제:** 아래 "다음 작업" 참고

## 다음 작업 (미완료, 우선순위 순)

### 방향 결정 필요 (다음 세션 시작 시 선택)
**A) 이미지 추가** — 살롱 커버 이미지 필드 추가, 없으면 권역별 그래디언트 플레이스홀더
**B) 레이아웃 전면 교체** — 카드 그리드 → 좌측 리스트 + 우측 상세 패널 (Linear/Notion 스타일)
**C) 극도 미니멀** — Linear/Raycast 스타일 흑백 정제

### 라이브러리 (방향 결정 후)
- `framer-motion` — 카드 stagger 진입 애니메이션
- `lucide-react` — MUI 아이콘 → 가는 선형 아이콘 교체
- Playfair Display 폰트 — 살롱 이름 세리프 적용

### 기능 (Supabase 연동 시)
- 좋아요 버튼 + favoriteCount 실시간 연동
- 살롱 데이터 DB 이관 (현재 정적 `data/salons.ts`)

## 주의사항
- 로컬 dev 서버(`npm run dev`) 실행 안 함 — GitHub push → Vercel 자동 배포로 확인
- `data/salons.ts` 정적 데이터 → Supabase 연동 전까지 수동 업데이트
- 카카오맵 이미 연동되어 있음 (추가 작업 불필요)
