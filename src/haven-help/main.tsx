import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/noto-sans-kr";
import "@fontsource-variable/space-grotesk";
import "../styles.css";
import "./styles.css";
import HavenHelpApp from "./HavenHelpApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HavenHelpApp />
  </StrictMode>,
);
