# CELLAXON company website

CELLAXON의 공식 회사·제품 홈페이지입니다. React와 Vite를 기반으로 하며, 현재 공개 가능한 제품과 검증 중인 사업 영역을 구분해 소개합니다.

## 소개 범위

- **Ranvier** — Rust를 위한 타입 기반 의사결정 엔진
- **CELLAXON DevPulse** — VS Code를 위한 로컬 우선 Git 분석 및 AI 에이전트 작업 추적
- **FlightOps** — 운용 증빙 제품군의 개념·사업성 검증 단계

Ranvier의 보조 개발 도구는 포트폴리오 구조를 명확히 하기 위해 홈페이지에서 별도 제품으로 노출하지 않습니다.

## 로컬 개발

Node.js 22 이상이 필요합니다.

```powershell
npm install
npm run dev
```

정적 프로덕션 빌드는 다음 명령으로 검증합니다.

```powershell
npm run check
```

## 구조

- `src/` — React 애플리케이션, 다국어 콘텐츠, 스타일
- `public/assets/` — 공식 브랜드·제품 이미지
- `public/shortcuts/` — 기존 바로가기 페이지
- `docs/design/design-system.md` — 브랜드 토큰과 디자인 원칙
- `.github/workflows/deploy-pages.yml` — GitHub Pages 배포 워크플로

## 배포

`main` 브랜치의 프로덕션 빌드를 GitHub Actions가 GitHub Pages에 게시하도록 구성되어 있습니다. 실제 전환 시 저장소의 Pages Source를 **GitHub Actions**로 설정해야 합니다.

커스텀 도메인은 `cellaxon.com`입니다.
