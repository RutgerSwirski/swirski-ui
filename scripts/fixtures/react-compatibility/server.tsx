import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { CompatibilityProbe } from "./CompatibilityProbe";

process.stdout.write(renderToString(<StrictMode><CompatibilityProbe /></StrictMode>));
