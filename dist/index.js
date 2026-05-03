// src/components/button/Button.tsx
import clsx from "clsx";
import { jsx } from "react/jsx-runtime";
var baseStyles = "inline-block hover:cursor-pointer border-4 border-black px-6 py-3 font-black uppercase transition-all duration-200 shadow-[6px_6px_0_#0B0B0C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2";
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
var base = "group relative border-4 border-black bg-[#F5F5F3]";
var interactiveStyles = "transition-all duration-150 hover:-translate-y-2 hover:shadow-[12px_12px_0_#0B0B0C] active:translate-y-2 active:shadow-[4px_4px_0_#0B0B0C] cursor-pointer";
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
  return /* @__PURE__ */ jsx7("span", { className: "absolute left-2 top-2 z-20 border-2 border-black bg-transparent px-2 py-1 text-xs font-black uppercase", children });
}

// src/components/container/Container.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Container({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx8("div", { className: `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`, children });
}

// src/components/dot-grid/DotGrid.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function DotGrid({ className = "" }) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      className: `pointer-events-none absolute opacity-20 bg-[radial-gradient(#0B0B0C_1.2px,transparent_1.2px)] bg-size-[13px_13px] ${className}`
    }
  );
}

// src/components/image-frame/ImageFrame.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
function ImageFrame({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      className: `
        relative overflow-hidden 
        border-2 border-black 
        bg-[#F5F5F3]
        shadow-[5px_5px_0_#0B0B0C]
        ${className}
      `,
      children
    }
  );
}

// src/components/section-label/SectionLabel.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
function SectionLabel({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx11(
    "h2",
    {
      className: `w-fit -rotate-2 border-4 border-black bg-[#FFD400] px-4 py-2 font-bangers text-4xl uppercase tracking-wide shadow-[4px_4px_0_#0B0B0C] ${className}`,
      children
    }
  );
}

// src/components/hero-actions/HeroActions.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
function HeroActions({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx12("div", { className: `mt-9 flex flex-wrap items-center gap-5 ${className}`, children });
}

// src/components/hero-kicker/HeroKicker.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
function HeroKicker({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx13(
    "p",
    {
      className: `mb-5 inline-block w-fit -rotate-3 border-3 border-black bg-[#FFD400] px-4 py-1 font-bangers text-xl uppercase tracking-wide md:text-2xl ${className}`,
      children
    }
  );
}

// src/components/hero-lead/HeroLead.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
function HeroLead({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx14(
    "p",
    {
      className: `mt-6 max-w-xl text-lg leading-relaxed text-black/70 ${className}`,
      children
    }
  );
}

// src/components/hero-title/HeroTitle.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
function HeroTitle({
  children,
  className,
  variant = "editorial"
}) {
  const variants2 = {
    editorial: "font-anton uppercase leading-[0.9] tracking-[-0.02em]",
    loud: "font-anton uppercase leading-[0.9] tracking-[-0.02em]"
  };
  return /* @__PURE__ */ jsx15("h1", { className: `${variants2[variant]} ${className}`, children });
}
export {
  Button,
  Card,
  CardBadge,
  CardContent,
  CardMedia,
  CardMeta,
  CardTitle,
  Container,
  DotGrid,
  HeroActions,
  HeroKicker,
  HeroLead,
  HeroTitle,
  ImageFrame,
  SectionLabel
};
