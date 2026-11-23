export type HavenHelpLanguage = "en" | "ko";
export type HavenHelpStatus = "draft" | "published";

export type HavenHelpEvidence = {
  sourceRefs: readonly string[];
  lastReviewedRevision: string;
};

export type HavenHelpFact = {
  id: string;
  title: string;
  body: string;
};

export type HavenHelpStep = {
  id: string;
  title: string;
  body: string;
};

type HavenHelpBlockBase = { id: string };

export type HavenHelpBlock =
  | (HavenHelpBlockBase & { type: "paragraph"; text: string })
  | (HavenHelpBlockBase & { type: "facts"; items: readonly HavenHelpFact[] })
  | (HavenHelpBlockBase & { type: "steps"; title: string; items: readonly HavenHelpStep[] })
  | (HavenHelpBlockBase & { type: "note"; title: string; text: string })
  | (HavenHelpBlockBase & { type: "warning"; title: string; text: string })
  | (HavenHelpBlockBase & { type: "code"; code: string; language?: string; caption?: string })
  | (HavenHelpBlockBase & { type: "image"; src: string; alt: string; width: number; height: number; caption?: string });

export type HavenHelpSection = HavenHelpEvidence & {
  id: string;
  status: HavenHelpStatus;
  label: string;
  title: string;
  blocks: readonly HavenHelpBlock[];
};

export type HavenHelpHero = HavenHelpEvidence & {
  id: "hero";
  status: string;
  title: string;
  lead: string;
  note: string;
  mediaAlt: string;
};

export type HavenHelpBoundary = HavenHelpEvidence & {
  id: "product-boundary";
  title: string;
  body: string;
  footerLine: string;
};

export type HavenHelpPageContent = {
  language: HavenHelpLanguage;
  meta: {
    homeLabel: string;
    languageLabel: string;
    skipLabel: string;
    tocLabel: string;
    tocTitle: string;
    contactLabel: string;
  };
  hero: HavenHelpHero;
  boundary: HavenHelpBoundary;
  sections: readonly HavenHelpSection[];
};

export const HAVEN_SOURCE_REVISION = "99e368c4986a816cd6606f96829092239c368fdc";
const reviewedAtSource = HAVEN_SOURCE_REVISION;

export const havenHelpContent: Record<HavenHelpLanguage, HavenHelpPageContent> = {
  en: {
    language: "en",
    meta: {
      homeLabel: "CELLAXON home",
      languageLabel: "Language",
      skipLabel: "Skip to help content",
      tocLabel: "On this page",
      tocTitle: "Help topics",
      contactLabel: "Contact Haven support",
    },
    hero: {
      id: "hero",
      status: "Preparing for release",
      title: "Haven Desktop help",
      lead: "A Windows desktop app for inspecting and managing containers through the wslc command-line tool already installed on your PC.",
      note: "There is no public build yet. This page documents the verified requirements, product boundaries, and support channels available before release.",
      mediaAlt: "Haven Desktop container list and details view",
      sourceRefs: ["README.md#haven-desktop", "README.md#requirements", "README.md#install"],
      lastReviewedRevision: reviewedAtSource,
    },
    boundary: {
      id: "product-boundary",
      title: "Product boundary",
      body: "Haven Desktop is not a Microsoft or Docker product and is not endorsed or supported by either company.",
      footerLine: "Haven Desktop is developed independently by CELLAXON.",
      sourceRefs: ["README.md#disclaimer"],
      lastReviewedRevision: reviewedAtSource,
    },
    sections: [
      {
        id: "overview",
        status: "published",
        label: "Overview",
        title: "Container work without living in the terminal",
        blocks: [{ id: "summary", type: "paragraph", text: "Haven Desktop brings container status, logs, resource usage, images, volumes, networks, files, and sessions into one desktop interface. It runs commands through your existing wslc installation and asks for confirmation before destructive actions." }],
        sourceRefs: ["README.md#haven-desktop", "README.md#features"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "requirements",
        status: "published",
        label: "Requirements",
        title: "What you will need",
        blocks: [
          { id: "summary", type: "paragraph", text: "Haven Desktop is being prepared for Windows 10 and Windows 11 on x64 PCs." },
          {
            id: "requirements-list",
            type: "facts",
            items: [
              { id: "windows-wsl", title: "Windows and WSL", body: "Windows 10 or 11, x64, with WSL available." },
              { id: "wslc-version", title: "wslc 3.0.5 or later", body: "The wslc executable must be on PATH. Haven can show setup guidance when it is missing or too old." },
              { id: "runtime-boundary", title: "Bring your own runtime", body: "Haven does not include, install, or modify WSL, wslc, or Docker Engine. Docker Desktop is not supported." },
            ],
          },
        ],
        sourceRefs: ["README.md#requirements", "README.md#disclaimer", "README.md#features"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "release-status",
        status: "published",
        label: "Getting started",
        title: "Public installation is not available yet",
        blocks: [{ id: "availability", type: "note", title: "Before you begin", text: "Haven Desktop is still preparing for release, so this page does not offer a download or installation procedure. Verified setup steps will be published here when a public build is available." }],
        sourceRefs: ["README.md#install", "SECURITY.md#supported-versions"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "help-topics",
        status: "published",
        label: "Help library",
        title: "Documentation planned around real tasks",
        blocks: [
          { id: "summary", type: "paragraph", text: "The help library will grow alongside the public build. These topics show the planned structure without linking to unfinished articles." },
          {
            id: "topic-list",
            type: "facts",
            items: [
              { id: "containers-logs", title: "Containers and logs", body: "Inspect state and health, start or stop workloads, and follow live logs and resource usage." },
              { id: "resources", title: "Images, volumes, and networks", body: "Review local resources and understand guarded remove, prune, and cleanup actions." },
              { id: "compose", title: "Compose projects", body: "Bring supported Compose workloads up or down and understand how Haven translates common Compose settings." },
              { id: "files-shell", title: "Files and container shell", body: "Transfer files between Windows and containers, and open an interactive shell from the app." },
              { id: "settings-diagnostics", title: "Settings and diagnostics", body: "Configure the desktop experience and prepare a privacy-conscious diagnostic log for support." },
            ],
          },
        ],
        sourceRefs: ["README.md#features", "docs/docker-users.md"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "privacy-security-support",
        status: "published",
        label: "Trust and support",
        title: "Local by design, explicit about network use",
        blocks: [
          { id: "summary", type: "paragraph", text: "Haven has no CELLAXON server and includes no analytics, advertising, or automatic crash reporting. Registry operations such as pulling images, signing in, or checking tags still use the network. Report product questions to contact@cellaxon.com; for a vulnerability, use the same address with “Security” in the subject and avoid public disclosure until it is fixed." },
          {
            id: "trust-facts",
            type: "facts",
            items: [
              { id: "local-records", title: "Local records", body: "Settings, diagnostic logs, activity history, and file-transfer history stay on your Windows PC." },
              { id: "sensitive-values", title: "Sensitive values", body: "Registry passwords are sent to the underlying tool through standard input. Diagnostic reporting masks documented secret and device-identifying values, and you should review a report before sending it." },
              { id: "confirmation", title: "Confirmation first", body: "Removing resources and overwriting files can be destructive. Haven asks for confirmation before these actions." },
            ],
          },
        ],
        sourceRefs: ["docs/privacy.md", "SECURITY.md", "README.md#where-the-app-keeps-its-files", "README.md#feedback-and-security"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "install-guide",
        status: "draft",
        label: "Installation",
        title: "Install Haven Desktop",
        blocks: [
          { id: "draft-summary", type: "paragraph", text: "Reserved for the verified public distribution flow." },
          { id: "draft-steps", type: "steps", title: "Installation steps", items: [{ id: "get-build", title: "Get the public build", body: "Replace this draft with the verified distribution step." }] },
          { id: "draft-note", type: "note", title: "Note", text: "Publish only after a public build is available." },
          { id: "draft-warning", type: "warning", title: "Important", text: "Do not invent a download location or release date." },
          { id: "draft-code", type: "code", language: "powershell", caption: "Verified commands can be documented here", code: "# Add only a command tested against the public build" },
          { id: "draft-image", type: "image", src: "/assets/products/haven-containers.png", alt: "Haven Desktop container list with a details panel", width: 1536, height: 1061, caption: "Replace with a task-specific screenshot and review the alt text before publishing." },
        ],
        sourceRefs: ["README.md#install"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "troubleshooting",
        status: "draft",
        label: "Troubleshooting",
        title: "Resolve common setup and runtime issues",
        blocks: [{ id: "draft-summary", type: "paragraph", text: "Reserved until reproducible public-build procedures are available." }],
        sourceRefs: ["README.md", "docs/docker-users.md"],
        lastReviewedRevision: reviewedAtSource,
      },
    ],
  },
  ko: {
    language: "ko",
    meta: {
      homeLabel: "CELLAXON 홈",
      languageLabel: "언어 선택",
      skipLabel: "도움말 본문으로 건너뛰기",
      tocLabel: "이 페이지에서 다루는 내용",
      tocTitle: "도움말 목차",
      contactLabel: "Haven 문의하기",
    },
    hero: {
      id: "hero",
      status: "출시 준비 중",
      title: "Haven Desktop 도움말",
      lead: "PC에 설치된 wslc를 이용해 컨테이너를 살펴보고 관리하는 Windows 데스크톱 앱입니다.",
      note: "아직 공개 빌드는 없습니다. 출시 전에도 확인할 수 있는 요구 사항과 제품의 범위, 문의 방법부터 정리했습니다.",
      mediaAlt: "Haven Desktop의 컨테이너 목록과 상세 화면",
      sourceRefs: ["README.ko.md#haven-desktop", "README.ko.md#요구-사항", "README.ko.md#설치"],
      lastReviewedRevision: reviewedAtSource,
    },
    boundary: {
      id: "product-boundary",
      title: "제품 경계",
      body: "Haven Desktop은 Microsoft 또는 Docker의 제품이 아니며 두 회사가 보증하거나 지원하지 않습니다.",
      footerLine: "Haven Desktop은 CELLAXON이 독자 개발하는 제품입니다.",
      sourceRefs: ["README.ko.md#면책-조항"],
      lastReviewedRevision: reviewedAtSource,
    },
    sections: [
      {
        id: "overview",
        status: "published",
        label: "제품 소개",
        title: "터미널을 오가지 않고 컨테이너를 관리합니다",
        blocks: [{ id: "summary", type: "paragraph", text: "Haven Desktop은 컨테이너 상태와 로그, 자원 사용량, 이미지, 볼륨, 네트워크, 파일, 세션을 한 화면에서 보여 줍니다. 이미 설치된 wslc로 명령을 실행하며, 되돌리기 어려운 동작은 먼저 확인을 받습니다." }],
        sourceRefs: ["README.ko.md#haven-desktop", "README.ko.md#기능"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "requirements",
        status: "published",
        label: "요구 사항",
        title: "미리 준비할 항목",
        blocks: [
          { id: "summary", type: "paragraph", text: "Haven Desktop은 x64 기반 Windows 10과 Windows 11을 대상으로 준비하고 있습니다." },
          {
            id: "requirements-list",
            type: "facts",
            items: [
              { id: "windows-wsl", title: "Windows와 WSL", body: "x64 기반 Windows 10 또는 11과 WSL이 필요합니다." },
              { id: "wslc-version", title: "wslc 3.0.5 이상", body: "PATH에서 wslc 실행 파일을 찾을 수 있어야 합니다. 없거나 버전이 낮으면 Haven이 설정 안내를 보여 줍니다." },
              { id: "runtime-boundary", title: "실행 환경은 사용자가 준비", body: "Haven은 WSL, wslc, Docker Engine을 포함하거나 설치·변경하지 않습니다. Docker Desktop은 지원하지 않습니다." },
            ],
          },
        ],
        sourceRefs: ["README.ko.md#요구-사항", "README.ko.md#면책-조항", "README.ko.md#기능"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "release-status",
        status: "published",
        label: "시작하기",
        title: "현재는 공개 설치 파일이 없습니다",
        blocks: [{ id: "availability", type: "note", title: "시작하기 전에", text: "Haven Desktop은 출시를 준비하고 있어 다운로드나 설치 절차를 아직 제공하지 않습니다. 공개 빌드가 준비되면 실제로 확인한 설치 방법을 이곳에 안내하겠습니다." }],
        sourceRefs: ["README.ko.md#설치", "SECURITY.md#supported-versions"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "help-topics",
        status: "published",
        label: "도움말 구성",
        title: "실제 작업을 기준으로 문서를 채워 갑니다",
        blocks: [
          { id: "summary", type: "paragraph", text: "공개 빌드와 함께 도움말도 차례로 확장할 예정입니다. 아래 항목은 아직 작성하지 않은 문서로 연결하지 않고, 앞으로 다룰 범위만 보여 줍니다." },
          {
            id: "topic-list",
            type: "facts",
            items: [
              { id: "containers-logs", title: "컨테이너와 로그", body: "상태와 상태 검사를 확인하고, 컨테이너를 시작·중지하며 실시간 로그와 자원 사용량을 살펴봅니다." },
              { id: "resources", title: "이미지·볼륨·네트워크", body: "로컬 자원을 확인하고, 삭제·정리처럼 주의가 필요한 동작이 어떻게 보호되는지 설명합니다." },
              { id: "compose", title: "Compose 프로젝트", body: "지원하는 Compose 구성을 올리고 내리며, Haven이 주요 설정을 어떻게 실행하는지 알아봅니다." },
              { id: "files-shell", title: "파일과 컨테이너 셸", body: "Windows와 컨테이너 사이에서 파일을 옮기고 앱에서 컨테이너 셸을 엽니다." },
              { id: "settings-diagnostics", title: "설정과 진단", body: "앱 사용 환경을 조정하고, 개인정보를 가린 진단 로그를 문의용으로 준비합니다." },
            ],
          },
        ],
        sourceRefs: ["README.ko.md#기능", "docs/docker-users.ko.md"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "privacy-security-support",
        status: "published",
        label: "개인정보·보안·지원",
        title: "내 PC에서 처리하고, 필요한 통신은 분명히 알립니다",
        blocks: [
          { id: "summary", type: "paragraph", text: "Haven에는 CELLAXON 서버 연결, 사용 분석, 광고, 자동 오류 보고 기능이 없습니다. 다만 이미지 받기, 레지스트리 로그인, 태그 확인 같은 레지스트리 작업에는 네트워크를 사용합니다. 제품 문의는 contact@cellaxon.com으로 보내 주세요. 보안 문제라면 제목에 ‘Security’를 넣고, 수정되기 전에는 공개하지 말아 주세요." },
          {
            id: "trust-facts",
            type: "facts",
            items: [
              { id: "local-records", title: "로컬에 저장", body: "설정, 진단 로그, 활동 기록, 파일 전송 기록은 Windows PC에 남습니다." },
              { id: "sensitive-values", title: "민감한 값 보호", body: "레지스트리 암호는 하위 도구의 표준 입력으로 전달합니다. 문의용 진단 로그는 문서에 명시된 비밀 값과 기기 식별 정보를 가리며, 보내기 전에 사용자가 직접 확인할 수 있습니다." },
              { id: "confirmation", title: "먼저 확인", body: "자원 삭제와 파일 덮어쓰기는 되돌리기 어려울 수 있습니다. Haven은 이런 동작을 실행하기 전에 확인을 받습니다." },
            ],
          },
        ],
        sourceRefs: ["docs/privacy.ko.md", "SECURITY.md", "README.ko.md#앱이-파일을-두는-곳", "README.ko.md#문제-신고와-보안"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "install-guide",
        status: "draft",
        label: "설치",
        title: "Haven Desktop 설치하기",
        blocks: [
          { id: "draft-summary", type: "paragraph", text: "검증된 공개 배포 절차를 위한 자리입니다." },
          { id: "draft-steps", type: "steps", title: "설치 순서", items: [{ id: "get-build", title: "공개 빌드 받기", body: "공식 배포 경로를 확인한 뒤 실제 절차로 교체합니다." }] },
          { id: "draft-note", type: "note", title: "참고", text: "공개 빌드가 준비된 뒤에만 게시합니다." },
          { id: "draft-warning", type: "warning", title: "주의", text: "다운로드 위치나 출시일을 추정해서 쓰지 않습니다." },
          { id: "draft-code", type: "code", language: "powershell", caption: "검증한 명령을 이곳에 기록할 수 있습니다", code: "# 공개 빌드에서 직접 확인한 명령만 추가합니다" },
          { id: "draft-image", type: "image", src: "/assets/products/haven-containers.png", alt: "컨테이너 목록과 상세 패널이 보이는 Haven Desktop 화면", width: 1536, height: 1061, caption: "게시 전에 작업에 맞는 화면으로 교체하고 대체 텍스트를 다시 확인합니다." },
        ],
        sourceRefs: ["README.ko.md#설치"],
        lastReviewedRevision: reviewedAtSource,
      },
      {
        id: "troubleshooting",
        status: "draft",
        label: "문제 해결",
        title: "설정과 실행 문제 해결하기",
        blocks: [{ id: "draft-summary", type: "paragraph", text: "공개 빌드에서 재현·검증한 절차가 준비될 때까지 공개하지 않습니다." }],
        sourceRefs: ["README.ko.md", "docs/docker-users.ko.md"],
        lastReviewedRevision: reviewedAtSource,
      },
    ],
  },
};

export function getPublishedSections(language: HavenHelpLanguage) {
  return havenHelpContent[language].sections.filter((section) => section.status === "published");
}
