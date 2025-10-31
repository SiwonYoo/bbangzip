# 빵.zip

> 오늘도 빵빵하게 🍞

빵 정보를 쉽고 재미있게 탐색할 수 있는 웹 애플리케이션입니다.

## 주요 기능

### 빵 도감
- 다양한 종류의 빵 정보를 한눈에 확인
- 카테고리별 분류 (기본빵, 크림빵, 조리빵 등)
- 가격, 사진, 맛 키워드, 팁 등 상세 정보 제공

### 카테고리 퀴즈
- 빵 사진을 보고 카테고리를 맞추는 게임
- 게임으로 빵 마스터하기

### 피드백 보내기
- 사용자 의견 및 피드백 전달

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase
- **State Management**: Zustand
- **Runtime**: Node.js

## 시작하기

### 사전 요구사항
- Node.js 20 이상
- npm, yarn, pnpm 또는 bun

### 설치

```bash
# 의존성 설치
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 데이터베이스 초기화

Supabase 데이터베이스에 초기 데이터를 업로드합니다:

```bash
npm run seed
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
bbangzip/
├── app/                # Next.js App Router 페이지
│   ├── menus/
│   │   ├── bread-pedia/    # 빵 도감
│   │   └── category-quiz/  # 카테고리 퀴즈
│   └── page.tsx       # 메인 페이지
├── components/         # 재사용 가능한 컴포넌트
├── store/             # Zustand 전역 상태 관리
├── types/             # TypeScript 타입 정의
├── lib/               # 유틸리티 함수 및 라이브러리
├── public/            # 정적 파일 (이미지 등)
├── scripts/           # 유틸리티 스크립트 (seed.js 등)
└── breads.json        # 빵 데이터
```

## 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행
- `npm run seed` - 데이터베이스 초기화

## 데이터 구조

### Bread (빵)
- name: 빵 이름
- category: 카테고리 ID
- price: 가격
- images: 공식 이미지 및 실제 이미지
- taste: 맛 설명 및 키워드
- tip: 구별 팁
- isbest: 베스트 상품 여부
- isnew: 신제품 여부

### Category (카테고리)
- id: 카테고리 ID
- name: 카테고리 이름
- color: 카테고리 색상
