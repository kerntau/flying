"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
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
            <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <button type="button" className="rounded-full bg-black/45 p-2 text-white hover:bg-black/65" onClick={() => zoomIn()} aria-label="放大图片"><ZoomIn size={18} /></button>
                    <button type="button" className="rounded-full bg-black/45 p-2 text-white hover:bg-black/65" onClick={() => zoomOut()} aria-label="缩小图片"><ZoomOut size={18} /></button>
                    <button type="button" className="rounded-full bg-black/45 p-2 text-white hover:bg-black/65" onClick={() => resetTransform()} aria-label="重置图片缩放"><RotateCcw size={18} /></button>
                  </div>
                  <TransformComponent wrapperClass="max-w-full max-h-[75vh]" contentClass="max-w-full">
                    <img src={imageUrl} alt={title || "图片大图预览"} className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl" />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
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

export function ImagePreviewButton({ imageUrl, title, description, className }: Omit<LightboxModalProps, "open" | "onOpenChange"> & { className?: string }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" className={className} onClick={() => setOpen(true)} aria-label={`预览图片：${title || "图片"}`}><img src={imageUrl} alt={title || "图片"} className="w-full h-full object-cover" /></button><LightboxModal open={open} onOpenChange={setOpen} imageUrl={imageUrl} title={title} description={description} /></>;
}
