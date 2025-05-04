"use client";

import { toast as sonnerToast } from "sonner";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 4000; // Adjusted for better UX

type ToastActionElement = React.ReactNode;
type ToastVariant = "default" | "info" | "error";


type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: ToastVariant;
};

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type Toast = Omit<ToasterToast, "id">;

function toast({ title, description, action, variant = "default"}: Toast) {
  const id = genId();

  if (variant==='error') {
    sonnerToast.error(title, {
      description,
      action,
      duration: TOAST_REMOVE_DELAY,
    }
    )
  }
  else {
    sonnerToast(title, {
      description,
      action,
      duration: TOAST_REMOVE_DELAY,
    });
  }
  return { id, dismiss: () => sonnerToast.dismiss(id) };
}

function useToast() {
  return { toast, dismiss: sonnerToast.dismiss };
}

export { useToast, toast };
