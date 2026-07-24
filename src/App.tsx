import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  List,
  PaperPlaneTilt,
  X,
} from "@phosphor-icons/react";
import { copy, type Language } from "./content";

const CONTACT_EMAIL = "contact@cellaxon.com";
const POC_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("CELLAXON PoC inquiry")}`;

function initialLanguage(): Language {
  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get("lang");
  if (queryLanguage === "ko" || queryLanguage === "en") return queryLanguage;
  return window.localStorage.getItem("cellaxon-language") === "ko" ? "ko" : "en";
}

function ExternalArrow() {
  return <ArrowUpRight aria-hidden="true" weight="bold" />;
}

function Header({ language, onLanguageChange }: { language: Language; onLanguageChange: (language: Language) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const text = copy[language].nav;
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="CELLAXON home" onClick={closeMenu}>
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

        <nav id="primary-navigation" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          <a href="#products" onClick={closeMenu}>{text.products}</a>
          <a href="#exploring" onClick={closeMenu}>{text.exploring}</a>
          <a href="#company" onClick={closeMenu}>{text.company}</a>
        </nav>

        <div className={menuOpen ? "header-actions is-open" : "header-actions"}>
          <div className="language-control" aria-label="Language selector">
            <button type="button" className={language === "en" ? "is-active" : ""} aria-pressed={language === "en"} onClick={() => onLanguageChange("en")}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" className={language === "ko" ? "is-active" : ""} aria-pressed={language === "ko"} onClick={() => onLanguageChange("ko")}>KR</button>
          </div>
          <a className="button button-outline button-compact" href={`mailto:${CONTACT_EMAIL}`}>{text.contact}</a>
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
          <a className="button button-outline" href={POC_MAILTO}>{text.secondary}</a>
        </div>
      </div>
      <figure className="hero-visual" aria-label={text.visualAlt}>
        <img src="/assets/hero/neural-signal.png" alt="" />
      </figure>
    </section>
  );
}

function RanvierCard({ language }: { language: Language }) {
  const text = copy[language].products;

  return (
    <article className="product-card">
      <div className="product-summary">
        <img className="product-logo ranvier-logo" src="/assets/products/ranvier-logo.svg" alt="Ranvier logo" />
        <div>
          <h3><a href="https://ranvier.studio/" target="_blank" rel="noreferrer">Ranvier<ExternalArrow /></a></h3>
          <p className="product-subtitle">{text.ranvierSubtitle}</p>
          <p className="product-statement">{text.ranvierStatement}</p>
        </div>
      </div>
      <a className="product-media" href="https://ranvier.studio/" target="_blank" rel="noreferrer" aria-label={text.ranvierPrimary}>
        <img src="/assets/products/ranvier-home.png" alt="Ranvier website showing a typed decision schematic" />
      </a>
    </article>
  );
}

function DevPulseCard({ language }: { language: Language }) {
  const text = copy[language].products;
  const marketplaceUrl = "https://marketplace.visualstudio.com/items?itemName=cellaxon.cellaxon-devpulse";

  return (
    <article className="product-card">
      <div className="product-summary">
        <img className="product-logo" src="/assets/products/devpulse-icon.png" alt="Cellaxon DevPulse icon" />
        <div>
          <h3><a href={marketplaceUrl} target="_blank" rel="noreferrer">Cellaxon DevPulse<ExternalArrow /></a></h3>
          <p className="product-subtitle">{text.devpulseSubtitle}</p>
        </div>
      </div>
      <a className="product-media" href={marketplaceUrl} target="_blank" rel="noreferrer" aria-label={text.devpulsePrimary}>
        <img src="/assets/products/devpulse-dashboard.png" alt="Cellaxon DevPulse repository statistics dashboard" />
      </a>
    </article>
  );
}

function FlightOpsCard({ language }: { language: Language }) {
  const text = copy[language].flightops;

  return (
    <article className="product-card flightops-card" id="exploring">
      <div className="flightops-icon" aria-hidden="true">
        <PaperPlaneTilt weight="regular" />
      </div>
      <div>
        <h3>FlightOps</h3>
        <p className="flightops-title">{text.title}</p>
      </div>
      <div className="flightops-actions">
        <span className="validation-label">{text.status}</span>
        <a className="button button-outline" href={POC_MAILTO}>{text.action}</a>
      </div>
    </article>
  );
}

function Products({ language }: { language: Language }) {
  const text = copy[language].products;

  return (
    <section className="products-section" id="products">
      <div className="shell">
        <div className="product-label-row" aria-hidden="true">
          <p className="section-label available-label">{text.availableLabel}</p>
          <p className="section-label validation-heading">{text.validationLabel}</p>
        </div>
        <div className="product-grid">
          <RanvierCard language={language} />
          <DevPulseCard language={language} />
          <FlightOpsCard language={language} />
        </div>
      </div>
    </section>
  );
}

function Company({ language }: { language: Language }) {
  const text = copy[language].company;

  return (
    <section className="company-section shell" id="company">
      <div className="section-heading company-intro">
        <p className="section-label">{text.label}</p>
        <h2>{text.title}</h2>
        <p>{text.body}</p>
      </div>
      <div className="company-details">
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
    document.documentElement.lang = language;
    window.localStorage.setItem("cellaxon-language", language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url);
    document.title = language === "ko" ? "CELLAXON — 복잡한 시스템을 한눈에." : "CELLAXON — Complex systems, made visible.";
  }, [language]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header language={language} onLanguageChange={setLanguage} />
      <main id="main-content">
        <Hero language={language} />
        <Products language={language} />
        <Company language={language} />
      </main>
      <Footer language={language} />
    </>
  );
}
