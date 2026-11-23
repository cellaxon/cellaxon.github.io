import { ArrowLeft, ArrowRight, EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react";
import { getPublishedSections, havenHelpContent, type HavenHelpLanguage } from "./content";

const CONTACT_EMAIL = "contact@cellaxon.com";

function getLanguage(): HavenHelpLanguage {
  return window.location.pathname.startsWith("/ko/") ? "ko" : "en";
}

export default function HavenHelpApp() {
  const language = getLanguage();
  const content = havenHelpContent[language];
  const sections = getPublishedSections(language);
  const homePath = language === "ko" ? "/ko/" : "/";
  const alternatePath = language === "ko" ? "/products/haven-desktop/" : "/ko/products/haven-desktop/";
  const alternateLabel = language === "ko" ? "EN" : "KR";
  const mailSubject = language === "ko" ? "Haven Desktop 문의" : "Haven Desktop support";

  return (
    <>
      <a className="skip-link" href="#help-content">{content.meta.skipLabel}</a>
      <header className="help-header">
        <div className="shell help-header-inner">
          <a className="help-brand" href={homePath} aria-label={content.meta.homeLabel}>
            <img src="/assets/brand/cellaxon-lockup.png" alt="CELLAXON" width="416" height="74" />
          </a>
          <nav className="help-header-actions" aria-label={content.meta.languageLabel}>
            <a className="help-home-link" href={`${homePath}#haven`}>
              <ArrowLeft aria-hidden="true" weight="bold" />
              {language === "ko" ? "제품으로 돌아가기" : "Back to products"}
            </a>
            <a className="help-language-link" href={alternatePath} lang={language === "ko" ? "en" : "ko"}>
              {alternateLabel}
            </a>
          </nav>
        </div>
      </header>

      <main id="help-content">
        <section className="help-hero">
          <div className="shell help-hero-inner">
            <div className="help-hero-copy">
              <div className="help-product-mark">
                <img src="/assets/products/haven-icon.svg" alt="" width="80" height="80" />
                <span>{content.hero.status}</span>
              </div>
              <h1>{content.hero.title}</h1>
              <p className="help-hero-lead">{content.hero.lead}</p>
              <p className="help-release-note">{content.hero.note}</p>
            </div>
            <figure className="help-hero-media">
              <img
                src="/assets/products/haven-containers.png"
                alt={language === "ko" ? "Haven Desktop의 컨테이너 목록과 상세 화면" : "Haven Desktop container list and details view"}
                width="1536"
                height="1061"
              />
            </figure>
          </div>
        </section>

        <div className="shell help-layout">
          <aside className="help-toc" aria-label={content.meta.tocLabel}>
            <p>{content.meta.tocTitle}</p>
            <nav>
              <ol>
                {sections.map((section) => (
                  <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="help-sections">
            {sections.map((section) => (
              <section className="help-section" id={section.id} key={section.id}>
                <p className="help-section-label">{section.label}</p>
                <h2>{section.title}</h2>
                {section.intro ? <p className="help-section-intro">{section.intro}</p> : null}
                {section.items ? (
                  <ul className="help-card-grid">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.id === "privacy-security-support" ? (
                  <a className="button button-outline help-contact" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}`}>
                    <EnvelopeSimple aria-hidden="true" weight="bold" />
                    {content.meta.contactLabel}
                  </a>
                ) : null}
              </section>
            ))}

            <aside className="help-boundary-note">
              <ShieldCheck aria-hidden="true" weight="duotone" />
              <div>
                <h2>{language === "ko" ? "제품 경계" : "Product boundary"}</h2>
                <p>{language === "ko"
                  ? "Haven Desktop은 Microsoft 또는 Docker의 제품이 아니며 두 회사가 보증하거나 지원하지 않습니다."
                  : "Haven Desktop is not a Microsoft or Docker product and is not endorsed or supported by either company."}</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="help-footer">
        <div className="shell help-footer-inner">
          <p>{content.meta.footerLine}</p>
          <a href={homePath}>
            cellaxon.com
            <ArrowRight aria-hidden="true" weight="bold" />
          </a>
        </div>
      </footer>
    </>
  );
}
