"use client";

import type { ComponentPropsWithoutRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type SheetContentProps = ComponentPropsWithoutRef<typeof Dialog.Content> & {
  overlayClassName?: string;
  side?: "top" | "bottom" | "left" | "right" | string;
};

export const Sheet = Dialog.Root;
export const SheetClose = Dialog.Close;

export function SheetContent({ children, className, overlayClassName, side, ...props }: SheetContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={overlayClassName ?? "fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity"} />
      <Dialog.Content className={className} {...props}>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
