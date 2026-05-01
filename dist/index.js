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
export {
  Button
};
