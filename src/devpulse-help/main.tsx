import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/noto-sans-kr";
import "@fontsource-variable/space-grotesk";
import "../styles.css";
import "../haven-help/styles.css";
import HavenHelpApp, { type HelpProduct } from "../haven-help/HavenHelpApp";
import { devpulseHelpContent } from "./content";

const devpulse: HelpProduct = {
  content: devpulseHelpContent,
  path: "/products/devpulse/",
  overviewAnchor: "#devpulse",
  icon: "/assets/products/devpulse-icon.png",
  heroImage: {
    en: { src: "/assets/products/devpulse/overview-en.png", width: 1600, height: 1000 },
    ko: { src: "/assets/products/devpulse/overview-ko.png", width: 1600, height: 1000 },
  },
  mailSubject: { en: "CELLAXON DevPulse support", ko: "CELLAXON DevPulse 문의" },
  contactSectionId: "privacy",
  links: [
    {
      href: "https://marketplace.visualstudio.com/items?itemName=cellaxon.cellaxon-devpulse",
      label: { en: "VS Code Marketplace", ko: "VS Code Marketplace" },
    },
    {
      href: "https://open-vsx.org/extension/cellaxon/cellaxon-devpulse",
      label: { en: "Open VSX", ko: "Open VSX" },
    },
  ],
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HavenHelpApp product={devpulse} />
  </StrictMode>,
);
