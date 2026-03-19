"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      duration={3000}
      toastOptions={{
        style: {
          background: "var(--color-primary)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "16px",
        },
        unstyled: false,
        classNames: {
          error: "!bg-[var(--color-error)]",
        },
      }}
    />
  );
}
