import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/noto-sans-kr";
import "@fontsource-variable/space-grotesk";
import "../styles.css";
import "../haven-help/styles.css";
import HavenHelpApp, { type HelpProduct } from "../haven-help/HavenHelpApp";
import { havenVscodeHelpContent } from "./content";

const havenVscode: HelpProduct = {
  content: havenVscodeHelpContent,
  path: "/products/haven-vscode/",
  overviewAnchor: "#haven-vscode",
  icon: "/assets/products/haven-icon.svg",
  heroImage: {
    en: { src: "/assets/products/haven-vscode/containers-en.png", width: 1600, height: 1000 },
    ko: { src: "/assets/products/haven-vscode/containers-ko.png", width: 1600, height: 1000 },
  },
  mailSubject: { en: "Haven for VS Code support", ko: "Haven for VS Code 문의" },
  contactSectionId: "privacy-support",
  links: [
    {
      href: "https://marketplace.visualstudio.com/items?itemName=cellaxon.haven-vscode",
      label: { en: "VS Code Marketplace", ko: "VS Code Marketplace" },
    },
    {
      href: "https://open-vsx.org/extension/cellaxon/haven-vscode",
      label: { en: "Open VSX", ko: "Open VSX" },
    },
  ],
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HavenHelpApp product={havenVscode} />
  </StrictMode>,
);
