import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/noto-sans-kr";
import "@fontsource-variable/space-grotesk";
import "../styles.css";
import "./styles.css";
import HavenHelpApp, { type HelpProduct } from "./HavenHelpApp";
import { havenHelpContent } from "./content";

const havenDesktopScreenshot = { src: "/assets/products/haven-containers.png", width: 1536, height: 1040 };

const havenDesktop: HelpProduct = {
  content: havenHelpContent,
  path: "/products/haven-desktop/",
  overviewAnchor: "#haven",
  icon: "/assets/products/haven-icon.svg",
  heroImage: { en: havenDesktopScreenshot, ko: havenDesktopScreenshot },
  mailSubject: { en: "Haven Desktop support", ko: "Haven Desktop 문의" },
  contactSectionId: "privacy-security-support",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HavenHelpApp product={havenDesktop} />
  </StrictMode>,
);
