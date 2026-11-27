import type { HavenHelpImage, HavenHelpLanguage, HavenHelpPageContent } from "../haven-help/content";

// Source: the extension's own user guide (docs/guide/README.md and README.ko.md in the cellaxon-devpulse
// repository). The screenshots come from the same guide and show a fictional sample repository.
const REVIEWED = "cellaxon-devpulse 0.7.1 guide";
const GUIDE = { en: "docs/guide/README.md", ko: "docs/guide/README.ko.md" } as const;

function evidence(language: HavenHelpLanguage, ...anchors: string[]) {
  return { sourceRefs: anchors.map((anchor) => `${GUIDE[language]}#${anchor}`), lastReviewedRevision: REVIEWED };
}

function shot(language: HavenHelpLanguage, name: string, alt: string, caption?: string): HavenHelpImage {
  return { src: `/assets/products/devpulse/${name}-${language}.png`, alt, width: 1600, height: 1000, caption };
}

const en: HavenHelpPageContent = {
  language: "en",
  meta: {
    homeLabel: "CELLAXON home",
    languageLabel: "Language",
    skipLabel: "Skip to help content",
    tocLabel: "On this page",
    tocTitle: "Help topics",
    contactLabel: "Contact DevPulse support",
    zoomLabel: "Enlarge image",
    closeLabel: "Close",
  },
  hero: {
    id: "hero",
    status: "Available now",
    title: "CELLAXON DevPulse help",
    lead: "CELLAXON DevPulse is a VS Code extension that analyzes Git repository activity by period, contributor, and team, entirely on your computer.",
    note: "Install it from the VS Code Marketplace or Open VSX. The screenshots on this page use a fictional sample repository, so you'll see your own repository and contributors instead.",
    mediaAlt: "DevPulse Repository Statistics for a sample repository, with the contributor list, summary values, and commit and line charts",
    ...evidence("en", "cellaxon-devpulse-user-guide"),
  },
  boundary: {
    id: "product-boundary",
    title: "About CELLAXON DevPulse",
    body: "CELLAXON DevPulse is not a Microsoft product and is not endorsed or supported by Microsoft.",
    footerLine: "CELLAXON DevPulse is developed independently by CELLAXON.",
    ...evidence("en", "cellaxon-devpulse-user-guide"),
  },
  sections: [
    {
      id: "overview",
      status: "published",
      label: "Overview",
      title: "See how a repository changes over time",
      blocks: [
        { id: "summary", type: "paragraph", text: "DevPulse charts commits and changed lines over time, shows weekday and hour patterns, and compares contributors side by side. You can save the results as Markdown, CSV, or PDF reports. All analysis runs on your computer, and repository data is never uploaded." },
        { id: "what-it-measures", type: "note", title: "What the numbers mean", text: "DevPulse shows Git activity as it was recorded. Commit counts, changed lines, and time distributions don't measure working hours, code quality, or individual productivity." },
      ],
      ...evidence("en", "cellaxon-devpulse-user-guide"),
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
            { id: "vscode", title: "VS Code 1.106 or later", body: "The desktop version of VS Code." },
            { id: "git", title: "Git on your PATH", body: "DevPulse runs Git commands to read the history." },
            { id: "workspace", title: "A trusted Git repository", body: "Open the repository in a workspace you've marked as trusted." },
          ],
        },
        { id: "platforms", type: "note", title: "Tested platforms", text: "DevPulse is currently tested on Windows desktop. Virtual workspaces such as vscode.dev aren't supported, and macOS, Linux, WSL, Remote SSH, and Dev Containers haven't been fully tested yet." },
        {
          id: "install",
          type: "steps",
          title: "Install the extension",
          items: [
            { id: "marketplace", title: "Install from the Extensions view", body: "Search for “CELLAXON DevPulse” and select Install. It is published on the VS Code Marketplace and on Open VSX." },
            { id: "vsix", title: "Or install a .vsix file", body: "At the top of the Extensions view, select Views and More Actions (…), then Install from VSIX…. Reload VS Code if prompted." },
          ],
        },
      ],
      ...evidence("en", "getting-started"),
    },
    {
      id: "open",
      status: "published",
      label: "Open the statistics",
      title: "Open Repository Statistics",
      blocks: [
        { id: "summary", type: "paragraph", text: "In the Source Control view, find your repository in the Repositories list and select the graph icon on its row. If the sidebar is too narrow to show the icon, choose “DevPulse: Open Repository Statistics” from the … menu on the repository row. You can also run the same command from the Command Palette (Ctrl+Shift+P)." },
        { id: "screenshot", type: "image", ...shot("en", "commands", "Command Palette filtered to DevPulse, showing the Open Repository Statistics command.", "Open Repository Statistics from the Command Palette.") },
        {
          id: "behavior",
          type: "facts",
          items: [
            { id: "tabs", title: "One tab per repository", body: "Each repository is analyzed separately and opens in its own tab." },
            { id: "default", title: "Last 90 days by default", body: "The first view shows the last 90 days, broken down by day. A large repository can take a while the first time. Select Cancel to stop an analysis in progress." },
            { id: "cache", title: "Faster the second time", body: "Results are saved in a local cache, so reopening a repository with the same options is much faster." },
          ],
        },
      ],
      ...evidence("en", "opening-repository-statistics"),
    },
    {
      id: "layout",
      status: "published",
      label: "Screen layout",
      title: "Screen layout",
      blocks: [
        { id: "screenshot", type: "image", ...shot("en", "overview", "Repository Statistics with the Contributors list on the left, filters and summary values at the top, and the commit trend and added and deleted lines charts below.", "Repository Statistics for a sample repository.") },
        {
          id: "areas",
          type: "table",
          columns: ["Area", "What it shows"],
          rows: [
            ["Contributors (left)", "Everyone who committed to the repository. Select people to compare them or organize them into groups. The “You” badge marks the Git user on this computer (user.email) and any group that includes you."],
            ["Header", "The repository name, the current view (Overall, Individual, or Compare), Refresh, the report format selector, and Export."],
            ["Filters", "Period, unit, scope, and whether merge commits are included."],
            ["Summary", "Commits, activity days, file changes, and added and deleted lines."],
            ["Charts", "Commit trend, added and deleted lines, and the weekday × hour heatmap."],
            ["Detailed statistics", "The values for each period in a table."],
          ],
        },
        { id: "status-line", type: "note", title: "Under the filters", text: "The right side of the filter bar shows the time zone, branch, HEAD commit, and how long the analysis took, or “SQLite cache” if cached results were used. The line below lists the file patterns currently excluded from line and file statistics." },
      ],
      ...evidence("en", "screen-layout"),
    },
    {
      id: "periods",
      status: "published",
      label: "Periods and options",
      title: "Periods and analysis options",
      blocks: [
        {
          id: "options",
          type: "facts",
          items: [
            { id: "rolling", title: "Rolling period", body: "The most recent days. The choices depend on the unit: the last 7 or 14 days for hours; 30, 90, or 365 days for days; 90 or 365 days for weeks; 365 days for months; and 365 days or All history for years." },
            { id: "calendar", title: "Calendar period", body: "This week, last week, this month, last month, this year, or last year. Weeks start on Monday." },
            { id: "custom", title: "Custom range", body: "Choose a start and end date, then select Apply period. The end date can't be in the future." },
            { id: "unit", title: "Unit", body: "Hour, day, week, month, or year. Each unit has a maximum period: 14 days for hours, 366 days for days, 5 years for weeks, 20 years for months, and no limit for years. The maximum for the current unit appears above the period buttons." },
            { id: "scope", title: "Scope", body: "Current branch counts commits reachable from HEAD. All refs counts commits reachable from any branch or tag." },
            { id: "merge", title: "Merge commits", body: "Choose whether to exclude or include merge commits." },
          ],
        },
        { id: "author-date", type: "note", title: "Which date counts", text: "Periods are based on when each commit was authored (its author date). Work that was rebased or cherry-picked later still counts in the period when it was first written. Dates and hours follow the time zone of the computer running VS Code." },
      ],
      ...evidence("en", "periods-and-analysis-options"),
    },
    {
      id: "compare",
      status: "published",
      label: "Compare contributors",
      title: "Compare contributors",
      blocks: [
        { id: "summary", type: "paragraph", text: "Select one contributor to see their statistics, or two or more to compare them. Select Show overall to return to the repository-wide view." },
        { id: "screenshot", type: "image", ...shot("en", "compare", "Comparison of several contributors, with each person's summary values side by side and one trend line per contributor.", "Summary values and trends for each selected contributor.") },
        {
          id: "details",
          type: "facts",
          items: [
            { id: "cards", title: "Side by side", body: "Summary cards show each contributor's values next to each other, and the trend chart draws one line per contributor." },
            { id: "lines", title: "Separate line charts", body: "Added and deleted lines get a small chart for each contributor. They cover the same period, but each chart has its own scale." },
            { id: "include-me", title: "Include yourself", body: "With “Include me when comparing multiple items” turned on, you're added as a separate item whenever you aren't already part of the comparison." },
            { id: "search", title: "Search", body: "Use the search box above the list to find contributors or groups by name." },
          ],
        },
        { id: "mailmap", type: "note", title: "One person, several email addresses", text: "If the same person committed with several email addresses, the repository's .mailmap merges them into one contributor. If you can't use .mailmap, put those identities in a group instead." },
      ],
      ...evidence("en", "comparing-contributors"),
    },
    {
      id: "groups",
      status: "published",
      label: "Groups",
      title: "Group contributors",
      blocks: [
        { id: "summary", type: "paragraph", text: "Group contributors by team or role to compare their combined activity." },
        { id: "screenshot", type: "image", ...shot("en", "groups", "Contributors organized into Web, API, and Platform groups, with the three groups compared in the summary values and charts.", "Three groups compared side by side.") },
        {
          id: "procedure",
          type: "steps",
          title: "Create and use a group",
          items: [
            { id: "create", title: "Create a group", body: "Enter a name in New group name, choose a parent group if you need one, and select Add." },
            { id: "move", title: "Add contributors", body: "Drag contributors or groups into the group. With the keyboard, use the Move menu on each row." },
            { id: "select", title: "Select the group", body: "Selecting a group combines the activity of everyone in it, including its subgroups, into a single item." },
          ],
        },
        {
          id: "notes",
          type: "facts",
          items: [
            { id: "rename", title: "Rename or ungroup", body: "Use a group's menu to Rename or Ungroup it. Ungrouping moves its contributors and subgroups up one level, so nothing is lost." },
            { id: "no-double-count", title: "No double counting", body: "DevPulse won't let you select a parent group together with one of its members, so the same commit is never counted twice." },
            { id: "local", title: "Saved on this computer", body: "Groups are saved per repository, and only in VS Code on this computer. DevPulse never changes your Git history or .mailmap." },
          ],
        },
      ],
      ...evidence("en", "grouping-contributors"),
    },
    {
      id: "heatmap",
      status: "published",
      label: "Weekday and hour",
      title: "Weekday and hour pattern",
      blocks: [
        { id: "summary", type: "paragraph", text: "The heatmap shows when commits happen most, by day of the week and hour of the day." },
        { id: "screenshot", type: "image", ...shot("en", "heatmap", "Weekday by hour heatmap with a commit count in each cell and totals along the edges, above the detailed statistics table.", "The heatmap with values and totals turned on.") },
        {
          id: "options",
          type: "facts",
          items: [
            { id: "bucket", title: "Bucket size", body: "Choose 1 hour or 3 hours." },
            { id: "values", title: "Values and totals", body: "Turn on Show values and totals to show the commit count in each cell, with weekday and hour totals along the edges." },
            { id: "table", title: "Heatmap as a table", body: "View heatmap as table shows the same values as a table, which is easier to use with a screen reader or the keyboard." },
            { id: "bars", title: "Separate distributions", body: "Expand Show separate hourly and weekday distributions below the heatmap to see hour-of-day and day-of-week bar charts." },
          ],
        },
      ],
      ...evidence("en", "weekday-and-hour-pattern"),
    },
    {
      id: "table",
      status: "published",
      label: "Detailed statistics",
      title: "Detailed statistics table",
      blocks: [
        { id: "summary", type: "paragraph", text: "The table lists commits, file changes, unique files, and added and deleted lines for each period in the selected unit. When you compare, each contributor or group gets its own rows. Use the arrows at the top right to page through long tables." },
        { id: "screenshot", type: "image", ...shot("en", "table", "Detailed statistics table with one row per period and columns for commits, file changes, unique files, and added and deleted lines.", "One row per period.") },
        { id: "counts", type: "note", title: "File changes and unique files", text: "File changes adds up the number of files each commit changed. Unique files counts the distinct files changed at least once in the period. A renamed file may be counted once under its old path and once under its new path." },
      ],
      ...evidence("en", "detailed-statistics-table"),
    },
    {
      id: "export",
      status: "published",
      label: "Export reports",
      title: "Export reports",
      blocks: [
        { id: "summary", type: "paragraph", text: "Choose a format from the selector in the header, select Export, and pick where to save the file." },
        {
          id: "formats",
          type: "table",
          columns: ["Format", "Contents"],
          rows: [
            ["PDF report (2 pages)", "Page 1: options, summary values, and key charts. Page 2: the weekday × hour heatmap with a value in every cell, plus weekday, hour, and grand totals."],
            ["Markdown", "Options, a summary per contributor, and detailed statistics per period."],
            ["CSV detailed data", "Every period row plus hour-of-day, day-of-week, and weekday × hour distributions, for further analysis in a spreadsheet."],
          ],
        },
        { id: "matches-screen", type: "note", title: "Reports match the screen", text: "Reports contain the same values you see and list the file patterns excluded from line and file statistics. If you've changed the dates but haven't selected Apply period yet, Export is turned off until you do." },
      ],
      ...evidence("en", "exporting-reports"),
    },
    {
      id: "cache",
      status: "published",
      label: "Cache",
      title: "Manage the cache",
      blocks: [
        { id: "summary", type: "paragraph", text: "Analysis results are compressed and stored in an SQLite file in VS Code's extension storage. The DevPulse Cache section of the Source Control view shows the cache size for each repository and lets you manage it." },
        { id: "screenshot", type: "image", ...shot("en", "cache", "DevPulse Cache section at the bottom of the Source Control view, listing a repository with its snapshot count and cache size.", "The DevPulse Cache section in Source Control.") },
        {
          id: "actions",
          type: "facts",
          items: [
            { id: "row", title: "On a repository row", body: "Delete that repository's cache, or open the cache location." },
            { id: "title", title: "In the section title bar", body: "Refresh Cache List, Prune Old Cache (removes entries past the age and size limits in Settings), and Clear All Cache." },
            { id: "rebuild", title: "Automatic rebuilds", body: "The cache is rebuilt when the repository gets new commits or its .mailmap changes. Refresh in Repository Statistics always reanalyzes the repository and skips the cache." },
            { id: "safe", title: "Safe to clear", body: "Clearing the cache doesn't touch your Git repository or your contributor groups." },
          ],
        },
      ],
      ...evidence("en", "managing-the-cache"),
    },
    {
      id: "theme-language",
      status: "published",
      label: "Theme and language",
      title: "Themes and languages",
      blocks: [
        { id: "theme", type: "paragraph", text: "DevPulse follows your VS Code color theme, including dark, light, and high-contrast themes." },
        { id: "light-image", type: "image", ...shot("en", "overview-light", "Repository Statistics in a light VS Code color theme.", "DevPulse in a light theme.") },
        { id: "language", type: "paragraph", text: "The display language follows VS Code. DevPulse supports English, Korean, Japanese, Simplified Chinese, Traditional Chinese, and Spanish, and falls back to English for other languages. Exported reports use the same language." },
      ],
      ...evidence("en", "themes-and-languages"),
    },
    {
      id: "settings",
      status: "published",
      label: "Settings",
      title: "Settings",
      blocks: [
        { id: "summary", type: "paragraph", text: "Open Settings (Ctrl+,) and search for “CELLAXON DevPulse”." },
        { id: "screenshot", type: "image", ...shot("en", "settings", "VS Code Settings filtered to CELLAXON DevPulse, showing the exclude patterns and cache settings.", "DevPulse settings.") },
        {
          id: "settings-table",
          type: "table",
          columns: ["Setting", "Default", "What it does"],
          rows: [
            ["cellaxonDevPulse.analysis.excludePatterns", "Lockfiles, dist, build", "Glob patterns, relative to the repository, that are left out of line and file statistics. Commits that only touch excluded files still count as commits. Supports **, *, and ?, for example **/dist/**."],
            ["cellaxonDevPulse.cache.enabled", "true", "Store analysis results in the local cache and reuse them. Reload the window after changing this."],
            ["cellaxonDevPulse.cache.autoPrune", "true", "Remove old and least recently used cache entries when the extension starts."],
            ["cellaxonDevPulse.cache.maxAgeDays", "30", "Remove cache entries that haven't been used for this many days."],
            ["cellaxonDevPulse.cache.maxSizeMb", "512", "Maximum cache size in MB, compressed. The least recently used entries are removed first."],
          ],
        },
      ],
      ...evidence("en", "settings"),
    },
    {
      id: "privacy",
      status: "published",
      label: "Privacy and support",
      title: "Privacy and support",
      blocks: [
        {
          id: "facts",
          type: "facts",
          items: [
            { id: "local", title: "Runs locally", body: "All analysis runs on your computer with Git commands. DevPulse needs no account or server and never sends repository data anywhere." },
            { id: "paths", title: "No full paths on screen", body: "Repository Statistics doesn't show full repository paths." },
            { id: "cache", title: "What the cache leaves out", body: "The cache doesn't store commit messages, per-file change history, or author email addresses." },
            { id: "reports", title: "Reports stay with you", body: "Exported reports stay on your computer until you move or share them." },
          ],
        },
        { id: "remove", type: "note", title: "Before you uninstall", text: "To remove stored data, run Clear All Cache from the title bar of the DevPulse Cache section." },
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
          columns: ["Problem", "What to try"],
          rows: [
            ["The graph icon is missing", "Check that you're using VS Code 1.106 or later and that the repository appears as a Git repository in Source Control. If the sidebar is narrow, use the … menu on the repository row or the Command Palette."],
            ["Repository Statistics doesn't open", "Check that Git is installed and the workspace is trusted. Errors appear in the DevPulse channel of the Output panel."],
            ["The first analysis takes a long time", "Long histories take a while the first time. Select Cancel, then try a shorter period or a larger unit. Later runs use the cache."],
            ["A message says the unit supports a maximum analysis period", "The period is too long for the selected unit. Shorten the period or switch to a larger unit, such as week, month, or year."],
            ["One person appears as several contributors", "Add a .mailmap to the repository, or put those identities in one group."],
            ["Results differ from earlier versions", "Since 0.7.1, periods are based on the author date, and commits that only touch excluded files are counted. See the extension's changelog for details."],
            ["A warning says the DevPulse SQLite file is unavailable", "DevPulse still works, but this session uses an in-memory cache. Reload the window. If the warning comes back, run Clear All Cache from the title bar of the DevPulse Cache section."],
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
    contactLabel: "DevPulse 문의",
    zoomLabel: "이미지 크게 보기",
    closeLabel: "닫기",
  },
  hero: {
    id: "hero",
    status: "제공 중",
    title: "CELLAXON DevPulse 도움말",
    lead: "CELLAXON DevPulse는 Git 저장소의 활동을 기간, 참여자, 팀별로 분석하는 VS Code 확장입니다. 분석은 모두 내 PC에서 이루어집니다.",
    note: "VS Code Marketplace나 Open VSX에서 설치할 수 있습니다. 이 페이지의 화면은 가상의 예제 저장소로 만든 것이어서, 실제로는 여러분의 저장소와 참여자가 보입니다.",
    mediaAlt: "예제 저장소의 DevPulse 저장소 통계 화면. 참여자 목록, 요약 수치, 커밋과 줄 수 차트가 보입니다.",
    ...evidence("ko", "cellaxon-devpulse-사용-안내"),
  },
  boundary: {
    id: "product-boundary",
    title: "CELLAXON DevPulse 안내",
    body: "CELLAXON DevPulse는 Microsoft의 제품이 아니며, Microsoft가 보증하거나 지원하지 않습니다.",
    footerLine: "CELLAXON DevPulse는 CELLAXON이 독자적으로 개발한 확장입니다.",
    ...evidence("ko", "cellaxon-devpulse-사용-안내"),
  },
  sections: [
    {
      id: "overview",
      status: "published",
      label: "소개",
      title: "저장소가 어떻게 바뀌어 왔는지 한눈에",
      blocks: [
        { id: "summary", type: "paragraph", text: "커밋 수와 변경한 줄 수의 추이, 요일·시간대별 패턴, 참여자 간 비교를 차트와 표로 보여 줍니다. 결과는 Markdown, CSV, PDF 리포트로 저장할 수 있습니다. 분석은 모두 내 PC에서 이루어지며, 저장소 데이터는 어디에도 전송되지 않습니다." },
        { id: "what-it-measures", type: "note", title: "숫자를 읽을 때", text: "DevPulse가 보여 주는 커밋 수, 변경한 줄 수, 시간 분포는 Git에 기록된 활동일 뿐입니다. 근무 시간이나 코드 품질, 개인의 생산성을 재는 지표가 아닙니다." },
      ],
      ...evidence("ko", "cellaxon-devpulse-사용-안내"),
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
            { id: "vscode", title: "VS Code 1.106 이상", body: "데스크톱용 VS Code가 필요합니다." },
            { id: "git", title: "Git", body: "Git이 설치되어 있고, 터미널에서 git 명령을 바로 실행할 수 있어야 합니다." },
            { id: "workspace", title: "신뢰한 작업 영역의 Git 저장소", body: "신뢰하도록 설정한 작업 영역에서 저장소를 엽니다." },
          ],
        },
        { id: "platforms", type: "note", title: "검증한 환경", text: "현재는 Windows용 VS Code 데스크톱에서만 검증했습니다. vscode.dev 같은 가상 작업 영역은 지원하지 않으며, macOS, Linux, WSL, Remote SSH, Dev Container는 아직 충분히 검증하지 않았습니다." },
        {
          id: "install",
          type: "steps",
          title: "확장 설치하기",
          items: [
            { id: "marketplace", title: "확장 보기에서 설치하기", body: "‘CELLAXON DevPulse’를 검색해 설치합니다. VS Code Marketplace와 Open VSX에 모두 올라와 있습니다." },
            { id: "vsix", title: ".vsix 파일로 설치하기", body: "확장 보기 위쪽의 … 메뉴에서 ‘VSIX에서 설치’를 선택합니다. 안내가 나오면 VS Code를 다시 로드합니다." },
          ],
        },
      ],
      ...evidence("ko", "시작하기"),
    },
    {
      id: "open",
      status: "published",
      label: "통계 화면 열기",
      title: "저장소 통계 화면 열기",
      blocks: [
        { id: "summary", type: "paragraph", text: "소스 제어(Source Control) 보기의 리포지토리(Repositories) 목록에서 저장소 행의 그래프 아이콘을 클릭합니다. 사이드바가 좁아 아이콘이 보이지 않으면 저장소 행의 … 메뉴에서 ‘DevPulse: 저장소 통계 열기’를 선택합니다. 명령 팔레트(Ctrl+Shift+P)에서 같은 명령을 실행해도 됩니다." },
        { id: "screenshot", type: "image", ...shot("ko", "commands", "DevPulse로 검색한 명령 팔레트에 저장소 통계 열기 명령이 보입니다.", "명령 팔레트에서 저장소 통계를 엽니다.") },
        {
          id: "behavior",
          type: "facts",
          items: [
            { id: "tabs", title: "저장소마다 탭 하나", body: "저장소는 하나씩 따로 분석하며, 탭도 저장소마다 하나씩 열립니다." },
            { id: "default", title: "처음에는 최근 90일", body: "처음 열면 최근 90일을 일 단위로 분석합니다. 큰 저장소는 첫 분석에 시간이 걸릴 수 있으며, 진행 중에 ‘취소’를 누르면 멈춥니다." },
            { id: "cache", title: "두 번째부터는 빠르게", body: "분석 결과는 로컬 캐시에 저장되므로, 같은 조건으로 다시 열면 바로 보입니다." },
          ],
        },
      ],
      ...evidence("ko", "통계-화면-열기"),
    },
    {
      id: "layout",
      status: "published",
      label: "화면 구성",
      title: "화면 구성",
      blocks: [
        { id: "screenshot", type: "image", ...shot("ko", "overview", "왼쪽에 개발 참여자 목록, 위쪽에 필터와 요약 수치, 아래에 커밋 수 추이와 추가·삭제 줄 수 차트가 있는 저장소 통계 화면.", "예제 저장소의 통계 화면입니다.") },
        {
          id: "areas",
          type: "table",
          columns: ["위치", "내용"],
          rows: [
            ["개발 참여자(왼쪽)", "저장소에 커밋한 사람의 목록입니다. 선택해서 비교하거나 그룹으로 묶습니다. ‘나’ 배지는 이 PC의 Git 사용자(user.email)와 내가 속한 그룹에 붙습니다."],
            ["상단", "저장소 이름, 현재 모드(전체·개인·비교), 새로고침, 리포트 형식 선택, 내보내기."],
            ["필터", "기간, 단위, 범위, 병합 커밋 포함 여부."],
            ["요약", "커밋, 활동일, 파일 변경, 추가·삭제한 줄 수."],
            ["차트", "커밋 수 추이, 추가·삭제한 줄 수, 요일×시간대 히트맵."],
            ["상세 통계", "기간별 수치를 정리한 표."],
          ],
        },
        { id: "status-line", type: "note", title: "필터 아래에 보이는 정보", text: "필터 오른쪽 끝에는 표준 시간대, 브랜치, HEAD 커밋, 분석에 걸린 시간이 나옵니다. 캐시를 썼다면 ‘SQLite 캐시’로 표시됩니다. 그 아래 줄에는 줄·파일 통계에서 제외하고 있는 파일 패턴이 나옵니다." },
      ],
      ...evidence("ko", "화면-구성"),
    },
    {
      id: "periods",
      status: "published",
      label: "기간과 분석 조건",
      title: "기간과 분석 조건",
      blocks: [
        {
          id: "options",
          type: "facts",
          items: [
            { id: "rolling", title: "이동 기간", body: "오늘을 기준으로 한 최근 기간입니다. 단위에 따라 고를 수 있는 기간이 다릅니다. 시간 단위는 최근 7일·14일, 일 단위는 30일·90일·365일, 주 단위는 90일·365일, 월 단위는 365일, 연간 단위는 365일과 ‘전체’입니다." },
            { id: "calendar", title: "달력 기간", body: "이번 주, 지난주, 이번 달, 지난달, 올해, 지난해 중에서 고릅니다. 한 주는 월요일에 시작합니다." },
            { id: "custom", title: "직접 지정", body: "시작일과 종료일을 고른 뒤 ‘기간 적용’을 누릅니다. 종료일은 오늘 이후로 정할 수 없습니다." },
            { id: "unit", title: "단위", body: "시간, 일, 주, 월, 연간 중에서 고릅니다. 단위마다 볼 수 있는 최대 기간이 다릅니다(시간 14일, 일 366일, 주 5년, 월 20년, 연간은 제한 없음). 지금 단위의 최대 기간은 기간 버튼 위에 표시됩니다." },
            { id: "scope", title: "범위", body: "‘현재 브랜치’는 HEAD에서 거슬러 올라갈 수 있는 커밋만, ‘모든 ref’는 모든 브랜치와 태그의 커밋을 셉니다." },
            { id: "merge", title: "병합 커밋", body: "병합 커밋을 뺄지(merge 제외) 넣을지(merge 포함) 고릅니다." },
          ],
        },
        { id: "author-date", type: "note", title: "어느 시각을 기준으로 세나요", text: "기간은 커밋을 처음 작성한 시각(author date)을 기준으로 나눕니다. 나중에 rebase나 cherry-pick으로 다시 커밋한 작업도 처음 작성한 기간에 들어갑니다. 날짜와 시각은 VS Code를 실행 중인 PC의 표준 시간대를 따릅니다." },
      ],
      ...evidence("ko", "기간과-분석-조건"),
    },
    {
      id: "compare",
      status: "published",
      label: "참여자 비교",
      title: "참여자 비교하기",
      blocks: [
        { id: "summary", type: "paragraph", text: "참여자를 한 명 선택하면 그 사람의 통계가, 두 명 이상 선택하면 비교 화면이 나옵니다. ‘전체 보기’를 누르면 저장소 전체 통계로 돌아갑니다." },
        { id: "screenshot", type: "image", ...shot("ko", "compare", "여러 참여자를 비교하는 화면. 요약 수치가 사람별로 나란히 나오고, 추이 차트에 참여자마다 선이 하나씩 그려져 있습니다.", "선택한 참여자별 요약 수치와 추이입니다.") },
        {
          id: "details",
          type: "facts",
          items: [
            { id: "cards", title: "나란히 비교", body: "요약 카드에 참여자별 수치가 나란히 나오고, 추이 차트에는 참여자마다 선이 하나씩 그려집니다." },
            { id: "lines", title: "줄 수 차트는 따로", body: "추가·삭제한 줄 수는 참여자마다 작은 차트로 나뉩니다. 기간은 모두 같지만, 세로축 범위는 차트마다 따로 맞춥니다." },
            { id: "include-me", title: "나도 함께 보기", body: "‘여러 항목 비교 시 나 포함’을 켜 두면, 비교 대상에 내가 없을 때 나를 별도 항목으로 함께 보여 줍니다." },
            { id: "search", title: "검색", body: "목록 위의 검색 칸에서 참여자나 그룹을 이름으로 찾을 수 있습니다." },
          ],
        },
        { id: "mailmap", type: "note", title: "한 사람이 여러 이메일로 커밋했다면", text: "저장소의 .mailmap이 적용되어 한 사람으로 합쳐집니다. .mailmap을 쓰기 어렵다면 그 사람의 여러 계정을 한 그룹으로 묶으면 됩니다." },
      ],
      ...evidence("ko", "참여자-비교"),
    },
    {
      id: "groups",
      status: "published",
      label: "그룹",
      title: "그룹으로 묶어 보기",
      blocks: [
        { id: "summary", type: "paragraph", text: "팀이나 역할별로 참여자를 묶어 합계를 비교할 수 있습니다." },
        { id: "screenshot", type: "image", ...shot("ko", "groups", "참여자를 Web, API, Platform 그룹으로 묶고 세 그룹을 요약 수치와 차트로 비교하는 화면.", "세 그룹을 나란히 비교합니다.") },
        {
          id: "procedure",
          type: "steps",
          title: "그룹 만들고 쓰기",
          items: [
            { id: "create", title: "그룹 만들기", body: "‘새 그룹 이름’에 이름을 입력하고, 필요하면 상위 그룹을 고른 뒤 ‘추가’를 누릅니다." },
            { id: "move", title: "참여자 넣기", body: "참여자나 그룹을 원하는 그룹으로 끌어다 놓습니다. 키보드로는 각 행의 ‘이동’ 메뉴를 씁니다." },
            { id: "select", title: "그룹 선택하기", body: "그룹을 선택하면 그 그룹과 하위 그룹에 속한 모든 참여자의 활동을 합쳐 하나의 항목으로 보여 줍니다." },
          ],
        },
        {
          id: "notes",
          type: "facts",
          items: [
            { id: "rename", title: "이름 바꾸기와 그룹 해제", body: "그룹 메뉴에서 ‘이름 바꾸기’나 ‘그룹 해제’를 할 수 있습니다. 그룹을 해제해도 안에 있던 참여자와 하위 그룹은 한 단계 위로 옮겨질 뿐 사라지지 않습니다." },
            { id: "no-double-count", title: "중복 집계 방지", body: "상위 그룹과 그 안의 참여자는 함께 선택할 수 없어서, 같은 커밋이 두 번 세어지지 않습니다." },
            { id: "local", title: "이 PC에만 저장", body: "그룹 구성은 저장소마다 이 PC의 VS Code에만 저장됩니다. Git 이력이나 .mailmap은 바꾸지 않습니다." },
          ],
        },
      ],
      ...evidence("ko", "그룹으로-묶어-보기"),
    },
    {
      id: "heatmap",
      status: "published",
      label: "요일·시간대 패턴",
      title: "요일·시간대 패턴",
      blocks: [
        { id: "summary", type: "paragraph", text: "커밋이 어느 요일, 어느 시간대에 몰리는지 히트맵으로 보여 줍니다." },
        { id: "screenshot", type: "image", ...shot("ko", "heatmap", "칸마다 커밋 수와 가장자리에 합계가 표시된 요일×시간대 히트맵. 아래에는 상세 통계 표가 이어집니다.", "값과 합계 표시를 켠 히트맵입니다.") },
        {
          id: "options",
          type: "facts",
          items: [
            { id: "bucket", title: "묶는 단위", body: "‘1시간’이나 ‘3시간’ 단위로 묶어 봅니다." },
            { id: "values", title: "값과 합계 표시", body: "켜면 칸마다 커밋 수가 나오고, 가장자리에 요일별·시간대별 합계가 표시됩니다." },
            { id: "table", title: "히트맵을 표로 보기", body: "같은 값을 표로 보여 줍니다. 화면 낭독기나 키보드로 볼 때 편합니다." },
            { id: "bars", title: "개별 분포 보기", body: "히트맵 아래의 ‘시간대·요일별 개별 분포 보기’를 펼치면 시간대별, 요일별 막대 차트를 따로 볼 수 있습니다." },
          ],
        },
      ],
      ...evidence("ko", "요일시간대-패턴"),
    },
    {
      id: "table",
      status: "published",
      label: "상세 통계",
      title: "상세 통계 표",
      blocks: [
        { id: "summary", type: "paragraph", text: "선택한 단위의 기간별로 커밋, 파일 변경, 고유 파일, 추가·삭제한 줄 수를 표로 보여 줍니다. 비교 중이면 참여자나 그룹마다 행이 나뉩니다. 행이 많으면 오른쪽 위의 화살표로 페이지를 넘깁니다." },
        { id: "screenshot", type: "image", ...shot("ko", "table", "기간마다 한 행씩 커밋, 파일 변경, 고유 파일, 추가·삭제 줄 수가 나오는 상세 통계 표.", "기간마다 한 행씩 나옵니다.") },
        { id: "counts", type: "note", title: "파일 변경과 고유 파일", text: "‘파일 변경’은 커밋마다 바뀐 파일 수를 모두 더한 값이고, ‘고유 파일’은 그 기간에 한 번이라도 바뀐 서로 다른 파일의 수입니다. 이름을 바꾼 파일은 이전 경로와 새 경로로 한 번씩 세어질 수 있습니다." },
      ],
      ...evidence("ko", "상세-통계-표"),
    },
    {
      id: "export",
      status: "published",
      label: "리포트 내보내기",
      title: "리포트 내보내기",
      blocks: [
        { id: "summary", type: "paragraph", text: "상단에서 리포트 형식을 고른 뒤 ‘내보내기’를 누르고 저장할 위치를 정합니다." },
        {
          id: "formats",
          type: "table",
          columns: ["형식", "내용"],
          rows: [
            ["PDF 리포트(2페이지)", "1페이지: 분석 조건, 요약 수치, 주요 차트. 2페이지: 칸마다 값이 들어간 요일×시간대 히트맵과 요일별·시간대별·전체 합계."],
            ["Markdown", "분석 조건, 참여자별 요약, 기간별 상세 통계."],
            ["CSV 상세 데이터", "기간별 행 전체와 시간대별, 요일별, 요일×시간대 분포. 스프레드시트에서 추가로 분석할 때 씁니다."],
          ],
        },
        { id: "matches-screen", type: "note", title: "리포트는 화면과 같습니다", text: "리포트에는 화면과 같은 수치가 들어가고, 줄·파일 통계에서 제외한 파일 패턴도 함께 적힙니다. 날짜를 바꾸고 아직 ‘기간 적용’을 누르지 않았다면, 화면과 리포트가 어긋나지 않도록 내보내기가 잠시 막힙니다." },
      ],
      ...evidence("ko", "리포트-내보내기"),
    },
    {
      id: "cache",
      status: "published",
      label: "캐시",
      title: "캐시 관리",
      blocks: [
        { id: "summary", type: "paragraph", text: "분석 결과는 압축해서 VS Code 확장 저장 공간의 SQLite 파일에 보관합니다. 소스 제어 보기 아래쪽의 ‘DevPulse 캐시’(DevPulse Cache)에서 저장소별 캐시 크기를 확인하고 관리할 수 있습니다." },
        { id: "screenshot", type: "image", ...shot("ko", "cache", "소스 제어 보기 아래쪽의 DevPulse 캐시 영역에 저장소 하나와 스냅샷 수, 캐시 크기가 나와 있습니다.", "소스 제어 보기의 DevPulse 캐시입니다.") },
        {
          id: "actions",
          type: "facts",
          items: [
            { id: "row", title: "저장소 행에서", body: "그 저장소의 캐시를 지우거나 캐시 위치를 엽니다." },
            { id: "title", title: "제목 줄에서", body: "캐시 목록 새로고침, 오래된 캐시 정리(설정의 기간·크기 기준), 모든 캐시 삭제를 할 수 있습니다." },
            { id: "rebuild", title: "자동으로 다시 만들기", body: "저장소에 새 커밋이 생기거나 .mailmap이 바뀌면 캐시를 다시 만듭니다. 통계 화면의 ‘새로고침’은 캐시를 쓰지 않고 항상 다시 분석합니다." },
            { id: "safe", title: "지워도 괜찮습니다", body: "캐시를 지워도 Git 저장소와 참여자 그룹 구성은 그대로 남습니다." },
          ],
        },
      ],
      ...evidence("ko", "캐시-관리"),
    },
    {
      id: "theme-language",
      status: "published",
      label: "테마와 언어",
      title: "테마와 언어",
      blocks: [
        { id: "theme", type: "paragraph", text: "화면은 지금 쓰는 VS Code 색 테마를 따릅니다. 어두운 테마, 밝은 테마, 고대비 테마를 모두 지원합니다." },
        { id: "light-image", type: "image", ...shot("ko", "overview-light", "밝은 VS Code 색 테마에서 본 저장소 통계 화면.", "밝은 테마에서 본 DevPulse입니다.") },
        { id: "language", type: "paragraph", text: "화면 언어는 VS Code 표시 언어를 따릅니다. 한국어, 영어, 일본어, 중국어(간체·번체), 스페인어를 지원하며, 그 밖의 언어에서는 영어로 나옵니다. 내보낸 리포트도 같은 언어로 만들어집니다." },
      ],
      ...evidence("ko", "테마와-언어"),
    },
    {
      id: "settings",
      status: "published",
      label: "설정",
      title: "설정",
      blocks: [
        { id: "summary", type: "paragraph", text: "설정(Ctrl+,)을 열고 ‘CELLAXON DevPulse’를 검색합니다." },
        { id: "screenshot", type: "image", ...shot("ko", "settings", "CELLAXON DevPulse로 검색한 VS Code 설정 화면에 제외 패턴과 캐시 설정이 보입니다.", "DevPulse 설정입니다.") },
        {
          id: "settings-table",
          type: "table",
          columns: ["설정", "기본값", "설명"],
          rows: [
            ["cellaxonDevPulse.analysis.excludePatterns", "lockfile, dist, build", "줄·파일 통계에서 뺄 파일의 경로 패턴(저장소 루트 기준). 제외한 파일만 바꾼 커밋도 커밋 수에는 들어갑니다. **, *, ?를 쓸 수 있습니다. 예: **/dist/**"],
            ["cellaxonDevPulse.cache.enabled", "true", "분석 결과를 로컬 캐시에 저장해 다시 쓸지 여부. 바꾼 뒤에는 창을 다시 로드해야 합니다."],
            ["cellaxonDevPulse.cache.autoPrune", "true", "확장이 시작될 때 오래되었거나 한동안 쓰지 않은 캐시를 자동으로 정리합니다."],
            ["cellaxonDevPulse.cache.maxAgeDays", "30", "이 기간(일) 동안 쓰지 않은 캐시를 정리합니다."],
            ["cellaxonDevPulse.cache.maxSizeMb", "512", "캐시의 최대 크기(MB, 압축 기준). 넘으면 가장 오래 쓰지 않은 것부터 지웁니다."],
          ],
        },
      ],
      ...evidence("ko", "설정"),
    },
    {
      id: "privacy",
      status: "published",
      label: "개인정보와 문의",
      title: "개인정보와 문의",
      blocks: [
        {
          id: "facts",
          type: "facts",
          items: [
            { id: "local", title: "내 PC에서만 분석", body: "모든 분석은 이 PC에서 Git 명령으로 합니다. 계정이나 서버가 필요 없고, 저장소 데이터를 외부로 보내지 않습니다." },
            { id: "paths", title: "전체 경로는 표시하지 않음", body: "통계 화면에는 저장소의 전체 경로가 나오지 않습니다." },
            { id: "cache", title: "캐시에 넣지 않는 것", body: "커밋 메시지, 파일별 변경 내역, 작성자 이메일은 캐시에 저장하지 않습니다." },
            { id: "reports", title: "리포트는 내 PC에", body: "내보낸 리포트는 직접 옮기거나 공유하기 전까지 이 PC에만 있습니다." },
          ],
        },
        { id: "remove", type: "note", title: "확장을 제거하기 전에", text: "저장된 데이터를 지우려면 ‘DevPulse 캐시’ 제목 줄에서 ‘모든 캐시 삭제’를 실행합니다." },
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
            ["그래프 아이콘이 보이지 않는다", "VS Code가 1.106 이상인지, 저장소가 소스 제어에 Git 저장소로 나오는지 확인합니다. 사이드바가 좁으면 저장소 행의 … 메뉴나 명령 팔레트를 씁니다."],
            ["통계 화면이 열리지 않는다", "Git이 설치되어 있는지, 작업 영역을 신뢰했는지 확인합니다. 오류는 출력 패널의 DevPulse 채널에서 볼 수 있습니다."],
            ["첫 분석이 오래 걸린다", "이력이 긴 저장소는 처음 한 번 시간이 걸립니다. ‘취소’로 멈춘 뒤 더 짧은 기간이나 더 큰 단위로 다시 시도합니다. 다음부터는 캐시를 씁니다."],
            ["단위별 최대 분석 기간을 넘었다는 안내가 나온다", "고른 단위로 볼 수 있는 기간을 넘었습니다. 기간을 줄이거나 주·월·연간처럼 더 큰 단위로 바꿉니다."],
            ["같은 사람이 여러 명으로 나온다", "저장소에 .mailmap을 추가하거나, 그 사람의 계정들을 한 그룹으로 묶습니다."],
            ["결과가 예전과 다르다", "0.7.1부터는 커밋 작성 시각을 기준으로 기간을 나누고, 제외한 파일만 바꾼 커밋도 커밋 수에 넣습니다. 자세한 내용은 확장의 변경 내역에서 확인할 수 있습니다."],
            ["SQLite 파일을 열 수 없어 메모리 캐시를 쓴다는 경고가 나온다", "기능은 그대로 쓸 수 있지만, 이번 세션의 캐시는 저장되지 않습니다. 창을 다시 로드하고, 그래도 경고가 나오면 ‘DevPulse 캐시’ 제목 줄에서 ‘모든 캐시 삭제’를 실행합니다."],
          ],
        },
      ],
      ...evidence("ko", "문제-해결"),
    },
  ],
};

export const devpulseHelpContent: Record<HavenHelpLanguage, HavenHelpPageContent> = { en, ko };
