"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import clsx from "clsx";

export type ToastTone = "blue" | "yellow" | "red" | "white";
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

export function ToastProvider({ children }: { children: ReactNode }) {
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

export function Toast({
  tone = "yellow",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { tone?: ToastTone }) {
  return (
    <div
      className={clsx(
        "border-4 border-black p-4 shadow-[6px_6px_0_#0B0B0C]",
        toneStyles[tone],
        className,
      )}
      role="status"
      {...props}
    />
  );
}

export function ToastTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx("font-black uppercase", className)} {...props} />;
}

export function ToastDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx("mt-1 text-sm font-bold leading-5", className)} {...props} />;
}

export function ToastClose({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx("ml-auto font-black uppercase underline", className)}
      type="button"
      {...props}
    />
  );
}

export function ToastViewport({ className }: { className?: string }) {
  const { toasts, removeToast } = useToast();

  return (
    <div className={clsx("fixed bottom-4 right-4 z-50 grid w-80 gap-3", className)}>
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
}
