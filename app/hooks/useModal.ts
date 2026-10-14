"use client";
import { useCallback, useState } from "react";

export type UseModalReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useModal = (initialOpen = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};
