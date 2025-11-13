# 빵.zip

> 오늘도 빵빵하게 🍞

**신입 알바생이 빵 종류와 카테고리를 빠르게 학습할 수 있도록 돕는 웹 기반 학습 도구**

실제 빵집 현장에서 필요한 빵 지식을 게임화된 퀴즈와 도감으로 재미있게 학습하세요!

🔗 **배포 URL**: [🍞 빵.zip 바로가기](https://bbangzip.vercel.app)

## 📋 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [환경 변수](#-환경-변수)
- [개발 도구](#-개발-도구)
- [테스트](#-테스트)
- [스크립트](#-스크립트)
- [데이터 구조](#-데이터-구조)

## ✨ 주요 기능

### 1. 빵 도감

- **카테고리별 빵 탐색**: 기본빵, 크림빵, 조리빵, 패스트리, 건강빵, 도넛 등
- **상세 정보 제공**: 사진, 이름, 카테고리

### 2. 빵 퀴즈 (3단계 난이도)

#### 🌱 Lv.1 - 빵 카테고리 퀴즈 (빵린이의 첫걸음)

- 빵 사진을 보고 올바른 카테고리 선택
- 총 20문제
- 즉시 정답/오답 피드백
- 틀린 빵 목록 제공하여 복습 가능
- **GA4 추적**: 퀴즈 시작/종료, 정답률, 소요 시간, 중도 이탈

#### 🔥 Lv.2 - 퀴즈 실전편 (이제 진짜 빵이다!)

- 실제 사진을 보고 **빵 이름 + 카테고리** 모두 맞추기
- 실전 감각을 위한 실제 사진 활용
- 총 10문제
- 매 라운드 정답/오답 즉시 표시
- 틀린 빵 목록으로 복습
- **GA4 추적**: 실전 퀴즈 성과 분석

#### 🏆 Lv.3 - 퀴즈 심화편 (준비 중)

- 쟁반에 담긴 여러 빵 사진을 보고 빵 이름 고르기

### 3. 1분 응원하기

- Google Forms를 통한 피드백 및 응원 메시지 전송
- 사용자 의견 수렴

## 🛠 기술 스택

### Core

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)

### Styling

- **CSS Framework**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Font**: Jua (Google Fonts)

### State Management

- **Global State**: [Zustand](https://zustand.docs.pmnd.rs/)
  - `breadStore`: 빵 데이터 및 카테고리 관리
  - `quizStore`: 퀴즈 상태 및 틀린 빵 목록 관리

### Backend & Database

- **Database**: [Supabase](https://supabase.com/)
  - PostgreSQL 기반
  - 빵 데이터 저장 및 관리
  - 초기 데이터 시딩 스크립트 (`scripts/seed.js`)

### Analytics

- **Google Analytics 4**
  - 페이지뷰 추적 (중복 방지 처리)
  - 퀴즈 성과 분석 (시작/종료, 정답률, 소요 시간)
  - 중도 이탈 추적
  - 404 에러 추적

### Testing

- **Test Framework**: [Jest](https://jestjs.io/)
- **Test Utilities**: [React Testing Library](https://testing-library.com/)

### Code Quality & Git Hooks

- **Linter**: [ESLint 9](https://eslint.org/) + Next.js Config
- **Git Hooks**: [Husky](https://typicode.github.io/husky/)
  - `commit-msg`: 커밋 메시지 검증
- **Commit Convention**: [Commitlint](https://commitlint.js.org/)
  - Conventional Commits 준수
  - 타입: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `ci`, `perf`, `build`

### Development Tools

- **Runtime**: Node.js 20+
- **Package Manager**: npm

## 📁 프로젝트 구조

```
bbangzip/
├── app/                          # Next.js App Router
│   ├── menus/
│   │   ├── bread-pedia/          # 빵 도감 페이지
│   │   └── bread-quiz/           # 빵 퀴즈
│   │       ├── category-quiz/    # Lv.1 카테고리 퀴즈
│   │       │   └── result/       # 퀴즈 결과 페이지
│   │       ├── real-quiz/        # Lv.2 실전 퀴즈
│   │       │   └── result/       # 실전 퀴즈 결과
│   │       ├── master-quiz/      # Lv.3 심화 퀴즈 (준비중)
│   │       └── page.tsx          # 퀴즈 메뉴
│   ├── layout.tsx                # 루트 레이아웃 (GA4 설정)
│   ├── not-found.tsx             # 404 페이지
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── common/                   # 공통 컴포넌트
│   │   ├── __tests__/            # 컴포넌트 테스트
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── LinkButton.tsx
│   │   ├── MenuItem.tsx
│   │   └── ResultModal.tsx
│   ├── ga/
│   │   └── GAListener.tsx        # GA4 페이지뷰 추적
│   └── store/
│       └── BreadStoreInitializer.tsx
├── store/                        # Zustand 전역 상태
│   ├── breadStore.ts             # 빵 데이터 스토어
│   └── quizStore.ts              # 퀴즈 상태 스토어
├── hooks/                        # 커스텀 훅
│   ├── useRandomBreads.ts        # 랜덤 빵 선택
│   └── useRandomCategories.ts    # 랜덤 카테고리 선택
├── lib/                          # 유틸리티
│   └── ga.ts                     # GA4 추적 함수
├── types/                        # TypeScript 타입
│   ├── global.d.ts
│   └── index.ts
├── constants/                    # 상수
│   └── quiz.ts                   # 퀴즈 설정
├── data/                         # 정적 데이터
│   └── news.ts                   # 공지사항
├── public/                       # 정적 파일
│   └── images/
│       ├── breads/               # 빵 이미지
│       ├── main/                 # 메인 아이콘
│       └── bbangzip-icons/       # 퀴즈 아이콘
├── scripts/
│   └── seed.js                   # Supabase 데이터 시딩
├── .husky/                       # Git hooks
│   └── commit-msg                # Commitlint 실행
├── breads.json                   # 빵 데이터
├── jest.config.ts                # Jest 설정
├── jest.setup.ts                 # Jest 환경 설정
├── commitlint.config.cjs         # Commitlint 규칙
├── eslint.config.mjs             # ESLint 설정
├── tailwind.config.ts            # Tailwind CSS 설정
└── tsconfig.json                 # TypeScript 설정
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 20 이상
- npm, yarn, pnpm 또는 bun
- Supabase 계정 (데이터베이스용)
- Google Analytics 4 계정 (선택사항)

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/bbangzip.git
cd bbangzip

# 의존성 설치
npm install

# Git hooks 설치
npm run prepare
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🔐 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# Supabase (필수)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics 4 (선택사항)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 환경 설정
NEXT_PUBLIC_APP_ENV=development  # development | production
```

### Supabase 설정

1. [Supabase](https://supabase.com/) 프로젝트 생성
2. 프로젝트 URL 및 anon key 복사
3. `.env.local`에 설정
4. 데이터베이스 초기화:

```bash
npm run seed
```

## 🧰 개발 도구

### Linting

```bash
npm run lint
```

### Git Commit Convention

```bash
# 커밋 메시지 형식
<type>: <subject>

# 예시
feat: 빵 도감 검색 기능 추가
fix: 퀴즈 정답 체크 로직 수정
test: Button 컴포넌트 테스트 작성
```

**허용되는 타입:**

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `chore`: 빌드 업무, 패키지 매니저 설정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `ci`: CI/CD 설정
- `perf`: 성능 개선
- `build`: 빌드 시스템

## 🧪 테스트

### 테스트 실행

```bash
# 전체 테스트 실행
npm test

# Watch 모드
npm run test:watch

# 커버리지 확인
npm run test:coverage
```

### 테스트 작성 가이드

- 테스트 파일 위치: `__tests__/` 디렉토리
- 파일명: `*.test.tsx` 또는 `*.spec.tsx`
- Testing Library 사용 (`@testing-library/react`)
- Jest DOM matchers 활용 (`@testing-library/jest-dom`)

## 📜 스크립트

| 명령어                  | 설명                            |
| ----------------------- | ------------------------------- |
| `npm run dev`           | 개발 서버 실행 (localhost:3000) |
| `npm run build`         | 프로덕션 빌드                   |
| `npm run start`         | 프로덕션 서버 실행              |
| `npm run lint`          | ESLint 실행                     |
| `npm run seed`          | Supabase 데이터베이스 초기화    |
| `npm test`              | Jest 테스트 실행                |
| `npm run test:watch`    | Jest watch 모드                 |
| `npm run test:coverage` | 테스트 커버리지 확인            |
| `npm run prepare`       | Husky Git hooks 설치            |

## 📊 데이터 구조

### Bread (빵)

```typescript
{
  name: string;           // 빵 이름
  category: number;       // 카테고리 ID
  price: number;          // 가격
  images: {
    official: string;     // 공식 사진 경로
    real: string | null;  // 실제 사진 경로
  };
  taste: {
    description: string;  // 맛 설명
    keywords: string[];   // 맛 키워드
  };
  tip: string;            // 구별 팁
  confusing: string[];    // 헷갈리는 빵 목록
  reviews: string[];      // 리뷰
  isbest: boolean;        // 베스트 상품 여부
  isnew: boolean;         // 신제품 여부
}
```

### Category (카테고리)

```typescript
{
  id: number; // 카테고리 ID
  name: string; // 카테고리 이름
  color: string; // 카테고리 색상
}
```

### Quiz Store

```typescript
{
  wrongBreads: Array<{
    name: string;
    category: string;
  }>;
  addWrongBread: (bread) => void;
  resetWrongBreads: () => void;
}
```

## 🚢 배포

이 프로젝트는 [Vercel](https://vercel.com/)에 배포되어 있습니다.

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_APP_ENV=production`

## 📈 Google Analytics 4

### 추적 이벤트

| 이벤트명         | 설명        | 파라미터                                                          |
| ---------------- | ----------- | ----------------------------------------------------------------- |
| `page_view`      | 페이지 조회 | `page_path`                                                       |
| `page_not_found` | 404 에러    | `page_path`, `referrer`                                           |
| `quiz_start`     | 퀴즈 시작   | `quiz_type`                                                       |
| `quiz_complete`  | 퀴즈 완료   | `quiz_type`, `score`, `total_questions`, `time_taken`, `accuracy` |
| `quiz_answer`    | 문제 답변   | `quiz_type`, `is_correct`, `bread_name`                           |
| `quiz_exit`      | 중도 이탈   | `quiz_type`, `exited_at`, `completion_rate`                       |
| `bread_view`     | 빵 상세보기 | `bread_name`, `category`                                          |
