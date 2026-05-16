"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";
import { cn, swirskiAttrs } from "../../system";

export type ToastTone = "blue" | "yellow" | "red" | "white";
export type ToastVariant = "solid" | "outline";
export type ToastSize = "sm" | "md" | "lg";
export type ToastItem = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
};

type ToastContextValue = {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id"> & { id?: string }) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneStyles: Record<ToastTone, string> = {
  blue: "bg-[#0057FF] text-white",
  yellow: "bg-[#FFD400] text-black",
  red: "bg-[#FF3131] text-white",
  white: "bg-white text-black",
};

export type ToastProviderProps = {
  children: ReactNode;
  variant?: ToastVariant;
  size?: ToastSize;
  tone?: ToastTone;
};

export function ToastProvider({
  children,
  variant: _variant = "solid",
  size: _size = "md",
  tone: _tone = "yellow",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function addToast(toast: Omit<ToastItem, "id"> & { id?: string }) {
    const id = toast.id ?? `${Date.now()}-${Math.random()}`;
    setToasts((currentToasts) => [...currentToasts, { ...toast, id }]);
  }

  function removeToast(id: string) {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }

  return context;
}

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  variant?: ToastVariant;
  size?: ToastSize;
  tone?: ToastTone;
};

const sizeStyles: Record<ToastSize, string> = {
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast({
  variant = "solid",
  size = "md",
  tone = "yellow",
  className,
  ...props
}, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "border-4 border-black shadow-[6px_6px_0_#0B0B0C]",
        sizeStyles[size],
        variant === "solid" ? toneStyles[tone] : "bg-white text-black",
        className,
      )}
      role="status"
      {...swirskiAttrs("toast", { size, tone, variant })}
      {...props}
    />
  );
});

Toast.displayName = "Toast";

export type ToastTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  variant?: ToastVariant;
  size?: ToastSize;
  tone?: ToastTone;
};

export const ToastTitle = forwardRef<HTMLHeadingElement, ToastTitleProps>(
  function ToastTitle({
  className,
  variant = "solid",
  size = "md",
  tone = "yellow",
  ...props
}, ref) {
  return (
    <h3
      ref={ref}
      className={cn("font-black uppercase", className)}
      {...swirskiAttrs("toast-title", { size, tone, variant })}
      {...props}
    />
  );
});

ToastTitle.displayName = "ToastTitle";

export type ToastDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: ToastVariant;
  size?: ToastSize;
  tone?: ToastTone;
};

export const ToastDescription = forwardRef<
  HTMLParagraphElement,
  ToastDescriptionProps
>(function ToastDescription({
  className,
  variant = "solid",
  size = "md",
  tone = "yellow",
  ...props
}, ref) {
  return (
    <p
      ref={ref}
      className={cn("mt-1 text-sm font-bold leading-5", className)}
      {...swirskiAttrs("toast-description", { size, tone, variant })}
      {...props}
    />
  );
});

ToastDescription.displayName = "ToastDescription";

export type ToastCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ToastVariant;
  size?: ToastSize;
  tone?: ToastTone;
};

export const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(
  function ToastClose({
  className,
  variant = "solid",
  size = "md",
  tone = "yellow",
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      className={cn("ml-auto font-black uppercase underline", className)}
      type="button"
      {...swirskiAttrs("toast-close", { size, tone, variant })}
      {...props}
    />
  );
});

ToastClose.displayName = "ToastClose";

export type ToastViewportProps = {
  variant?: ToastVariant;
  size?: ToastSize;
  tone?: ToastTone;
} & HTMLAttributes<HTMLDivElement>;

export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(
  function ToastViewport({
  className,
  variant = "solid",
  size = "md",
  tone = "yellow",
  ...props
}, ref) {
  const { toasts, removeToast } = useToast();

  return (
    <div
      ref={ref}
      className={cn("fixed bottom-4 right-4 z-50 grid w-80 gap-3", className)}
      {...swirskiAttrs("toast-viewport", { size, tone, variant })}
      {...props}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} tone={toast.tone}>
          <div className="flex gap-3">
            <div>
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </div>
            <ToastClose onClick={() => removeToast(toast.id)}>Close</ToastClose>
          </div>
        </Toast>
      ))}
    </div>
  );
});

ToastViewport.displayName = "ToastViewport";
