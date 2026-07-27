"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./Icon";

interface LightboxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  title?: string;
  description?: string;
}

export function LightboxModal({ open, onOpenChange, imageUrl, title, description }: LightboxModalProps) {
  if (!imageUrl) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md transition-opacity animate-in fade-in duration-200" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8 focus:outline-none">
          <Dialog.Close asChild>
            <button
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="关闭预览"
            >
              <Icon name="x" size={24} />
            </button>
          </Dialog.Close>

          <div className="relative max-w-5xl max-h-[80vh] overflow-hidden rounded-2xl flex flex-col items-center">
            <img
              src={imageUrl}
              alt={title || "图片大图预览"}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            {(title || description) && (
              <div className="mt-4 text-center text-white space-y-1 max-w-xl">
                {title && <h3 className="text-lg font-bold">{title}</h3>}
                {description && <p className="text-xs text-gray-300">{description}</p>}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
