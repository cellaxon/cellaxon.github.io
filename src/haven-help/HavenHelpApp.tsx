import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, EnvelopeSimple, MagnifyingGlassPlus, ShieldCheck, X } from "@phosphor-icons/react";
import type { HavenHelpBlock, HavenHelpImage, HavenHelpLanguage, HavenHelpPageContent } from "./content";

type Localized = Record<HavenHelpLanguage, string>;

/** One product's help page: its content plus the few things that differ between products. */
export type HelpProduct = {
  content: Record<HavenHelpLanguage, HavenHelpPageContent>;
  /** English path of the page, with slashes on both ends. The Korean page is the same path under /ko. */
  path: string;
  /** Anchor of the product on the home page, for the "back" link. */
  overviewAnchor: string;
  icon: string;
  heroImage: Record<HavenHelpLanguage, { src: string; width: number; height: number }>;
  mailSubject: Localized;
  /** Section that ends with the contact button. */
  contactSectionId: string;
  /** Where to get the product, shown as buttons in the hero. */
  links?: readonly { href: string; label: Localized }[];
};

const CONTACT_EMAIL = "contact@cellaxon.com";

function getLanguage(): HavenHelpLanguage {
  return window.location.pathname.startsWith("/ko/") ? "ko" : "en";
}

function assertNever(value: never): never {
  throw new Error(`Unsupported Haven help block: ${JSON.stringify(value)}`);
}

// The page renders on the client, so the browser cannot scroll to a #section on first load by itself.
function scrollToInitialHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
}

// Carries the reader's place over to the other language: the last section whose top has reached the
// area under the sticky header. Sections share their IDs across languages.
function currentSectionHash() {
  // A TOC jump leaves a section's top at the root scroll-padding plus its scroll-margin; read both from
  // CSS so this stays in step with the styles, and allow some slack for a little extra scrolling.
  const rootPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  // Keep an explicitly selected section even if focus or layout shifts the scroll position.
  const hash = window.location.hash;
  if (document.getElementById(hash.slice(1))?.classList.contains("help-section")) return hash;
  let current = "";
  for (const section of document.querySelectorAll<HTMLElement>(".help-section[id]")) {
    const landing = rootPadding + (parseFloat(getComputedStyle(section).scrollMarginTop) || 0);
    if (section.getBoundingClientRect().top <= landing + 40) current = `#${section.id}`;
  }
  return current;
}

type ZoomLabels = { zoomLabel: string; closeLabel: string };

// A screenshot that opens enlarged in a modal dialog. The native <dialog> traps focus, closes on Escape
// and returns focus to the button that opened it.
function ZoomableImage({ image, labels, className }: { image: HavenHelpImage; labels: ZoomLabels; className: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <figure className={className}>
      <button
        type="button"
        className="help-zoom-trigger"
        aria-haspopup="dialog"
        aria-label={`${labels.zoomLabel}: ${image.alt}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" />
        <span className="help-zoom-badge" aria-hidden="true">
          <MagnifyingGlassPlus weight="bold" />
        </span>
      </button>
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
      <dialog
        ref={dialogRef}
        className="help-zoom-dialog"
        aria-label={image.alt}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="help-zoom-frame">
          <button type="button" className="help-zoom-close" onClick={close} aria-label={labels.closeLabel}>
            <X aria-hidden="true" weight="bold" />
          </button>
          <div className="help-zoom-scroll">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              // Not shown until the dialog opens, so don't fetch it with the page.
              loading="lazy"
              style={{ "--zoom-natural-width": `${image.width}px`, "--zoom-ratio": image.width / image.height } as CSSProperties}
            />
          </div>
          {image.caption ? <p className="help-zoom-caption">{image.caption}</p> : null}
        </div>
      </dialog>
    </figure>
  );
}

function HelpBlock({ block, labels }: { block: HavenHelpBlock; labels: ZoomLabels }) {
  switch (block.type) {
    case "paragraph":
      return <p className="help-section-intro">{block.text}</p>;
    case "facts":
      return (
        <ul className="help-card-grid">
          {block.items.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <div className="help-steps-block">
          <h3>{block.title}</h3>
          <ol className="help-steps">
            {block.items.map((item) => (
              <li key={item.id}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
                {item.image ? <ZoomableImage image={item.image} labels={labels} className="help-step-image" /> : null}
              </li>
            ))}
          </ol>
        </div>
      );
    case "note":
    case "warning":
      return (
        <aside className={`help-callout help-callout-${block.type}`}>
          <h3>{block.title}</h3>
          <p>{block.text}</p>
        </aside>
      );
    case "code":
      return (
        <figure className="help-code-block">
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
          <pre><code data-language={block.language}>{block.code}</code></pre>
        </figure>
      );
    case "image":
      return <ZoomableImage image={block} labels={labels} className="help-content-image" />;
    case "table":
      return (
        <div className="help-table-wrap">
          <table className="help-table">
            <thead>
              <tr>{block.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return assertNever(block);
  }
}

export default function HavenHelpApp({ product }: { product: HelpProduct }) {
  const language = getLanguage();
  const content = product.content[language];
  const sections = content.sections.filter((section) => section.status === "published");
  const homePath = language === "ko" ? "/ko/" : "/";
  const alternatePath = language === "ko" ? product.path : `/ko${product.path}`;
  const alternateLabel = language === "ko" ? "EN" : "KR";
  const mailSubject = product.mailSubject[language];
  const heroImage = product.heroImage[language];

  useEffect(scrollToInitialHash, []);

  const keepPlace = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = `${alternatePath}${currentSectionHash()}`;
  };

  return (
    <>
      <a className="skip-link" href="#help-content">{content.meta.skipLabel}</a>
      <header className="help-header">
        <div className="shell help-header-inner">
          <a className="help-brand" href={homePath} aria-label={content.meta.homeLabel}>
            <img src="/assets/brand/cellaxon-lockup.png" alt="CELLAXON" width="416" height="74" />
          </a>
          <nav className="help-header-actions" aria-label={content.meta.languageLabel}>
            <a className="help-home-link" href={`${homePath}${product.overviewAnchor}`}>
              <ArrowLeft aria-hidden="true" weight="bold" />
              {language === "ko" ? "제품 소개로 돌아가기" : "Back to product overview"}
            </a>
            <a className="help-language-link" href={alternatePath} onClick={keepPlace} lang={language === "ko" ? "en" : "ko"}>
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
                <img src={product.icon} alt="" width="80" height="80" />
                <span>{content.hero.status}</span>
              </div>
              <h1>{content.hero.title}</h1>
              <p className="help-hero-lead">{content.hero.lead}</p>
              <p className="help-release-note">{content.hero.note}</p>
              {product.links ? (
                <div className="help-hero-links">
                  {product.links.map((link) => (
                    <a className="button button-outline" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                      {link.label[language]}
                      <ArrowUpRight aria-hidden="true" weight="bold" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <figure className="help-hero-media">
              <img src={heroImage.src} alt={content.hero.mediaAlt} width={heroImage.width} height={heroImage.height} />
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
                {section.blocks.map((block) => <HelpBlock block={block} labels={content.meta} key={block.id} />)}
                {section.id === product.contactSectionId ? (
                  <a className="button button-outline help-contact" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}`}>
                    <EnvelopeSimple aria-hidden="true" weight="bold" />
                    {content.meta.contactLabel}
                  </a>
                ) : null}
              </section>
            ))}

            {content.boundary.title && content.boundary.body ? (
              <aside className="help-boundary-note">
                <ShieldCheck aria-hidden="true" weight="duotone" />
                <div>
                  <h2>{content.boundary.title}</h2>
                  <p>{content.boundary.body}</p>
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </main>

      <footer className="help-footer">
        <div className="shell help-footer-inner">
          <p>{content.boundary.footerLine}</p>
          <a href={homePath}>
            cellaxon.com
            <ArrowRight aria-hidden="true" weight="bold" />
          </a>
        </div>
      </footer>
    </>
  );
}
