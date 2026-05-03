// src/components/Button.tsx
import clsx from "clsx";
import { jsx } from "react/jsx-runtime";
var baseStyles = "inline-block border-4 border-black px-6 py-3 font-black uppercase transition-all duration-200 shadow-[6px_6px_0_#0B0B0C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2";
var variants = {
  blue: "bg-[#0057FF] text-white",
  yellow: "bg-[#FFD400] text-black",
  white: "bg-white text-black"
};
function Button({
  children,
  href,
  variant = "blue",
  className,
  ...props
}) {
  const styles = clsx(baseStyles, variants[variant], className);
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, className: styles, children });
  }
  return /* @__PURE__ */ jsx("button", { className: styles, ...props, children });
}

// src/components/card/Card.tsx
import clsx2 from "clsx";
import { jsx as jsx2 } from "react/jsx-runtime";
var base = "group relative border-4 border-black bg-[#F5F5F3] shadow-[8px_8px_0_#0B0B0C]";
var interactiveStyles = "transition-all duration-150 hover:-translate-y-2 hover:shadow-[12px_12px_0_#0B0B0C] active:translate-y-1 active:translate-x-1 active:shadow-[4px_4px_0_#0B0B0C] cursor-pointer";
function Card({ children, className, interactive = true }) {
  return /* @__PURE__ */ jsx2(
    "article",
    {
      className: clsx2(base, interactive ? interactiveStyles : "", className),
      children
    }
  );
}

// src/components/card/CardMedia.tsx
import clsx3 from "clsx";
import { jsx as jsx3 } from "react/jsx-runtime";
function CardMedia({
  children,
  className,
  aspect = "4/3"
}) {
  return /* @__PURE__ */ jsx3("div", { className: clsx3("border-b-4 border-black", className), children: /* @__PURE__ */ jsx3(
    "div",
    {
      className: clsx3(
        "relative overflow-hidden bg-white",
        `aspect-[${aspect}]`
      ),
      children
    }
  ) });
}

// src/components/card/CardContent.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function CardContent({
  children,
  className
}) {
  return /* @__PURE__ */ jsx4("div", { className: `p-5 ${className}`, children });
}

// src/components/card/CardTitle.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function CardTitle({ children }) {
  return /* @__PURE__ */ jsx5("h3", { className: "mt-3 font-anton text-2xl uppercase tracking-[-0.02em] group-hover:underline", children });
}

// src/components/card/CardMeta.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function CardMeta({ children }) {
  return /* @__PURE__ */ jsx6("div", { className: "mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-black uppercase", children });
}

// src/components/card/CardBadge.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
function CardBadge({ children }) {
  return /* @__PURE__ */ jsx7("span", { className: "absolute left-2 top-2 z-20 border-2 border-black bg-[#F5F5F3] px-2 py-1 text-xs font-black uppercase", children });
}
export {
  Button,
  Card,
  CardBadge,
  CardContent,
  CardMedia,
  CardMeta,
  CardTitle
};
