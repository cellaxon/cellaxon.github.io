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

export type HavenHelpImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type HavenHelpStep = {
  id: string;
  title: string;
  body: string;
  image?: HavenHelpImage;
};

type HavenHelpBlockBase = { id: string };

export type HavenHelpBlock =
  | (HavenHelpBlockBase & { type: "paragraph"; text: string })
  | (HavenHelpBlockBase & { type: "facts"; items: readonly HavenHelpFact[] })
  | (HavenHelpBlockBase & { type: "steps"; title: string; items: readonly HavenHelpStep[] })
  | (HavenHelpBlockBase & { type: "note"; title: string; text: string })
  | (HavenHelpBlockBase & { type: "warning"; title: string; text: string })
  | (HavenHelpBlockBase & { type: "code"; code: string; language?: string; caption?: string })
  | (HavenHelpBlockBase & HavenHelpImage & { type: "image" });

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
    zoomLabel: string;
    closeLabel: string;
  };
  hero: HavenHelpHero;
  boundary: HavenHelpBoundary;
  sections: readonly HavenHelpSection[];
};

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
      zoomLabel: "Enlarge image",
      closeLabel: "Close",
    },
    hero: {
      id: "hero",
      status: "Preparing for release",
      title: "Haven Desktop help",
      lead: "Haven Desktop is a Windows app that uses your existing wslc installation to manage containers.",
      note: "Haven Desktop isn't available to download yet. In the meantime, you can check the system requirements, learn how to manage containers, and find out how to get in touch.",
      mediaAlt: "Haven Desktop container list and details view",
      sourceRefs: ["README.md#haven-desktop", "README.md#requirements", "README.md#install"],
      lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
    },
    boundary: {
      id: "product-boundary",
      title: "About Haven Desktop",
      body: "Haven Desktop is not a Microsoft or Docker product and is not endorsed or supported by either company.",
      footerLine: "Haven Desktop is developed independently by CELLAXON.",
      sourceRefs: ["README.md#disclaimer"],
      lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
    },
    sections: [
      {
        id: "overview",
        status: "published",
        label: "Overview",
        title: "Manage containers from one app",
        blocks: [{ id: "summary", type: "paragraph", text: "Check container status, read logs, and monitor resource usage. You can also manage images, volumes, and networks, browse container files, and open shell sessions. Haven uses your existing wslc installation and asks you to confirm destructive actions." }],
        sourceRefs: ["README.md#haven-desktop", "README.md#features"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      {
        id: "requirements",
        status: "published",
        label: "Requirements",
        title: "System requirements",
        blocks: [
          { id: "summary", type: "paragraph", text: "Set up Windows Subsystem for Linux (WSL) and wslc before using Haven Desktop." },
          {
            id: "requirements-list",
            type: "facts",
            items: [
              { id: "windows-wsl", title: "Windows and WSL", body: "You'll need Windows 10 or 11 (x64) with WSL set up." },
              { id: "wslc-version", title: "wslc 3.0.5 or later", body: "Make sure the wslc executable is on your PATH. If Haven can't find it or the version is too old, the app shows setup instructions." },
              { id: "runtime-boundary", title: "What Haven doesn't install", body: "Haven does not include, install, or modify WSL, wslc, or Docker Engine. Docker Desktop is not supported." },
            ],
          },
        ],
        sourceRefs: ["README.md#requirements", "README.md#disclaimer", "README.md#features"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      {
        id: "release-status",
        status: "published",
        label: "Availability",
        title: "Haven Desktop isn't available to download yet",
        blocks: [{ id: "availability", type: "note", title: "Installation instructions", text: "We'll add tested installation instructions here once a public build is available." }],
        sourceRefs: ["README.md#install", "SECURITY.md#supported-versions"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      {
        id: "help-topics",
        status: "published",
        label: "Features",
        title: "What you can do in Haven Desktop",
        blocks: [
          { id: "summary", type: "paragraph", text: "Haven brings these container tools together in one app. For step-by-step instructions on managing containers and viewing logs, see the next section." },
          {
            id: "topic-list",
            type: "facts",
            items: [
              { id: "containers-logs", title: "Containers and logs", body: "Check container status and health, start and stop containers, view live logs, and monitor resource usage." },
              { id: "resources", title: "Images, volumes, and networks", body: "Browse images, volumes, and networks and remove resources you no longer need." },
              { id: "compose", title: "Compose projects", body: "Use a Compose file to start or stop a group of containers. Some Compose settings aren't supported." },
              { id: "files-shell", title: "Files and container shells", body: "Transfer files between Windows and containers and open a shell in a container." },
              { id: "settings-diagnostics", title: "Settings and diagnostics", body: "Choose a color theme (5 light and 10 dark themes, or follow Windows), change app settings, and prepare a copy of the diagnostic log to send to support." },
            ],
          },
          { id: "file-transfer-controls", type: "note", title: "Upload and download files", text: "In the file transfer window, select the → button between the two lists to copy files from Windows to the container (upload), or the ← button to copy them back (download). Point at a button to see what it does. If files with the same names are already in the container, choose which ones to overwrite, then select “Upload N”, where N is the number of files to upload." },
          { id: "image-removal-guard", type: "warning", title: "Removing an image in use", text: "Haven won't remove an image that a container uses unless you select “Force remove even if containers use it” in the confirmation dialog." },
          { id: "tray-settings", type: "note", title: "Tray and startup settings", text: "In Haven Settings, turn on “Hide to the notification area (tray) when the window is closed” to keep the app running after you close its window. To start Haven without opening a window, turn on “Start at Windows sign-in (in the tray, no window)”. For the Microsoft Store version, open Windows Settings, select Apps, then select Startup to manage automatic startup instead." },
        ],
        sourceRefs: ["README.md#features", "README.md#where-the-app-keeps-its-files", "README.md#feedback-and-security", "README.md#disclaimer", "CHANGELOG.md#added"],
        lastReviewedRevision: "0a7cd9920a7521a1b68ddadde07607c60a79c23f",
      },
      {
        id: "containers-logs",
        status: "published",
        label: "Containers and logs",
        title: "Manage containers and view logs",
        blocks: [
          { id: "goal", type: "paragraph", text: "Use the Containers page to see what's running, start or stop containers, and check logs and resource usage. This guide shows how the app works; it doesn't cover installation." },
          {
            id: "prerequisites",
            type: "facts",
            items: [
              { id: "wslc-ready", title: "wslc 3.0.5 or later", body: "Haven uses the wslc installation on your PC. If it's missing or older than 3.0.5, the app shows setup instructions." },
              { id: "container-list", title: "Container list", body: "Select the container you want to manage. The list includes stopped containers." },
              { id: "docker-engine", title: "Docker Engine in WSL (optional)", body: "To manage containers from a Docker Engine in WSL, open Settings, select Docker engines, and enable the distribution. Its containers appear in the same list, marked with the distribution name, and wslc containers are marked “wslc”. Docker Desktop is not supported." },
            ],
          },
          {
            id: "procedure",
            type: "steps",
            title: "Work with a container",
            items: [
              { id: "find", title: "Find a container", body: "Open Containers. The list updates automatically. Use the “Search by name, image, state, group” field to find a container, or turn on “Group by project” to see related containers together.", image: { src: "/assets/products/haven-help/containers-find-en.png", alt: "Top of the Containers page with the search box and the Group by project switch outlined, above the containers of the blog project.", width: 1096, height: 294, caption: "Search the list, or group it by project." } },
              { id: "control", title: "Start, stop, restart, or force-stop a container", body: "To start a new container, select “Run” at the top right and enter an image. Use the buttons in a container's row to start, stop, restart, or remove it. To force-stop a container, even if it's the only one, check its box in the list, then select “Kill” on the selection bar.", image: { src: "/assets/products/haven-help/containers-control-en.png", alt: "Two selected containers. The selection bar above the list, with Start, Stop, Restart, Kill, Remove, and Clear selection, is outlined, and so are the stop, restart, and remove buttons at the end of each row.", width: 1096, height: 250, caption: "Row buttons act on one container; the selection bar acts on every checked container." } },
              { id: "logs", title: "View live logs", body: "Open the container details and select Logs. Turn on “Follow” to see new lines as they arrive. Use “Search logs” to find a line. You can also copy the output or save it to a file. Drag the left edge of the details to resize them, and press Esc to close them.", image: { src: "/assets/products/haven-help/containers-logs-en.png", alt: "Logs tab of a running container, outlined along with the toolbar below it (Search logs box and the Follow, Timestamps, Copy, Save, and Clear buttons). Follow is on and timestamped INFO and WARN lines from a test container fill the view.", width: 491, height: 472, caption: "With Follow on, new lines appear as they arrive." } },
              { id: "usage", title: "Check resource usage", body: "Select Usage in the container details to see current and recent CPU and memory usage.", image: { src: "/assets/products/haven-help/containers-usage-en.png", alt: "Usage tab of a running container. The tab and the CPU and Memory cards are outlined: CPU at 6.70% and memory at 4.6 MiB, each with its peak and a small chart of recent samples, followed by network and disk cards and the process count.", width: 491, height: 408, caption: "Current CPU and memory, with the last few samples as a chart." } },
            ],
          },
          { id: "verify", type: "note", title: "Check the result", text: "When the list refreshes, check the container's status and health check result. The Activity page records container starts and stops, along with exit codes when available. Haven can send Windows notifications when a container becomes unhealthy or stops unexpectedly. You can turn off each type of notification separately." },
          { id: "verify-image", type: "image", src: "/assets/products/haven-help/containers-verify-en.png", alt: "Details of a running container. The Health check area is outlined: Healthy, the check command (curl -f http://localhost/health), and how often it runs (every 30s, unhealthy after 3 failures).", width: 491, height: 370, caption: "Health check status in the container details. The screenshots in these steps use sample or test containers." },
          { id: "caution", type: "warning", title: "Before removing or cleaning up containers", text: "Haven asks for confirmation before removing containers or cleaning up stopped ones. Back up any data you need first. Cleanup applies only to wslc containers, not to Docker Engine containers in WSL." },
          { id: "recreate-settings", type: "note", title: "Change a container's settings", text: "In the container details, open the ⋯ menu and select “Recreate with the same settings” to change ports, environment variables, or mounts. Haven fills in the settings it can read from the existing container. Check the prefilled values and enter any changes before recreating it." },
          { id: "container-details-actions", type: "note", title: "Other actions in the container details", text: "Open the ⋯ menu in the container details. Choose “Save as image” to create an image from the container, “Change resource limits” to adjust CPU or memory limits without recreating it, or “Attach” to connect to the running container." },
          { id: "registry-network", type: "note", title: "When Haven uses the network", text: "Haven uses the network for registry operations, such as checking for image updates, pulling an image, or signing in to a registry." },
          { id: "containers-screenshot", type: "image", src: "/assets/products/haven-containers.png", alt: "Haven Desktop showing the container list on the left and details for the selected container on the right", width: 1536, height: 1040 },
        ],
        sourceRefs: ["README.md#features", "README.md#requirements", "README.md#disclaimer", "docs/docker-users.md#command-names", "docs/docker-users.md#what-works-differently", "docs/docker-users.md#not-there-yet-and-what-to-do-instead", "docs/privacy.md#summary", "docs/privacy.md#what-the-app-connects-to", "CHANGELOG.md#added"],
        lastReviewedRevision: "0a7cd9920a7521a1b68ddadde07607c60a79c23f",
      },
      {
        id: "privacy-security-support",
        status: "published",
        label: "Privacy and support",
        title: "Data, privacy, and support",
        blocks: [
          { id: "summary", type: "paragraph", text: "The Haven app doesn't send data to CELLAXON and has no analytics, ads, or automatic crash reporting. Registry operations, such as pulling images, signing in, or checking for image updates, use the network. For product questions, email contact@cellaxon.com. To report a vulnerability, include “Security” in the subject and wait until it's fixed before disclosing it publicly." },
          {
            id: "trust-facts",
            type: "facts",
            items: [
              { id: "local-records", title: "Data stored on your PC", body: "Haven stores settings, diagnostic logs, activity history, and file transfer history on your Windows PC." },
              { id: "sensitive-values", title: "Passwords and diagnostic logs", body: "Haven passes registry passwords directly to wslc or Docker without storing them. A diagnostic copy prepared for support hides your username, computer name, and user folder. It can still contain container and image names or other paths, so review it before sending." },
              { id: "confirmation", title: "Confirmation before destructive actions", body: "Haven asks you to confirm before deleting resources or overwriting files." },
            ],
          },
        ],
        sourceRefs: ["docs/privacy.md", "SECURITY.md", "README.md#where-the-app-keeps-its-files", "README.md#feedback-and-security"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      // Draft examples remain available during authoring but are not part of the production bundle.
      ...(import.meta.env.DEV ? ([
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
          { id: "draft-image", type: "image", src: "/assets/products/haven-containers.png", alt: "Haven Desktop container list with a details panel", width: 1536, height: 1040, caption: "Replace with a task-specific screenshot and review the alt text before publishing." },
        ],
        sourceRefs: ["README.md#install"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      {
        id: "troubleshooting",
        status: "draft",
        label: "Troubleshooting",
        title: "Resolve common setup and runtime issues",
        blocks: [{ id: "draft-summary", type: "paragraph", text: "Reserved until reproducible public-build procedures are available." }],
        sourceRefs: ["README.md", "docs/docker-users.md"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      ] satisfies HavenHelpSection[]) : []),
    ],
  },
  ko: {
    language: "ko",
    meta: {
      homeLabel: "CELLAXON 홈",
      languageLabel: "언어 선택",
      skipLabel: "도움말 본문으로 건너뛰기",
      tocLabel: "도움말 목차",
      tocTitle: "도움말 목차",
      contactLabel: "Haven Desktop 문의",
      zoomLabel: "이미지 크게 보기",
      closeLabel: "닫기",
    },
    hero: {
      id: "hero",
      status: "출시 준비 중",
      title: "Haven Desktop 도움말",
      lead: "Haven Desktop은 PC에 설치된 wslc로 컨테이너를 관리하는 Windows 앱입니다.",
      note: "아직 다운로드할 수 없습니다. 필요한 환경과 컨테이너 관리 방법, 문의처를 먼저 확인할 수 있습니다.",
      mediaAlt: "Haven Desktop의 컨테이너 목록과 상세 화면",
      sourceRefs: ["README.ko.md#haven-desktop", "README.ko.md#요구-사항", "README.ko.md#설치"],
      lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
    },
    boundary: {
      id: "product-boundary",
      title: "Haven Desktop 안내",
      body: "Haven Desktop은 Microsoft나 Docker의 제품이 아닙니다. 두 회사는 이 제품을 보증하거나 지원하지 않습니다.",
      footerLine: "Haven Desktop은 CELLAXON이 독자적으로 개발한 제품입니다.",
      sourceRefs: ["README.ko.md#면책-조항"],
      lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
    },
    sections: [
      {
        id: "overview",
        status: "published",
        label: "제품 소개",
        title: "앱에서 컨테이너 관리하기",
        blocks: [{ id: "summary", type: "paragraph", text: "컨테이너 상태와 로그, 자원 사용량을 확인할 수 있습니다. 같은 앱에서 이미지·볼륨·네트워크를 관리하고, 컨테이너의 파일을 열어 보거나 셸을 실행할 수 있습니다. Haven은 PC에 설치된 wslc로 동작하며, 삭제처럼 되돌리기 어려운 작업은 실행 전에 확인을 요청합니다." }],
        sourceRefs: ["README.ko.md#haven-desktop", "README.ko.md#기능"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      {
        id: "requirements",
        status: "published",
        label: "시스템 요구 사항",
        title: "사용에 필요한 환경",
        blocks: [
          { id: "summary", type: "paragraph", text: "Haven Desktop을 사용하려면 WSL(Linux용 Windows 하위 시스템)과 wslc를 먼저 준비해야 합니다." },
          {
            id: "requirements-list",
            type: "facts",
            items: [
              { id: "windows-wsl", title: "Windows와 WSL", body: "Windows 10 또는 11(x64)이 설치된 PC에서 WSL을 설정해야 합니다." },
              { id: "wslc-version", title: "wslc 3.0.5 이상", body: "PATH에서 wslc 실행 파일을 찾을 수 있어야 합니다. 앱에서 파일을 찾지 못하거나 버전이 낮으면 설정 방법을 안내합니다." },
              { id: "runtime-boundary", title: "별도로 준비할 실행 환경", body: "Haven에는 WSL, wslc, Docker Engine이 포함되어 있지 않습니다. 이 도구를 설치하거나 기존 설정을 변경하지도 않습니다. Docker Desktop은 지원하지 않습니다." },
            ],
          },
        ],
        sourceRefs: ["README.ko.md#요구-사항", "README.ko.md#면책-조항", "README.ko.md#기능"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      {
        id: "release-status",
        status: "published",
        label: "출시 상태",
        title: "아직 다운로드할 수 없습니다",
        blocks: [{ id: "availability", type: "note", title: "설치 안내", text: "Haven Desktop을 공개한 뒤 검증을 마친 설치 방법을 이 페이지에서 안내하겠습니다." }],
        sourceRefs: ["README.ko.md#설치", "SECURITY.md#supported-versions"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      {
        id: "help-topics",
        status: "published",
        label: "주요 기능",
        title: "Haven Desktop에서 할 수 있는 일",
        blocks: [
          { id: "summary", type: "paragraph", text: "Haven Desktop은 컨테이너 관리에 필요한 기능을 한곳에 모았습니다. 컨테이너를 시작하거나 로그를 보는 방법은 바로 아래에서 확인할 수 있습니다." },
          {
            id: "topic-list",
            type: "facts",
            items: [
              { id: "containers-logs", title: "컨테이너와 로그", body: "컨테이너를 시작하거나 중지하고, 작동 상태와 실시간 로그, 자원 사용량을 확인합니다." },
              { id: "resources", title: "이미지·볼륨·네트워크", body: "이미지, 볼륨, 네트워크를 확인하고 더 이상 쓰지 않는 자원을 삭제할 수 있습니다." },
              { id: "compose", title: "Compose 프로젝트", body: "여러 컨테이너를 하나의 구성으로 정의하는 Compose 파일을 열어 프로젝트를 시작하거나 종료할 수 있습니다. 일부 설정은 지원하지 않습니다." },
              { id: "files-shell", title: "파일과 컨테이너 셸", body: "Windows와 컨테이너 사이에서 파일을 옮기고 앱에서 컨테이너 셸을 엽니다." },
              { id: "settings-diagnostics", title: "설정과 진단", body: "색 테마(라이트 5가지·다크 10가지, 또는 Windows 설정 따름)를 고르고, 앱 설정을 바꾸거나 문제를 문의할 때 보낼 진단 로그 사본을 만들 수 있습니다." },
            ],
          },
          { id: "file-transfer-controls", type: "note", title: "파일 올리기와 내려받기", text: "파일 창에서 Windows의 파일을 컨테이너로 보내려면(올리기) 두 목록 사이의 → 버튼을 누릅니다. 컨테이너의 파일을 Windows로 가져오려면(내려받기) ← 버튼을 누릅니다. 버튼에 마우스를 올리면 하는 일이 표시됩니다. 컨테이너에 이름이 같은 파일이 있으면 덮어쓸 파일을 선택한 뒤 ‘N개 올리기’ 버튼을 누릅니다. N은 올릴 파일의 개수입니다." },
          { id: "image-removal-guard", type: "warning", title: "사용 중인 이미지 삭제", text: "컨테이너가 사용하는 이미지는 삭제 확인 창에서 ‘컨테이너가 쓰고 있어도 강제로 삭제’를 직접 선택한 경우에만 삭제할 수 있습니다." },
          { id: "tray-settings", type: "note", title: "트레이와 자동 시작 설정", text: "Haven 설정에서 ‘창을 닫으면 알림 영역(트레이)으로 숨기기’를 켜면 창을 닫아도 앱이 계속 실행됩니다. ‘Windows 로그인 때 자동 시작(창 없이 트레이로)’을 켜면 로그인할 때 창을 열지 않고 앱이 시작됩니다. Microsoft Store 버전의 자동 시작은 Haven 설정 대신 Windows 설정의 ‘앱’에 있는 ‘시작 프로그램’에서 설정합니다." },
        ],
        sourceRefs: ["README.ko.md#기능", "README.md#features", "README.ko.md#앱이-파일을-두는-곳", "README.ko.md#문제-신고와-보안", "README.ko.md#면책-조항", "CHANGELOG.md#added"],
        lastReviewedRevision: "0a7cd9920a7521a1b68ddadde07607c60a79c23f",
      },
      {
        id: "containers-logs",
        status: "published",
        label: "컨테이너와 로그",
        title: "컨테이너 관리와 로그 확인",
        blocks: [
          { id: "goal", type: "paragraph", text: "컨테이너 화면에서 실행 중인 컨테이너를 확인하거나, 컨테이너를 시작하고 중지할 수 있습니다. 아래에서는 로그와 자원 사용량을 확인하는 방법도 안내합니다. 설치 방법은 다루지 않습니다." },
          {
            id: "prerequisites",
            type: "facts",
            items: [
              { id: "wslc-ready", title: "wslc 3.0.5 이상", body: "Haven은 PC에 설치된 wslc를 사용합니다. wslc가 없거나 버전이 3.0.5보다 낮으면 앱에서 설정 방법을 안내합니다." },
              { id: "container-list", title: "컨테이너 목록", body: "목록에서 관리할 컨테이너를 선택합니다. 중지된 컨테이너도 목록에 표시됩니다." },
              { id: "docker-engine", title: "WSL의 Docker Engine(선택 사항)", body: "WSL에 설치한 Docker Engine의 컨테이너를 관리하려면 설정에서 ‘Docker 엔진’을 열고 해당 배포판을 선택합니다. 그 배포판의 컨테이너는 같은 목록에 배포판 이름과 함께 표시되고, wslc 컨테이너에는 ‘wslc’ 표시가 붙습니다. Docker Desktop은 지원하지 않습니다." },
            ],
          },
          {
            id: "procedure",
            type: "steps",
            title: "컨테이너 관리 순서",
            items: [
              { id: "find", title: "컨테이너 찾기", body: "컨테이너 화면을 열면 목록이 자동으로 갱신됩니다. ‘이름·이미지·상태·그룹으로 찾기’ 검색창을 이용하거나 ‘프로젝트별로 묶기’를 켜서 같은 프로젝트의 컨테이너를 모아 볼 수 있습니다.", image: { src: "/assets/products/haven-help/containers-find-ko.png", alt: "컨테이너 화면 위쪽. 검색창과 ‘프로젝트별로 묶기’ 스위치에 테두리가 있고, 아래에 blog 프로젝트의 컨테이너가 묶여 있습니다.", width: 1096, height: 294, caption: "검색으로 좁히거나 프로젝트별로 묶어 봅니다." } },
              { id: "control", title: "시작·중지·다시 시작·강제 종료", body: "새 컨테이너는 화면 오른쪽 위의 ‘실행’ 버튼을 누르고 이미지를 입력해 실행합니다. 시작, 중지, 다시 시작, 삭제는 컨테이너 목록에서 해당 행의 버튼을 누릅니다. 강제 종료는 행에 버튼이 없습니다. 컨테이너를 하나만 강제 종료할 때도 목록에서 해당 컨테이너를 체크한 뒤 선택 막대의 ‘강제 종료’ 버튼을 누릅니다.", image: { src: "/assets/products/haven-help/containers-control-ko.png", alt: "컨테이너 두 개를 체크한 화면. 목록 위 선택 막대(시작·중지·재시작·강제 종료·삭제·선택 해제)와 각 행 끝의 중지·재시작·삭제 버튼에 테두리가 있습니다.", width: 1096, height: 250, caption: "행의 버튼은 그 컨테이너 하나에, 선택 막대는 체크한 컨테이너 전부에 적용됩니다." } },
              { id: "logs", title: "실시간 로그 보기", body: "컨테이너 상세 화면에서 ‘로그’를 선택합니다. ‘따라가기’를 켜면 새 로그가 기록되는 대로 표시됩니다. ‘로그 검색’으로 필요한 내용을 찾고, 로그를 복사하거나 파일로 저장할 수 있습니다. 상세 화면은 왼쪽 가장자리를 끌어 폭을 바꾸고, Esc를 누르면 닫힙니다.", image: { src: "/assets/products/haven-help/containers-logs-ko.png", alt: "실행 중인 컨테이너의 ‘로그’ 탭. 탭과 그 아래 도구 막대(로그 검색 칸, 따라가기·시각·복사·저장·지우기 버튼)에 테두리가 있고, 따라가기가 켜진 채 시험용 컨테이너의 시각이 붙은 INFO·WARN 로그가 이어집니다.", width: 491, height: 472, caption: "‘따라가기’를 켜면 새 로그가 들어오는 대로 표시됩니다." } },
              { id: "usage", title: "자원 사용량 보기", body: "컨테이너 상세 화면에서 ‘사용량’을 선택하면 현재 CPU·메모리 사용량과 최근 기록을 확인할 수 있습니다.", image: { src: "/assets/products/haven-help/containers-usage-ko.png", alt: "실행 중인 컨테이너의 ‘사용량’ 탭. 탭과 CPU·메모리 카드에 테두리가 있고, CPU 6.70%와 메모리 4.6 MiB가 최댓값, 최근 기록 그래프와 함께 보입니다. 아래에는 네트워크·디스크 카드와 프로세스 수가 있습니다.", width: 491, height: 408, caption: "현재 CPU·메모리 사용량과 최근 기록 그래프입니다." } },
            ],
          },
          { id: "verify", type: "note", title: "작업 결과 확인", text: "목록이 갱신되면 컨테이너가 실행 중인지, 정상적으로 작동하는지 확인할 수 있습니다. 활동 화면에는 시작·종료 내역이 남고, 종료 코드도 확인할 수 있습니다. 컨테이너에 이상이 생기거나 예기치 않게 중지되면 Windows 알림을 받을 수 있습니다. 알림은 종류별로 끌 수 있습니다." },
          { id: "verify-image", type: "image", src: "/assets/products/haven-help/containers-verify-ko.png", alt: "실행 중인 컨테이너의 상세 화면. 상태 검사 영역에 테두리가 있고, ‘정상’과 검사 명령(curl -f http://localhost/health), 검사 주기(30초 간격, 3번 실패 시 비정상)가 보입니다.", width: 491, height: 370, caption: "컨테이너 상세 화면의 상태 검사 결과입니다. 단계별 화면은 예시·시험용 컨테이너로 만들었습니다." },
          { id: "caution", type: "warning", title: "컨테이너를 삭제하거나 정리하기 전에", text: "컨테이너를 삭제하거나 중지된 컨테이너를 정리할 때는 Haven이 먼저 확인을 요청합니다. 필요한 데이터는 미리 백업합니다. 정리 기능은 wslc 컨테이너에만 적용되며, WSL에 설치한 Docker Engine의 컨테이너는 정리하지 않습니다." },
          { id: "recreate-settings", type: "note", title: "컨테이너 설정 바꾸기", text: "포트, 환경 변수, 마운트를 바꾸려면 컨테이너 상세 화면에서 ⋯ 메뉴를 열고 ‘같은 설정으로 다시 만들기’를 선택합니다. 앱이 읽어 온 기존 설정이 입력란에 표시됩니다. 다시 만들기 전에 기존 값을 확인하고 변경할 값을 입력합니다." },
          { id: "container-details-actions", type: "note", title: "컨테이너 상세 메뉴의 다른 기능", text: "컨테이너 상세 화면에서 ⋯ 메뉴를 엽니다. ‘이미지로 만들기’를 선택하면 컨테이너를 이미지로 저장할 수 있습니다. ‘자원 제한 바꾸기’를 선택하면 컨테이너를 다시 만들지 않고 CPU나 메모리 제한을 바꿀 수 있습니다. ‘연결(attach)’을 선택하면 실행 중인 컨테이너에 연결할 수 있습니다." },
          { id: "registry-network", type: "note", title: "네트워크를 사용하는 경우", text: "Haven은 이미지 업데이트를 확인하거나 이미지를 받는 등 레지스트리에서 작업할 때 네트워크를 사용합니다. 레지스트리에 로그인할 때도 네트워크에 연결합니다." },
          { id: "containers-screenshot", type: "image", src: "/assets/products/haven-containers.png", alt: "왼쪽에 컨테이너 목록, 오른쪽에 선택한 컨테이너의 상세 정보가 보이는 Haven Desktop 화면", width: 1536, height: 1040 },
        ],
        sourceRefs: ["README.ko.md#기능", "README.ko.md#요구-사항", "README.ko.md#면책-조항", "docs/docker-users.ko.md#명령-이름", "docs/docker-users.ko.md#다르게-동작하는-것", "docs/docker-users.ko.md#아직-없는-것과-대신할-방법", "docs/privacy.ko.md#요약", "docs/privacy.ko.md#앱이-접속하는-곳", "CHANGELOG.md#added"],
        lastReviewedRevision: "0a7cd9920a7521a1b68ddadde07607c60a79c23f",
      },
      {
        id: "privacy-security-support",
        status: "published",
        label: "개인정보와 지원",
        title: "데이터 저장, 개인정보, 문의",
        blocks: [
          { id: "summary", type: "paragraph", text: "Haven Desktop 앱은 CELLAXON에 데이터를 보내지 않습니다. 사용 통계를 수집하거나 광고를 표시하지 않으며, 오류를 자동으로 보고하지도 않습니다. 이미지를 받거나 업데이트를 확인하는 등 레지스트리 작업에는 네트워크를 사용합니다. 제품 문의와 보안 취약점 제보는 contact@cellaxon.com으로 받습니다. 보안 취약점을 제보할 때는 메일 제목에 ‘Security’를 넣고, 문제가 해결될 때까지 공개를 삼가 주시기 바랍니다." },
          {
            id: "trust-facts",
            type: "facts",
            items: [
              { id: "local-records", title: "PC에 저장하는 데이터", body: "설정, 진단 로그, 활동 기록, 파일 전송 기록은 Windows PC에 저장됩니다." },
              { id: "sensitive-values", title: "비밀번호와 진단 로그", body: "Haven은 레지스트리 비밀번호를 wslc나 Docker에 직접 전달하며 따로 저장하지 않습니다. 문의용 진단 로그 사본은 사용자 이름, 컴퓨터 이름, 사용자 폴더를 가립니다. 컨테이너와 이미지 이름, 다른 파일 경로는 남을 수 있으므로 사본을 보내기 전에 내용을 확인합니다." },
              { id: "confirmation", title: "삭제와 덮어쓰기 확인", body: "Haven은 자원을 삭제하거나 파일을 덮어쓰기 전에 확인을 요청합니다." },
            ],
          },
        ],
        sourceRefs: ["docs/privacy.ko.md", "SECURITY.md", "README.ko.md#앱이-파일을-두는-곳", "README.ko.md#문제-신고와-보안"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      ...(import.meta.env.DEV ? ([
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
          { id: "draft-image", type: "image", src: "/assets/products/haven-containers.png", alt: "컨테이너 목록과 상세 패널이 보이는 Haven Desktop 화면", width: 1536, height: 1040, caption: "게시 전에 작업에 맞는 화면으로 교체하고 대체 텍스트를 다시 확인합니다." },
        ],
        sourceRefs: ["README.ko.md#설치"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      {
        id: "troubleshooting",
        status: "draft",
        label: "문제 해결",
        title: "설정과 실행 문제 해결하기",
        blocks: [{ id: "draft-summary", type: "paragraph", text: "공개 빌드에서 재현·검증한 절차가 준비될 때까지 공개하지 않습니다." }],
        sourceRefs: ["README.ko.md", "docs/docker-users.ko.md"],
        lastReviewedRevision: "1fd347cb91b0fce96dcac9a5be076c8e07558d3b",
      },
      ] satisfies HavenHelpSection[]) : []),
    ],
  },
};

export function getPublishedSections(language: HavenHelpLanguage) {
  return havenHelpContent[language].sections.filter((section) => section.status === "published");
}
