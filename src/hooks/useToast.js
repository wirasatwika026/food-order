"use client";

import { useToastContext } from "@/contexts/ToastContext";

export function useToast() {
  const { addToast } = useToastContext();

  const showToast = (message, options = {}) => {
    const { type = "info", duration = 5000 } = options;
    addToast(message, type, duration);
  };

  return { showToast };
}
