import "@swirski/ui/styles.css";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { CompatibilityProbe } from "./CompatibilityProbe";

const root = document.getElementById("root")!;
const app = <StrictMode><CompatibilityProbe /></StrictMode>;
if (root.hasChildNodes()) {
  hydrateRoot(root, app, {
    onRecoverableError(error) {
      console.error("Recoverable hydration error:", error);
    },
  });
} else {
  createRoot(root).render(app);
}
