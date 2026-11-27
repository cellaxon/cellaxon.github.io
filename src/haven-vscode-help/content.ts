import type { HavenHelpImage, HavenHelpLanguage, HavenHelpPageContent } from "../haven-help/content";

// Source: the extension's own guide (docs/guide/README.md and README.ko.md in the haven-vscode repository).
// The screenshots come from the same guide and show its demo data, not real containers.
const REVIEWED = "haven-vscode 0.2.0 guide";
const GUIDE = { en: "docs/guide/README.md", ko: "docs/guide/README.ko.md" } as const;

function evidence(language: HavenHelpLanguage, ...anchors: string[]) {
  return { sourceRefs: anchors.map((anchor) => `${GUIDE[language]}#${anchor}`), lastReviewedRevision: REVIEWED };
}

function shot(language: HavenHelpLanguage, name: string, alt: string, caption?: string): HavenHelpImage {
  return { src: `/assets/products/haven-vscode/${name}-${language}.png`, alt, width: 1600, height: 1000, caption };
}

const en: HavenHelpPageContent = {
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
    status: "Available now",
    title: "Haven for VS Code help",
    lead: "Haven for VS Code lets you manage your wslc containers without leaving the editor. wslc is the container tool that ships with WSL.",
    note: "Install it from the VS Code Marketplace or Open VSX. The screenshots on this page use sample data, so your own containers will look different.",
    mediaAlt: "VS Code with the Haven sidebar listing containers and a container details tab",
    ...evidence("en", "haven-for-vs-code--user-guide", "getting-started"),
  },
  boundary: {
    id: "product-boundary",
    title: "About Haven for VS Code",
    body: "Haven for VS Code is not a Microsoft or Docker product and is not endorsed or supported by either company.",
    footerLine: "Haven for VS Code is developed independently by CELLAXON.",
    ...evidence("en", "haven-for-vs-code--user-guide"),
  },
  sections: [
    {
      id: "overview",
      status: "published",
      label: "Overview",
      title: "Container work inside the editor",
      blocks: [
        { id: "summary", type: "paragraph", text: "Haven for VS Code brings the everyday work of Haven Desktop into VS Code: containers, Compose projects, logs, resource usage, images, volumes, networks, ports, file transfers, and an activity history. Every action that removes something or force-stops a container asks for confirmation first." },
      ],
      ...evidence("en", "haven-for-vs-code--user-guide", "containers"),
    },
    {
      id: "getting-started",
      status: "published",
      label: "Getting started",
      title: "Requirements and installation",
      blocks: [
        {
          id: "requirements",
          type: "facts",
          items: [
            { id: "windows-wsl", title: "Windows and WSL", body: "Windows 10 or 11 with WSL that includes wslc 3.0.5 or later." },
            { id: "vscode", title: "VS Code 1.106 or later", body: "The extension runs on your Windows PC, next to VS Code." },
          ],
        },
        {
          id: "install",
          type: "steps",
          title: "Install and open Haven",
          items: [
            { id: "install-extension", title: "Install the extension", body: "Search for “Haven for VS Code” in the Extensions view and install it. It is published on the VS Code Marketplace and on Open VSX. If you have a .vsix file instead, open the Extensions view, select the … menu, and choose “Install from VSIX”." },
            { id: "open-sidebar", title: "Open the Haven sidebar", body: "Select the Haven icon in the Activity Bar." },
            { id: "check-wslc", title: "Check that wslc is found", body: "When Haven finds wslc, your containers appear right away. If wslc is missing or too old, the sidebar shows a setup guide. To use a wslc installed somewhere else, put its full path in the haven.wslcPath setting, or in the HAVEN_DESKTOP_WSLC environment variable that Haven Desktop also reads." },
          ],
        },
        { id: "background", type: "note", title: "Haven starts with VS Code", text: "The extension starts in the background once VS Code has loaded. Even with the sidebar closed, the status bar shows how many containers are running, and you're notified when a container turns unhealthy or stops unexpectedly." },
      ],
      ...evidence("en", "getting-started"),
    },
    {
      id: "sidebar",
      status: "published",
      label: "The sidebar",
      title: "A tour of the sidebar",
      blocks: [
        {
          id: "areas",
          type: "table",
          columns: ["Where", "What it does"],
          rows: [
            ["Header", "“Live” means Haven is connected to wslc events, so changes show at once. It reads “Polling” when the connection drops. A count such as 6/8 is running containers out of all containers. Refresh and Run are here too."],
            ["Icon tabs", "Containers, Images, Volumes, Networks, Ports, Activity, Usage, and System, each with a count. Widen the sidebar to see their names."],
            ["… in the view title", "Compose up, pull, build, or load images, create volumes and networks, prune, sign in to and out of a registry, and more."],
            ["Status bar", "The number of running containers and how many are unhealthy. Select it to open the sidebar."],
          ],
        },
        { id: "palette", type: "note", title: "Command Palette", text: "Most actions are also in the Command Palette (Ctrl+Shift+P) under “Haven:”." },
      ],
      ...evidence("en", "a-tour-of-the-sidebar"),
    },
    {
      id: "containers",
      status: "published",
      label: "Containers",
      title: "Find and control containers",
      blocks: [
        { id: "screenshot", type: "image", ...shot("en", "containers", "Haven sidebar with containers grouped into the blog and shop projects, next to the details of the shop-api-1 container, whose health check is failing.", "Containers grouped by project, with the details of one container in an editor tab.") },
        {
          id: "features",
          type: "facts",
          items: [
            { id: "groups", title: "Grouped by project", body: "Containers are grouped by the Compose project label (com.docker.compose.project). From a group header you can start, restart, or stop them all. Its … menu has Select all, “Bring down Compose project”, and Remove all. Change the labels with the haven.groupLabels setting." },
            { id: "state", title: "Status on every row", body: "Each row shows whether the container is running, its health check result (Healthy or Unhealthy), and its exit code, such as “Stopped (1)”. Select an open port, such as :8080, to open it in the browser." },
            { id: "row-actions", title: "Row actions", body: "Hover over a row, or focus it with the keyboard, to show Start or Stop, Restart, Remove, and a … menu with Details, Logs, Terminal, Attach, Files, Inspect (JSON), Copy ID, Export filesystem, and Kill. In a wide sidebar the buttons are always shown." },
            { id: "selection", title: "Bulk actions", body: "Select the check boxes of several containers to start, stop, or remove them together." },
            { id: "search", title: "Search and prune", body: "Search by name, image, state, or group. Remove stopped containers with the Prune button above the list." },
            { id: "keyboard", title: "Keyboard", body: "Enter opens the details, Space selects, and Delete removes." },
          ],
        },
      ],
      ...evidence("en", "containers"),
    },
    {
      id: "container-details",
      status: "published",
      label: "Container details",
      title: "Info, logs, usage, and files",
      blocks: [
        { id: "summary", type: "paragraph", text: "Select a row to open the container's details in an editor tab. Terminal opens a shell in the VS Code terminal (wslc exec -it), and Console attaches to the container's main process." },
        { id: "info", type: "note", title: "Info", text: "The Info tab shows the state, the health check with its recent results, the command, ports (open in the browser or copy), mounts, networks, environment variables, and labels. Environment variable values are hidden by default." },
        { id: "logs", type: "paragraph", text: "Logs: follow new lines, choose how many lines to load, filter, show timestamps, wrap lines, copy, and save to a file." },
        { id: "logs-image", type: "image", ...shot("en", "logs", "Logs tab of a container in a VS Code editor tab, with Follow turned on and web server access log lines filling the view.", "The Logs tab with Follow turned on.") },
        { id: "usage", type: "paragraph", text: "Usage: CPU and memory with a short history, plus network and disk I/O." },
        { id: "usage-image", type: "image", ...shot("en", "usage", "Usage tab of a container showing CPU and memory with small history charts, and network and disk I/O.", "CPU and memory, each with a short history.") },
        { id: "files", type: "paragraph", text: "Files: a Windows folder on the left and a container folder on the right." },
        { id: "files-image", type: "image", ...shot("en", "files", "Files tab with a Windows project folder on the left and the root folder of the shop-api-1 container on the right, with arrow buttons between them.", "Copy files in either direction with the arrow buttons between the two lists.") },
        {
          id: "files-tips",
          type: "facts",
          items: [
            { id: "copy", title: "Copy several files", body: "Select several with Ctrl or Shift, then drag them to the other side or use the arrow buttons in the middle." },
            { id: "explorer", title: "Upload from the Explorer", body: "Hold Shift while you drag from the VS Code Explorer to upload into the container." },
            { id: "overwrite", title: "When names already exist", body: "A table compares sizes and times so you can choose what to overwrite." },
            { id: "open", title: "Open and navigate", body: "Double-click a small file to open a copy in the editor. Backspace goes to the folder above." },
          ],
        },
      ],
      ...evidence("en", "container-details"),
    },
    {
      id: "run",
      status: "published",
      label: "Run a container",
      title: "Run a container from a form",
      blocks: [
        { id: "summary", type: "paragraph", text: "Open the form with Run in the sidebar header, or with the ▷ button on an image row. It checks your input with the same rules as Haven Desktop." },
        { id: "screenshot", type: "image", ...shot("en", "run", "Run form in the Haven sidebar with fields for the image, name, command, and restart policy.", "The Run form.") },
        {
          id: "fields",
          type: "facts",
          items: [
            { id: "basics", title: "Basics", body: "Image (pulled first if it's missing), name, command, restart policy, and remove when it exits (--rm)." },
            { id: "ports-volumes", title: "Ports and volumes", body: "Publish ports, and mount Windows folders or volumes." },
            { id: "environment", title: "Environment", body: "Environment variables and env files." },
            { id: "advanced", title: "Advanced", body: "Network and alias, memory and CPU limits, working folder, user, entrypoint, host name, labels, health check, GPUs, interactive mode, and other wslc run options." },
          ],
        },
      ],
      ...evidence("en", "running-a-container"),
    },
    {
      id: "compose",
      status: "published",
      label: "Compose",
      title: "Bring up a Compose project",
      blocks: [
        { id: "summary", type: "paragraph", text: "wslc has no Compose, so Haven reads the Compose file and runs the equivalent network create, volume create, and run commands in order, with Docker Compose labels. It waits for depends_on health and completion conditions, and builds images from build: entries." },
        { id: "screenshot", type: "image", ...shot("en", "compose", "Compose up panel for the shop project listing three services in start order, a tools profile, and one warning about an unsupported restart value.", "Review the services, profiles, and warnings before anything runs.") },
        {
          id: "procedure",
          type: "steps",
          title: "Bring a project up and down",
          items: [
            { id: "open", title: "Open the Compose file", body: "Right-click a compose.yaml in the Explorer, or select Compose on the Containers page." },
            { id: "review", title: "Review what will run", body: "Before anything runs, Haven shows every service in start order, the Windows folders it will open to containers, the profiles you can turn on, and warnings for keys that aren't supported." },
            { id: "down", title: "Bring the project down", body: "On the project's group header, open the … menu and select “Bring down Compose project”." },
          ],
        },
      ],
      ...evidence("en", "bringing-up-a-compose-project"),
    },
    {
      id: "images",
      status: "published",
      label: "Images",
      title: "Pull, build, and manage images",
      blocks: [
        { id: "screenshot", type: "image", ...shot("en", "images", "Images tab of the Haven sidebar listing images with badges such as used by, latest, local, and update.", "Badges show which images are in use, local, or have a newer version.") },
        {
          id: "features",
          type: "facts",
          items: [
            { id: "pull", title: "Pull", body: "Pull an image, watch its progress, and cancel if you need to." },
            { id: "build", title: "Build", body: "Build from a Dockerfile and set the context, tag, build arguments, target stage, and no-cache option. You can also right-click a Dockerfile in the Explorer." },
            { id: "updates", title: "Check for newer versions", body: "If the tag of a public image you pulled now points to a newer image in the registry, the image gets an “update” badge. Haven checks only when you ask." },
            { id: "other", title: "Other actions", body: "Push, tag, save to and load from a tar file, import a filesystem tar, inspect, remove, and prune." },
            { id: "badges", title: "Badges", body: "“used by N” is the number of containers using the image, and “local” means the image wasn't pulled from a registry. There are also “latest” and “update” badges." },
          ],
        },
      ],
      ...evidence("en", "images"),
    },
    {
      id: "volumes-networks-ports",
      status: "published",
      label: "Volumes, networks, ports",
      title: "Volumes, networks, and ports",
      blocks: [
        {
          id: "features",
          type: "facts",
          items: [
            { id: "volumes-networks", title: "Volumes and networks", body: "Create, inspect, remove, and prune them, and connect or disconnect containers." },
            { id: "ports", title: "Ports", body: "Every published port in one list. Select a port to open it in the browser." },
          ],
        },
      ],
      ...evidence("en", "volumes-networks-and-ports"),
    },
    {
      id: "activity-transfers",
      status: "published",
      label: "Activity and transfers",
      title: "Activity history and file transfers",
      blocks: [
        { id: "activity", type: "paragraph", text: "The Activity tab collects what happened in time order: containers starting and stopping, health changes, image pulls, and volumes created. Filter by kind or search by name." },
        { id: "activity-image", type: "image", ...shot("en", "activity", "Activity tab listing container starts and stops, health changes, and image pulls in time order.", "The Activity tab.") },
        { id: "transfers", type: "paragraph", text: "File transfers records container file copies, image save and load, and filesystem export and import, with full paths, size, and result. You can show a file in Explorer or retry a transfer that failed." },
        { id: "transfers-image", type: "image", ...shot("en", "transfers", "File transfers list with the path, size, and result of each copy, save, and export.", "The file transfer history.") },
      ],
      ...evidence("en", "activity-and-file-transfers"),
    },
    {
      id: "usage-disk",
      status: "published",
      label: "Usage and disk",
      title: "Usage, disk, and session",
      blocks: [
        { id: "containers", type: "paragraph", text: "Usage → Containers shows the CPU and memory of running containers side by side. Haven reads these statistics only while this screen is visible." },
        { id: "disk", type: "paragraph", text: "Usage → Disk & session shows how much space the session disk takes up on your Windows drive, how much is used inside the session, and an estimate of the space you could reclaim. Below that, you can edit the session resources in the wslc settings file: CPUs, memory, disk limit, and idle timeout." },
        { id: "disk-image", type: "image", ...shot("en", "disk", "Disk & session screen showing the session disk size, usage inside the session, reclaimable space, and fields for session resources.", "Session disk usage and the session resource settings.") },
        { id: "settings-file", type: "note", title: "How Haven edits the wslc settings file", text: "Haven changes only the keys you edit and keeps the comments in the file. The first time, it saves the original as a .bak file." },
      ],
      ...evidence("en", "usage-disk-and-session"),
    },
    {
      id: "system",
      status: "published",
      label: "System",
      title: "System and diagnostics",
      blocks: [
        { id: "summary", type: "paragraph", text: "The System tab shows the wslc, session manager, kernel, and Windows versions and the running sessions. You can end a session from here." },
        { id: "screenshot", type: "image", ...shot("en", "system", "System tab showing version numbers, the running sessions, and buttons for the diagnostic log.", "Versions, sessions, and the diagnostic log.") },
        { id: "diagnostics", type: "note", title: "Reporting a problem", text: "“Show diagnostic log” opens the log of commands Haven ran. “Make a copy to send” creates a copy that masks your user folder, user name, and computer name, so you can attach it when you report a problem." },
      ],
      ...evidence("en", "system-and-diagnostics"),
    },
    {
      id: "docker-engine",
      status: "published",
      label: "Docker Engine in WSL",
      title: "Docker Engine in WSL distributions",
      blocks: [
        { id: "summary", type: "paragraph", text: "If you installed Docker Engine (docker-ce) in a WSL distribution, turn it on with the command “Haven: Manage Docker Engines in WSL Distributions…”, or with “Choose distributions” on the System tab. Its containers, images, volumes, and networks then appear together with those of wslc, marked with the distribution's name, and the same actions work on them." },
        { id: "forms", type: "note", title: "Where new resources are created", text: "Forms gain a “Create in” option. Compose projects in a distribution use that distribution's docker compose." },
        { id: "limits", type: "warning", title: "Limits", text: "Prune only removes wslc resources. Docker Desktop isn't supported." },
      ],
      ...evidence("en", "docker-engine-in-wsl-distributions"),
    },
    {
      id: "theme-language",
      status: "published",
      label: "Theme and language",
      title: "Theme and language",
      blocks: [
        { id: "theme", type: "paragraph", text: "By default Haven follows your VS Code color theme. To use Haven Desktop's navy and sky-blue colors, set haven.appearance.palette to haven. High-contrast themes always use the theme colors." },
        { id: "light-image", type: "image", ...shot("en", "containers-light", "The Haven sidebar and container details in a light VS Code color theme.", "Haven in a light theme.") },
        { id: "language", type: "paragraph", text: "The interface is in English and Korean. It follows the VS Code display language. Set haven.language to choose one yourself." },
      ],
      ...evidence("en", "theme-and-language"),
    },
    {
      id: "settings",
      status: "published",
      label: "Settings",
      title: "Settings",
      blocks: [
        {
          id: "settings-table",
          type: "table",
          columns: ["Setting", "Default", "What it does"],
          rows: [
            ["haven.wslcPath", "", "Full path to wslc.exe"],
            ["haven.session", "", "wslc session to use (--session)"],
            ["haven.refreshInterval", "5", "Seconds between container list reads"],
            ["haven.groupLabels", "[\"com.docker.compose.project\"]", "Labels that group containers into projects"],
            ["haven.groupByDefault", "true", "Group containers by project in the sidebar"],
            ["haven.appearance.palette", "vscode", "vscode (follow the color theme) or haven (Haven Desktop colors)"],
            ["haven.language", "auto", "auto, en, or ko"],
            ["haven.notifications.unhealthy", "true", "Notify when a container turns unhealthy"],
            ["haven.notifications.unexpectedExit", "true", "Notify when a container stops with a non-zero code"],
            ["haven.terminal.shell", "/bin/sh", "Shell to open in containers"],
            ["haven.logs.tail", "500", "Log lines to load first"],
            ["haven.details.revealEnvironment", "false", "Show environment variable values"],
            ["haven.statusBar", "true", "Show the running count in the status bar"],
            ["haven.dockerEngines", "[]", "WSL distributions whose Docker Engine to show"],
          ],
        },
      ],
      ...evidence("en", "settings"),
    },
    {
      id: "privacy-support",
      status: "published",
      label: "Privacy and support",
      title: "Privacy and support",
      blocks: [
        { id: "summary", type: "paragraph", text: "Everything runs on your PC through wslc, and through wsl.exe for the Docker engines you turn on. The only network access is “Check for newer versions” on the Images tab, which asks the image's registry for the tag's current digest without signing in and without cookies." },
        { id: "log", type: "note", title: "What the output channel records", text: "The Haven output channel records the commands Haven runs. Environment variable and build argument values are masked there." },
        { id: "contact", type: "paragraph", text: "For product questions, email contact@cellaxon.com." },
      ],
      ...evidence("en", "privacy"),
    },
    {
      id: "troubleshooting",
      status: "published",
      label: "Troubleshooting",
      title: "Troubleshooting",
      blocks: [
        {
          id: "problems",
          type: "table",
          columns: ["Symptom", "What to try"],
          rows: [
            ["The sidebar only shows the setup guide", "Check that wslc --version reports 3.0.5 or later. If wslc is installed somewhere else, set haven.wslcPath."],
            ["“Polling” instead of “Live”", "The event connection dropped, so Haven re-reads the list every few seconds. Everything still works, and the extension reconnects by itself, waiting a little longer between attempts."],
            ["Haven shows the wrong session", "Put the session name in haven.session. The System tab lists the running sessions."],
            ["You want to see which commands Haven ran", "On the System tab, select “Show diagnostic log” (the Haven output channel)."],
            ["You want to report a problem", "On the System tab, select “Make a copy to send” to create a log with personal details masked, and attach it."],
          ],
        },
      ],
      ...evidence("en", "troubleshooting"),
    },
  ],
};

const ko: HavenHelpPageContent = {
  language: "ko",
  meta: {
    homeLabel: "CELLAXON 홈",
    languageLabel: "언어 선택",
    skipLabel: "도움말 본문으로 건너뛰기",
    tocLabel: "도움말 목차",
    tocTitle: "도움말 목차",
    contactLabel: "Haven for VS Code 문의",
    zoomLabel: "이미지 크게 보기",
    closeLabel: "닫기",
  },
  hero: {
    id: "hero",
    status: "제공 중",
    title: "Haven for VS Code 도움말",
    lead: "Haven for VS Code는 WSL에 포함된 컨테이너 도구 wslc로 실행하는 컨테이너를 VS Code 안에서 관리하는 확장입니다.",
    note: "VS Code Marketplace나 Open VSX에서 설치할 수 있습니다. 이 페이지의 화면은 예제 데이터로 만든 것이어서 실제 화면과 내용이 다릅니다.",
    mediaAlt: "컨테이너 목록이 나온 Haven 사이드바와 컨테이너 상세 탭이 열린 VS Code",
    ...evidence("ko", "haven-for-vs-code-사용-안내", "시작하기"),
  },
  boundary: {
    id: "product-boundary",
    title: "Haven for VS Code 안내",
    body: "Haven for VS Code는 Microsoft나 Docker의 제품이 아닙니다. 두 회사는 이 확장을 보증하거나 지원하지 않습니다.",
    footerLine: "Haven for VS Code는 CELLAXON이 독자적으로 개발한 확장입니다.",
    ...evidence("ko", "haven-for-vs-code-사용-안내"),
  },
  sections: [
    {
      id: "overview",
      status: "published",
      label: "소개",
      title: "편집기 안에서 컨테이너 관리하기",
      blocks: [
        { id: "summary", type: "paragraph", text: "Haven Desktop에서 하던 일을 VS Code를 벗어나지 않고 할 수 있습니다. 컨테이너, Compose 프로젝트, 로그, 사용량, 이미지, 볼륨, 네트워크, 포트, 파일 전송, 활동 기록을 다룹니다. 삭제나 강제 종료처럼 되돌리기 어려운 작업은 실행 전에 먼저 확인을 요청합니다." },
      ],
      ...evidence("ko", "haven-for-vs-code-사용-안내", "컨테이너"),
    },
    {
      id: "getting-started",
      status: "published",
      label: "시작하기",
      title: "필요한 환경과 설치",
      blocks: [
        {
          id: "requirements",
          type: "facts",
          items: [
            { id: "windows-wsl", title: "Windows와 WSL", body: "Windows 10 또는 11, 그리고 wslc 3.0.5 이상이 포함된 WSL이 필요합니다." },
            { id: "vscode", title: "VS Code 1.106 이상", body: "확장은 VS Code와 같은 Windows PC에서 실행됩니다." },
          ],
        },
        {
          id: "install",
          type: "steps",
          title: "설치하고 Haven 열기",
          items: [
            { id: "install-extension", title: "확장 설치하기", body: "확장 보기에서 ‘Haven for VS Code’를 검색해 설치합니다. VS Code Marketplace와 Open VSX에 모두 올라와 있습니다. .vsix 파일을 받았다면 확장 보기의 … 메뉴에서 ‘VSIX에서 설치’를 선택합니다." },
            { id: "open-sidebar", title: "Haven 사이드바 열기", body: "왼쪽 작업 표시줄(Activity Bar)의 Haven 아이콘을 누릅니다." },
            { id: "check-wslc", title: "wslc 확인하기", body: "wslc를 찾으면 컨테이너 목록이 바로 나옵니다. 찾지 못하거나 버전이 낮으면 사이드바에 설치 안내가 나옵니다. 다른 위치에 있는 wslc를 쓰려면 haven.wslcPath 설정에 전체 경로를 적습니다. Haven Desktop과 함께 쓰는 환경 변수 HAVEN_DESKTOP_WSLC에 적어도 됩니다." },
          ],
        },
        { id: "background", type: "note", title: "VS Code와 함께 시작됩니다", text: "VS Code가 열리면 확장도 백그라운드에서 함께 시작됩니다. 사이드바를 열지 않아도 상태 표시줄에 실행 중인 컨테이너 수가 나오고, 컨테이너가 비정상 상태가 되거나 예기치 않게 종료되면 알림이 옵니다." },
      ],
      ...evidence("ko", "시작하기"),
    },
    {
      id: "sidebar",
      status: "published",
      label: "사이드바",
      title: "사이드바 둘러보기",
      blocks: [
        {
          id: "areas",
          type: "table",
          columns: ["위치", "하는 일"],
          rows: [
            ["사이드바 상단", "‘Live’는 wslc 이벤트에 연결되어 변화가 바로 반영된다는 뜻입니다. 연결이 끊기면 ‘폴링’으로 바뀝니다. 6/8 같은 숫자는 실행 중인 컨테이너 수와 전체 수입니다. 새로 고침과 실행 버튼도 여기 있습니다."],
            ["아이콘 탭", "컨테이너, 이미지, 볼륨, 네트워크, 포트, 활동, 사용량, 시스템. 숫자는 각 항목의 개수입니다. 사이드바를 넓히면 이름도 보입니다."],
            ["뷰 제목의 …", "Compose 올리기, 이미지 받기·빌드·불러오기, 볼륨·네트워크 만들기, 정리, 레지스트리 로그인과 로그아웃 등이 있습니다."],
            ["상태 표시줄", "실행 중인 컨테이너 수와 비정상 개수가 나옵니다. 누르면 사이드바가 열립니다."],
          ],
        },
        { id: "palette", type: "note", title: "명령 팔레트", text: "대부분의 작업은 명령 팔레트(Ctrl+Shift+P)에서 ‘Haven:’으로 시작하는 명령으로도 할 수 있습니다." },
      ],
      ...evidence("ko", "사이드바-둘러보기"),
    },
    {
      id: "containers",
      status: "published",
      label: "컨테이너",
      title: "컨테이너 찾기와 다루기",
      blocks: [
        { id: "screenshot", type: "image", ...shot("ko", "containers", "컨테이너가 blog와 shop 프로젝트로 묶여 나온 Haven 사이드바. 옆에는 상태 검사에 실패한 shop-api-1 컨테이너의 상세 화면이 열려 있습니다.", "프로젝트별로 묶인 컨테이너 목록과, 편집기 탭에 열린 컨테이너 상세 화면입니다.") },
        {
          id: "features",
          type: "facts",
          items: [
            { id: "groups", title: "프로젝트로 묶기", body: "Compose 프로젝트 라벨(com.docker.compose.project)이 같은 컨테이너를 묶어서 보여 줍니다. 묶음 제목 줄에서 묶음 전체를 시작, 재시작, 중지할 수 있습니다. … 메뉴에는 모두 선택, ‘Compose 프로젝트 내리기’, 모두 삭제가 있습니다. 묶는 기준 라벨은 haven.groupLabels 설정으로 바꿉니다." },
            { id: "state", title: "행마다 보이는 상태", body: "실행 중인지, 상태 검사 결과가 정상인지 비정상인지, 종료 코드가 무엇인지(예: ‘멈춤 (1)’) 행마다 나옵니다. :8080처럼 열린 포트를 누르면 브라우저로 열립니다." },
            { id: "row-actions", title: "행에서 할 수 있는 일", body: "행에 마우스를 올리거나 키보드로 포커스를 옮기면 시작/중지, 재시작, 삭제 버튼과 … 메뉴가 나옵니다. … 메뉴에는 상세, 로그, 터미널, 연결, 파일, 검사(JSON), ID 복사, 파일 시스템 내보내기, 강제 종료가 있습니다. 사이드바가 넓으면 버튼이 항상 보입니다." },
            { id: "selection", title: "여러 개를 한꺼번에", body: "선택 상자로 여러 컨테이너를 골라 한 번에 시작, 중지, 삭제합니다." },
            { id: "search", title: "검색과 정리", body: "이름, 이미지, 상태, 묶음으로 검색합니다. 멈춘 컨테이너는 목록 위의 정리 버튼으로 지웁니다." },
            { id: "keyboard", title: "키보드", body: "Enter는 상세 열기, Space는 선택, Delete는 삭제입니다." },
          ],
        },
      ],
      ...evidence("ko", "컨테이너"),
    },
    {
      id: "container-details",
      status: "published",
      label: "컨테이너 상세",
      title: "정보, 로그, 사용량, 파일",
      blocks: [
        { id: "summary", type: "paragraph", text: "행을 누르면 편집기 탭에 컨테이너 상세 화면이 열립니다. ‘터미널’은 VS Code 터미널에 셸을 열고(wslc exec -it), ‘콘솔’은 컨테이너의 주 프로세스에 연결합니다." },
        { id: "info", type: "note", title: "정보", text: "정보 탭에는 상태, 상태 검사와 최근 결과, 명령, 포트(브라우저로 열기·복사), 마운트, 네트워크, 환경 변수, 라벨이 나옵니다. 환경 변수 값은 기본적으로 가려져 있습니다." },
        { id: "logs", type: "paragraph", text: "로그 탭에서는 새 로그 따라가기, 불러올 줄 수 지정, 필터링, 시간 표시, 줄바꿈, 복사, 파일로 저장을 할 수 있습니다." },
        { id: "logs-image", type: "image", ...shot("ko", "logs", "VS Code 편집기 탭에 열린 컨테이너의 로그 탭. 따라가기가 켜져 있고 웹 서버 접속 로그가 이어집니다.", "따라가기를 켠 로그 탭입니다.") },
        { id: "usage", type: "paragraph", text: "사용량 탭에서는 CPU와 메모리 사용량을 짧은 기록과 함께 보고, 네트워크와 디스크 입출력도 확인합니다." },
        { id: "usage-image", type: "image", ...shot("ko", "usage", "컨테이너의 사용량 탭. CPU와 메모리가 작은 기록 그래프와 함께 나오고, 네트워크와 디스크 입출력이 보입니다.", "CPU와 메모리 사용량, 그리고 최근 기록입니다.") },
        { id: "files", type: "paragraph", text: "파일 탭에서는 왼쪽에 Windows 폴더, 오른쪽에 컨테이너 폴더가 나옵니다." },
        { id: "files-image", type: "image", ...shot("ko", "files", "파일 탭. 왼쪽에 Windows의 프로젝트 폴더, 오른쪽에 shop-api-1 컨테이너의 최상위 폴더가 있고 그 사이에 화살표 버튼이 있습니다.", "두 목록 사이의 화살표 버튼으로 양쪽으로 파일을 복사합니다.") },
        {
          id: "files-tips",
          type: "facts",
          items: [
            { id: "copy", title: "여러 파일 복사하기", body: "Ctrl이나 Shift로 여러 개를 고른 뒤 반대쪽으로 끌어 놓거나 가운데 화살표 버튼을 누릅니다." },
            { id: "explorer", title: "탐색기에서 올리기", body: "VS Code 탐색기에서 Shift를 누른 채 끌어 놓으면 컨테이너로 올라갑니다." },
            { id: "overwrite", title: "같은 이름이 있을 때", body: "크기와 시간을 나란히 보여 주는 표에서 덮어쓸 파일을 고릅니다." },
            { id: "open", title: "열기와 이동", body: "작은 파일은 더블 클릭하면 편집기에 사본으로 열립니다. Backspace를 누르면 위 폴더로 갑니다." },
          ],
        },
      ],
      ...evidence("ko", "컨테이너-상세"),
    },
    {
      id: "run",
      status: "published",
      label: "컨테이너 실행",
      title: "양식으로 컨테이너 실행하기",
      blocks: [
        { id: "summary", type: "paragraph", text: "사이드바 상단의 ‘실행’이나 이미지 행의 ▷ 버튼으로 양식을 엽니다. 입력한 값은 Haven Desktop과 같은 규칙으로 검사합니다." },
        { id: "screenshot", type: "image", ...shot("ko", "run", "Haven 사이드바의 컨테이너 실행 양식. 이미지, 이름, 명령, 재시작 정책 입력란이 있습니다.", "컨테이너 실행 양식입니다.") },
        {
          id: "fields",
          type: "facts",
          items: [
            { id: "basics", title: "기본", body: "이미지(없으면 먼저 받습니다), 이름, 명령, 재시작 정책, 끝나면 지우기(--rm)." },
            { id: "ports-volumes", title: "포트·볼륨", body: "포트를 연결하고, Windows 폴더나 볼륨을 마운트합니다." },
            { id: "environment", title: "환경 변수", body: "환경 변수와 env 파일을 지정합니다." },
            { id: "advanced", title: "고급", body: "네트워크와 별칭, 메모리·CPU 제한, 작업 폴더, 사용자, entrypoint, 호스트 이름, 라벨, 상태 검사, GPU, 대화형, 그 밖의 wslc run 옵션." },
          ],
        },
      ],
      ...evidence("ko", "컨테이너-실행"),
    },
    {
      id: "compose",
      status: "published",
      label: "Compose",
      title: "Compose 프로젝트 올리기",
      blocks: [
        { id: "summary", type: "paragraph", text: "wslc에는 Compose가 없습니다. 그래서 Haven이 Compose 파일을 읽고, 같은 일을 하는 network create, volume create, run 명령을 차례로 실행합니다. Docker Compose 라벨도 붙입니다. depends_on에 적은 상태 검사와 완료 조건을 기다리고, build:가 있으면 이미지를 빌드합니다." },
        { id: "screenshot", type: "image", ...shot("ko", "compose", "shop 프로젝트의 Compose 올리기 화면. 서비스 세 개가 시작 순서대로 나오고, tools 프로필과 지원하지 않는 restart 값에 대한 안내 하나가 보입니다.", "실행하기 전에 서비스, 프로필, 안내를 먼저 확인합니다.") },
        {
          id: "procedure",
          type: "steps",
          title: "프로젝트 올리고 내리기",
          items: [
            { id: "open", title: "Compose 파일 열기", body: "탐색기에서 compose.yaml을 마우스 오른쪽 버튼으로 클릭하거나, 컨테이너 화면의 ‘Compose’ 버튼을 누릅니다." },
            { id: "review", title: "실행할 내용 확인하기", body: "실행하기 전에 서비스와 시작 순서, 컨테이너에 마운트할 Windows 폴더, 켤 수 있는 프로필, 지원하지 않는 키에 대한 경고가 먼저 나옵니다." },
            { id: "down", title: "프로젝트 내리기", body: "프로젝트 묶음 제목 줄의 … 메뉴에서 ‘Compose 프로젝트 내리기’를 선택합니다." },
          ],
        },
      ],
      ...evidence("ko", "compose-프로젝트-올리기"),
    },
    {
      id: "images",
      status: "published",
      label: "이미지",
      title: "이미지 받기, 빌드, 관리",
      blocks: [
        { id: "screenshot", type: "image", ...shot("ko", "images", "Haven 사이드바의 이미지 탭. 이미지마다 ‘1개가 사용’, ‘최신’, ‘로컬’, ‘새 버전’ 같은 배지가 붙어 있습니다.", "배지로 사용 중인 이미지, 로컬 이미지, 새 버전이 있는 이미지를 구분합니다.") },
        {
          id: "features",
          type: "facts",
          items: [
            { id: "pull", title: "받기(pull)", body: "진행 상황을 보면서 받고, 필요하면 취소합니다." },
            { id: "build", title: "빌드", body: "Dockerfile, 컨텍스트, 태그, 빌드 인자, 대상 단계, 캐시 안 쓰기를 지정해 빌드합니다. 탐색기에서 Dockerfile을 마우스 오른쪽 버튼으로 클릭해도 됩니다." },
            { id: "updates", title: "새 버전 확인", body: "받아 둔 공개 이미지의 태그가 레지스트리에서 바뀌었으면 ‘새 버전’ 배지가 붙습니다. 직접 확인을 요청할 때만 조회합니다." },
            { id: "other", title: "그 밖의 작업", body: "올리기(push), 태그 붙이기, tar로 저장하고 불러오기, 파일 시스템 tar 가져오기, 검사, 삭제, 정리." },
            { id: "badges", title: "배지", body: "‘N개가 사용’은 이 이미지를 쓰는 컨테이너 수이고, ‘로컬’은 레지스트리에서 받지 않은 이미지입니다. ‘최신’과 ‘새 버전’ 배지도 있습니다." },
          ],
        },
      ],
      ...evidence("ko", "이미지"),
    },
    {
      id: "volumes-networks-ports",
      status: "published",
      label: "볼륨·네트워크·포트",
      title: "볼륨, 네트워크, 포트",
      blocks: [
        {
          id: "features",
          type: "facts",
          items: [
            { id: "volumes-networks", title: "볼륨과 네트워크", body: "만들기, 검사, 삭제, 정리를 하고 컨테이너를 연결하거나 끊습니다." },
            { id: "ports", title: "포트", body: "열린 포트를 한 목록에서 봅니다. 포트를 누르면 브라우저로 열립니다." },
          ],
        },
      ],
      ...evidence("ko", "볼륨네트워크포트"),
    },
    {
      id: "activity-transfers",
      status: "published",
      label: "활동과 파일 전송",
      title: "활동 기록과 파일 전송",
      blocks: [
        { id: "activity", type: "paragraph", text: "활동 탭에는 컨테이너 시작과 종료, 상태 검사 변화, 이미지 받기, 볼륨 만들기 같은 일이 시간순으로 쌓입니다. 종류별로 필터링하거나 이름으로 검색할 수 있습니다." },
        { id: "activity-image", type: "image", ...shot("ko", "activity", "컨테이너 시작과 종료, 상태 검사 변화, 이미지 받기가 시간순으로 나온 활동 탭.", "활동 탭입니다.") },
        { id: "transfers", type: "paragraph", text: "파일 전송 탭에는 컨테이너 파일 복사, 이미지 저장과 불러오기, 파일 시스템 내보내기와 가져오기가 전체 경로, 크기, 결과와 함께 남습니다. 탐색기에서 파일을 열어 보거나 실패한 전송을 다시 실행할 수 있습니다." },
        { id: "transfers-image", type: "image", ...shot("ko", "transfers", "복사, 저장, 내보내기마다 경로, 크기, 결과가 나온 파일 전송 목록.", "파일 전송 기록입니다.") },
      ],
      ...evidence("ko", "활동-기록과-파일-전송"),
    },
    {
      id: "usage-disk",
      status: "published",
      label: "사용량과 디스크",
      title: "사용량, 디스크, 세션",
      blocks: [
        { id: "containers", type: "paragraph", text: "‘사용량 → 컨테이너’는 실행 중인 컨테이너의 CPU와 메모리를 나란히 보여 줍니다. 이 화면이 보이는 동안에만 통계를 읽습니다." },
        { id: "disk", type: "paragraph", text: "‘사용량 → 디스크·세션’은 세션 디스크가 Windows 드라이브에서 차지하는 크기, 세션 안의 사용량, 확보할 수 있는 공간의 추정치를 보여 줍니다. 그 아래에서는 wslc 설정 파일의 세션 자원(CPU 수, 메모리, 디스크 한도, 유휴 시간)을 고칠 수 있습니다." },
        { id: "disk-image", type: "image", ...shot("ko", "disk", "디스크·세션 화면. 세션 디스크 크기, 세션 안 사용량, 확보할 수 있는 공간과 세션 자원 입력란이 보입니다.", "세션 디스크 사용량과 세션 자원 설정입니다.") },
        { id: "settings-file", type: "note", title: "wslc 설정 파일을 고치는 방식", text: "바꾼 키만 고치고 파일의 주석은 그대로 둡니다. 처음 고칠 때 원본을 .bak 파일로 남깁니다." },
      ],
      ...evidence("ko", "사용량과-디스크세션"),
    },
    {
      id: "system",
      status: "published",
      label: "시스템",
      title: "시스템과 진단",
      blocks: [
        { id: "summary", type: "paragraph", text: "시스템 탭에는 wslc, 세션 관리자, 커널, Windows의 버전과 실행 중인 세션이 나옵니다. 여기서 세션을 종료할 수 있습니다." },
        { id: "screenshot", type: "image", ...shot("ko", "system", "버전 정보, 실행 중인 세션, 진단 기록 버튼이 있는 시스템 탭.", "버전, 세션, 진단 기록입니다.") },
        { id: "diagnostics", type: "note", title: "문제를 신고할 때", text: "‘진단 기록 보기’는 Haven이 실행한 명령의 기록을 엽니다. ‘보낼 사본 만들기’는 사용자 폴더, 사용자 이름, 컴퓨터 이름을 가린 사본을 만들어 주므로 문제를 신고할 때 첨부하면 됩니다." },
      ],
      ...evidence("ko", "시스템과-진단"),
    },
    {
      id: "docker-engine",
      status: "published",
      label: "WSL의 Docker Engine",
      title: "WSL 배포판의 Docker Engine",
      blocks: [
        { id: "summary", type: "paragraph", text: "WSL 배포판에 Docker Engine(docker-ce)을 설치해 두었다면 ‘Haven: WSL 배포판의 Docker Engine 관리…’ 명령이나 시스템 탭의 ‘배포판 고르기’로 켭니다. 그러면 그 배포판의 컨테이너, 이미지, 볼륨, 네트워크가 wslc의 것과 함께 배포판 이름 배지를 달고 나오고, 같은 동작을 쓸 수 있습니다." },
        { id: "forms", type: "note", title: "새로 만들 곳", text: "양식에 ‘만들 곳’ 선택이 생깁니다. 배포판의 Compose 프로젝트는 그 배포판의 docker compose로 올립니다." },
        { id: "limits", type: "warning", title: "제한 사항", text: "정리(prune)는 wslc 자원에만 적용됩니다. Docker Desktop은 지원하지 않습니다." },
      ],
      ...evidence("ko", "wsl-배포판의-docker-engine"),
    },
    {
      id: "theme-language",
      status: "published",
      label: "테마와 언어",
      title: "테마와 언어",
      blocks: [
        { id: "theme", type: "paragraph", text: "기본적으로 지금 쓰는 VS Code 색 테마를 따릅니다. Haven Desktop의 색(남색과 하늘색)을 쓰려면 haven.appearance.palette를 haven으로 바꿉니다. 고대비 테마에서는 항상 테마 색을 씁니다." },
        { id: "light-image", type: "image", ...shot("ko", "containers-light", "밝은 VS Code 색 테마에서 본 Haven 사이드바와 컨테이너 상세 화면.", "밝은 테마에서 본 Haven입니다.") },
        { id: "language", type: "paragraph", text: "화면은 한국어와 영어로 나옵니다. VS Code 표시 언어를 따르며, haven.language 설정으로 직접 고를 수도 있습니다." },
      ],
      ...evidence("ko", "테마와-언어"),
    },
    {
      id: "settings",
      status: "published",
      label: "설정",
      title: "설정",
      blocks: [
        {
          id: "settings-table",
          type: "table",
          columns: ["설정", "기본값", "설명"],
          rows: [
            ["haven.wslcPath", "", "wslc.exe의 전체 경로"],
            ["haven.session", "", "사용할 wslc 세션(--session)"],
            ["haven.refreshInterval", "5", "컨테이너 목록을 다시 읽는 간격(초)"],
            ["haven.groupLabels", "[\"com.docker.compose.project\"]", "컨테이너를 프로젝트로 묶을 라벨"],
            ["haven.groupByDefault", "true", "사이드바에서 프로젝트로 묶어 보기"],
            ["haven.appearance.palette", "vscode", "vscode(색 테마 따름) 또는 haven(Haven Desktop 색)"],
            ["haven.language", "auto", "auto, en, ko"],
            ["haven.notifications.unhealthy", "true", "컨테이너가 비정상 상태가 되면 알림"],
            ["haven.notifications.unexpectedExit", "true", "0이 아닌 코드로 종료되면 알림"],
            ["haven.terminal.shell", "/bin/sh", "컨테이너에서 열 셸"],
            ["haven.logs.tail", "500", "처음 불러올 로그 줄 수"],
            ["haven.details.revealEnvironment", "false", "환경 변수 값 보이기"],
            ["haven.statusBar", "true", "상태 표시줄에 실행 개수 보이기"],
            ["haven.dockerEngines", "[]", "Docker Engine을 함께 볼 WSL 배포판"],
          ],
        },
      ],
      ...evidence("ko", "설정"),
    },
    {
      id: "privacy-support",
      status: "published",
      label: "개인정보와 문의",
      title: "개인정보와 문의",
      blocks: [
        { id: "summary", type: "paragraph", text: "모든 작업은 이 PC에서 wslc로 실행합니다. Docker Engine을 켰다면 wsl.exe도 씁니다. 네트워크에 접속하는 것은 이미지 탭에서 ‘새 버전 확인’을 선택할 때뿐입니다. 그때도 로그인이나 쿠키 없이 이미지의 레지스트리에 태그의 현재 digest만 조회합니다." },
        { id: "log", type: "note", title: "출력 채널에 남는 내용", text: "Haven 출력 채널에는 Haven이 실행한 명령이 남습니다. 환경 변수와 빌드 인자의 값은 가려집니다." },
        { id: "contact", type: "paragraph", text: "제품 문의는 contact@cellaxon.com으로 보내 주세요." },
      ],
      ...evidence("ko", "개인-정보"),
    },
    {
      id: "troubleshooting",
      status: "published",
      label: "문제 해결",
      title: "문제 해결",
      blocks: [
        {
          id: "problems",
          type: "table",
          columns: ["증상", "해결 방법"],
          rows: [
            ["사이드바에 설치 안내만 나온다", "wslc --version이 3.0.5 이상인지 확인합니다. wslc가 다른 위치에 있으면 haven.wslcPath를 지정합니다."],
            ["‘Live’ 대신 ‘폴링’이 보인다", "이벤트 연결이 끊겨 몇 초마다 목록을 다시 읽는 중입니다. 기능은 그대로 동작하고, 확장이 간격을 늘려 가며 스스로 다시 연결합니다."],
            ["원하는 세션이 아니다", "haven.session에 세션 이름을 적습니다. 실행 중인 세션은 시스템 탭에서 볼 수 있습니다."],
            ["어떤 명령이 실행됐는지 알고 싶다", "시스템 탭에서 ‘진단 기록 보기’를 선택합니다(출력 채널 Haven)."],
            ["문제를 신고하고 싶다", "시스템 탭에서 ‘보낼 사본 만들기’로 개인 정보를 가린 기록을 만들어 첨부합니다."],
          ],
        },
      ],
      ...evidence("ko", "문제-해결"),
    },
  ],
};

export const havenVscodeHelpContent: Record<HavenHelpLanguage, HavenHelpPageContent> = { en, ko };
