import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CaretDown,
  EnvelopeSimple,
  Eye,
  HardDrives,
  List,
  MagnifyingGlassPlus,
  SealCheck,
  X,
} from "@phosphor-icons/react";
import { copy, type Language } from "./content";

const CONTACT_EMAIL = "contact@cellaxon.com";
const RANVIER_URL = "https://ranvier.studio/";
const DEVPULSE_URL = "https://marketplace.visualstudio.com/items?itemName=cellaxon.cellaxon-devpulse";
const DEVPULSE_OPENVSX_URL = "https://open-vsx.org/extension/cellaxon/cellaxon-devpulse";
const HAVEN_ROTATE_MS = 6000;

const languageMetadata = {
  en: {
    path: "/",
    locale: "en_US",
    title: "CELLAXON — Complex systems, made visible.",
    description: "CELLAXON builds developer tools that make decision logic, engineering activity, and container environments easy to inspect and verify.",
  },
  ko: {
    path: "/ko/",
    locale: "ko_KR",
    title: "CELLAXON — 복잡한 시스템을 한눈에.",
    description: "CELLAXON은 의사결정 로직, Git 활동 이력, 로컬 컨테이너 환경을 직관적으로 확인하고 검증하는 개발자 도구를 만듭니다.",
  },
} as const;

const havenScreens = [
  { id: "containers", src: "/assets/products/haven-containers.png" },
  { id: "files", src: "/assets/products/haven-files.png" },
] as const;

const approachIcons = [Eye, HardDrives, SealCheck] as const;

function setMetaContent(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", value);
}

function initialLanguage(): Language {
  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get("lang");
  if (queryLanguage === "ko" || queryLanguage === "en") return queryLanguage;
  return window.location.pathname.startsWith("/ko") ? "ko" : "en";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// 스크롤로 나타나는 요소를 한 관찰자가 맡는다. 숨김 CSS는 관찰자가 실제로 만들어졌을 때
// 붙는 html.reveal-ready 아래에서만 적용되므로, 스크립트가 돌지 않거나 관찰자를 쓸 수 없는
// 환경에서는 내용이 그대로 보인다.
let revealObserver: IntersectionObserver | null | undefined;

function getRevealObserver() {
  if (revealObserver !== undefined) return revealObserver;
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    revealObserver = null;
    return revealObserver;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-revealed", "");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
  );
  document.documentElement.classList.add("reveal-ready");
  revealObserver = observer;
  return revealObserver;
}

/** data-reveal 요소에 ref로 붙인다. 나중에 마운트되는 요소도 같은 방식으로 관찰된다. */
function revealRef(element: HTMLElement | null) {
  if (!element) return;
  const observer = getRevealObserver();
  if (!observer) return;
  observer.observe(element);
  return () => observer.unobserve(element);
}

function ExternalArrow() {
  return <ArrowUpRight aria-hidden="true" weight="bold" />;
}

function Header({ language, onLanguageChange }: { language: Language; onLanguageChange: (language: Language) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const text = copy[language].nav;
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label={text.home} onClick={closeMenu}>
          <img src="/assets/brand/cellaxon-lockup.png" alt="CELLAXON" />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? text.close : text.menu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>

        <nav id="primary-navigation" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label={text.primaryLabel}>
          <a href="#products" onClick={closeMenu}>{text.products}</a>
          <a href="#approach" onClick={closeMenu}>{text.approach}</a>
          <a href="#company" onClick={closeMenu}>{text.company}</a>
        </nav>

        <div className={menuOpen ? "header-actions is-open" : "header-actions"}>
          <div className="language-control" aria-label={text.languageLabel}>
            <button type="button" className={language === "en" ? "is-active" : ""} aria-pressed={language === "en"} onClick={() => { onLanguageChange("en"); closeMenu(); }}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" className={language === "ko" ? "is-active" : ""} aria-pressed={language === "ko"} onClick={() => { onLanguageChange("ko"); closeMenu(); }}>KR</button>
          </div>
          <a className="button button-outline button-compact" href={`mailto:${CONTACT_EMAIL}`} onClick={closeMenu}>{text.contact}</a>
        </div>
      </div>
    </header>
  );
}

function Hero({ language }: { language: Language }) {
  const text = copy[language].hero;

  return (
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <h1>
          <span>{text.titleLead}</span>
          <span className="gradient-text">{text.titleAccent}</span>
        </h1>
        <p>{text.body}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#products">
            {text.primary}
            <ArrowRight aria-hidden="true" weight="bold" />
          </a>
          <a className="button button-outline" href={`mailto:${CONTACT_EMAIL}`}>{text.secondary}</a>
        </div>
      </div>
      <figure className="hero-visual" aria-label={text.visualAlt}>
        <div className="hero-visual-frame">
          <img src="/assets/hero/neural-signal.png" alt="" width="1536" height="1024" />
          {/* 그림 속 신호 마디 위치(%)에 맞춘 파동. 축삭을 따라 세포체로 차례로 번진다. */}
          <span className="signal-pulse signal-pulse-1" aria-hidden="true" />
          <span className="signal-pulse signal-pulse-2" aria-hidden="true" />
          <span className="signal-pulse signal-pulse-3" aria-hidden="true" />
          <span className="signal-pulse signal-pulse-soma" aria-hidden="true" />
          <span className="signal-pulse signal-pulse-violet" aria-hidden="true" />
        </div>
      </figure>
    </section>
  );
}

type ProductRowProps = {
  id?: string;
  reverse?: boolean;
  logoSrc: string;
  logoClassName?: string;
  name: string;
  statusKind: "available" | "preparing";
  statusLabel: string;
  subtitle: string;
  statement: string;
  points: readonly string[];
  /** 좁은 화면에서 요점 목록을 펴고 접는 버튼의 문구. */
  pointsShowLabel: string;
  pointsHideLabel: string;
  /** 요점 목록 아래에 오는 링크·안내문. */
  footer: ReactNode;
  media: ReactNode;
};

function ProductRow(props: ProductRowProps) {
  const logoClassName = props.logoClassName ? `product-logo ${props.logoClassName}` : "product-logo";
  // 넓은 화면에서는 CSS가 목록을 항상 보여 주고 버튼을 숨긴다. 이 상태는 좁은 화면에서만 뜻이 있다.
  const [pointsOpen, setPointsOpen] = useState(false);
  const pointsId = useId();

  return (
    <article className={props.reverse ? "product-row product-row-reverse" : "product-row"} id={props.id} data-reveal ref={revealRef}>
      <div className="product-copy">
        <div className="product-head">
          <img className={logoClassName} src={props.logoSrc} alt="" />
          <div>
            <span className={`status-chip status-${props.statusKind}`}>
              <span className="status-dot" aria-hidden="true" />
              {props.statusLabel}
            </span>
            <h3>{props.name}</h3>
          </div>
        </div>
        <p className="product-subtitle">{props.subtitle}</p>
        <p className="product-statement">{props.statement}</p>
        <button
          className="points-toggle"
          type="button"
          aria-expanded={pointsOpen}
          aria-controls={pointsId}
          onClick={() => setPointsOpen((open) => !open)}
        >
          {pointsOpen ? props.pointsHideLabel : props.pointsShowLabel}
          <CaretDown aria-hidden="true" weight="bold" />
        </button>
        <ul className={pointsOpen ? "product-points" : "product-points is-collapsed"} id={pointsId}>
          {props.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        {props.footer}
      </div>
      {props.media}
    </article>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ExternalArrow />
    </a>
  );
}

type ZoomLabels = { zoom: string; close: string };

/** 스크린샷을 화면 가득 보여 주는 창. 어디를 눌러도, Esc를 눌러도 닫힌다. */
function Lightbox({ src, alt, closeLabel, onClose }: { src: string; alt: string; closeLabel: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog className="lightbox" ref={dialogRef} onClose={onClose} onClick={() => dialogRef.current?.close()}>
      <button className="lightbox-close" type="button" aria-label={closeLabel}>
        <X aria-hidden="true" weight="bold" />
      </button>
      <div className="lightbox-scroll">
        <img src={src} alt={alt} />
      </div>
    </dialog>
  );
}

/** 스크린샷 위에 얹는 "크게 보기" 표시. 버튼 이름은 이 글자와 스크린샷 alt가 함께 만든다. */
function ZoomHint({ label }: { label: string }) {
  return (
    <span className="zoom-hint">
      <MagnifyingGlassPlus aria-hidden="true" weight="bold" />
      {label}
    </span>
  );
}

function ZoomMedia({ src, alt, width, height, labels }: { src: string; alt: string; width: number; height: number; labels: ZoomLabels }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="product-media">
      <button className="media-zoom" type="button" onClick={() => setZoomed(true)}>
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
        <ZoomHint label={labels.zoom} />
      </button>
      {zoomed && <Lightbox src={src} alt={alt} closeLabel={labels.close} onClose={() => setZoomed(false)} />}
    </div>
  );
}

function HavenScreens({ language, labels }: { language: Language; labels: ZoomLabels }) {
  const haven = copy[language].products.haven;
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  // 탭을 직접 고르면 자동 전환을 끝내고, 마우스를 올리거나 포커스가 들어와 있는 동안에는 잠시 멈춘다.
  const [autoRotate, setAutoRotate] = useState(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = mediaRef.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const rotating = autoRotate && inView && !hovered && !focused && !zoomed;
  const activeScreen = havenScreens[active];

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % havenScreens.length), HAVEN_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [rotating]);

  const choose = (index: number) => {
    setActive(index);
    setAutoRotate(false);
  };

  return (
    <div
      className="product-media haven-media"
      ref={mediaRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="haven-tabs" role="group" aria-label={haven.tabsLabel}>
        {havenScreens.map((screen, index) => (
          <button
            key={screen.id}
            type="button"
            className={index === active ? "is-active" : ""}
            aria-pressed={index === active}
            onClick={() => choose(index)}
          >
            {haven.tabs[screen.id]}
          </button>
        ))}
      </div>
      <button className="media-zoom haven-screens" type="button" onClick={() => setZoomed(true)}>
        {havenScreens.map((screen, index) => (
          <img
            key={screen.id}
            className={index === active ? "is-active" : ""}
            src={screen.src}
            alt={index === active ? haven.mediaAlt[screen.id] : ""}
            aria-hidden={index === active ? undefined : true}
            width="1536"
            height="1040"
            loading="lazy"
          />
        ))}
        <ZoomHint label={labels.zoom} />
      </button>
      {zoomed && (
        <Lightbox
          src={activeScreen.src}
          alt={haven.mediaAlt[activeScreen.id]}
          closeLabel={labels.close}
          onClose={() => setZoomed(false)}
        />
      )}
    </div>
  );
}

function Products({ language }: { language: Language }) {
  const text = copy[language].products;
  const { ranvier, devpulse, haven } = text;
  const zoomLabels = { zoom: text.zoom, close: text.zoomClose };
  const pointsLabels = { pointsShowLabel: text.pointsShow, pointsHideLabel: text.pointsHide };
  const havenHelpUrl = language === "ko" ? "/ko/products/haven-desktop/" : "/products/haven-desktop/";

  return (
    <section className="products-section" id="products">
      <div className="shell">
        <div className="section-heading" data-reveal ref={revealRef}>
          <p className="section-label">{text.label}</p>
          <h2>{text.title}</h2>
          <p>{text.body}</p>
        </div>
        <div className="product-list">
          <ProductRow
            logoSrc="/assets/products/ranvier-logo.svg"
            logoClassName="ranvier-logo"
            name="Ranvier"
            statusKind="available"
            statusLabel={text.availableStatus}
            {...pointsLabels}
            subtitle={ranvier.subtitle}
            statement={ranvier.statement}
            points={ranvier.points}
            footer={<ExternalLink href={RANVIER_URL}>{ranvier.action}</ExternalLink>}
            media={<ZoomMedia src="/assets/products/ranvier-home.png" alt={ranvier.mediaAlt} width={1265} height={712} labels={zoomLabels} />}
          />
          <ProductRow
            reverse
            logoSrc="/assets/products/devpulse-icon.png"
            name="CELLAXON DevPulse"
            statusKind="available"
            statusLabel={text.availableStatus}
            {...pointsLabels}
            subtitle={devpulse.subtitle}
            statement={devpulse.statement}
            points={devpulse.points}
            footer={
              <div className="product-links">
                <ExternalLink href={DEVPULSE_URL}>{devpulse.action}</ExternalLink>
                <ExternalLink href={DEVPULSE_OPENVSX_URL}>{devpulse.openVsxAction}</ExternalLink>
              </div>
            }
            media={<ZoomMedia src="/assets/products/devpulse-dashboard.png" alt={devpulse.mediaAlt} width={1680} height={1211} labels={zoomLabels} />}
          />
          <ProductRow
            id="haven"
            logoSrc="/assets/products/haven-icon.svg"
            name="Haven Desktop"
            statusKind="preparing"
            statusLabel={text.preparingStatus}
            {...pointsLabels}
            subtitle={haven.subtitle}
            statement={haven.statement}
            points={haven.points}
            footer={
              <>
                <p className="product-note">{haven.note}</p>
                <div className="product-links">
                  <a className="text-link" href={havenHelpUrl}>
                    <BookOpenText aria-hidden="true" weight="bold" />
                    {haven.helpAction}
                  </a>
                  <a className="text-link" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(haven.mailSubject)}`}>
                    <EnvelopeSimple aria-hidden="true" weight="bold" />
                    {haven.action}
                  </a>
                </div>
                <p className="product-disclaimer">{haven.disclaimer}</p>
              </>
            }
            media={<HavenScreens language={language} labels={zoomLabels} />}
          />
        </div>
      </div>
    </section>
  );
}

function Approach({ language }: { language: Language }) {
  const text = copy[language].approach;

  return (
    <section className="approach-section" id="approach">
      <div className="shell">
        <div className="approach-heading" data-reveal ref={revealRef}>
          <p className="section-label">{text.label}</p>
          <h2>{text.title}</h2>
        </div>
        <ul className="approach-grid">
          {text.items.map((item, index) => {
            const Icon = approachIcons[index];
            return (
              <li key={item.title} data-reveal ref={revealRef} style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="approach-icon" aria-hidden="true"><Icon weight="regular" /></span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Company({ language }: { language: Language }) {
  const text = copy[language].company;

  return (
    <section className="company-section shell" id="company">
      <div className="section-heading company-intro" data-reveal ref={revealRef}>
        <p className="section-label">{text.label}</p>
        <h2>{text.title}</h2>
        <p>{text.body}</p>
      </div>
      <div className="company-details" data-reveal ref={revealRef}>
        <div><span>{text.addressLabel}</span><p>{text.address}</p></div>
        <div><span>{text.emailLabel}</span><p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></div>
        <div><span>{text.phoneLabel}</span><p><a href="tel:+823180433215">+82-31-8043-3215</a></p></div>
        <div>
          <span>{text.linksLabel}</span>
          <div className="company-links">
            <a href="/shortcuts/">{text.shortcuts}</a>
            <a href="https://blog.cellaxon.com" target="_blank" rel="noreferrer">{text.blog}<ExternalArrow /></a>
            <a href="https://www.linkedin.com/company/cellaxon" target="_blank" rel="noreferrer">{text.linkedin}<ExternalArrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCta({ language }: { language: Language }) {
  const text = copy[language].cta;

  return (
    <section className="cta-section">
      <div className="shell cta-inner" data-reveal ref={revealRef}>
        <div>
          <h2>{text.title}</h2>
          <p>{text.body}</p>
        </div>
        <a className="button button-primary" href={`mailto:${CONTACT_EMAIL}`}>
          <EnvelopeSimple aria-hidden="true" weight="bold" />
          {text.action}
        </a>
      </div>
    </section>
  );
}

function Footer({ language }: { language: Language }) {
  const text = copy[language].footer;
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <img src="/assets/brand/cellaxon-lockup-white.png" alt="CELLAXON" />
        <p>{text.line}</p>
        <p>{text.copyright}</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    const metadata = languageMetadata[language];
    document.documentElement.lang = language;
    const url = new URL(window.location.href);
    url.pathname = metadata.path;
    url.searchParams.delete("lang");
    window.history.replaceState({}, "", url);
    document.title = metadata.title;
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:locale"]', metadata.locale);
    setMetaContent('meta[property="og:url"]', `https://cellaxon.com${metadata.path}`);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", `https://cellaxon.com${metadata.path}`);
  }, [language]);

  const text = copy[language];

  return (
    <>
      <a className="skip-link" href="#main-content">{text.nav.skip}</a>
      <Header language={language} onLanguageChange={setLanguage} />
      <main id="main-content">
        <Hero language={language} />
        <Products language={language} />
        <Approach language={language} />
        <Company language={language} />
        <ContactCta language={language} />
      </main>
      <Footer language={language} />
    </>
  );
}
