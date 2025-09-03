"use client";

import * as React from "react";

// Minimal type surface expected by hooks/use-toast and components/ui/use-toast
export type ToastActionElement = React.ReactElement;

export type ToastProps = {
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Optional placeholder components to avoid runtime errors if imported elsewhere
export function Toaster() {
  return null;
}

export function Toast(_props: ToastProps) {
  return null;
}
