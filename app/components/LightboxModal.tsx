"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { RotateCcw, ZoomIn, ZoomOut, X } from "lucide-react";

interface LightboxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  title?: string;
  description?: string;
}

export function LightboxModal({
  open,
  onOpenChange,
  imageUrl,
  title,
  description,
}: LightboxModalProps) {
  if (!imageUrl) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* 暗色基础遮罩 */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300" />
        
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 focus:outline-none select-none overflow-hidden">
          {/* 背景：当前相片极致高斯模糊毛玻璃图层 */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover scale-125 blur-3xl opacity-35 brightness-75 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/70" />
          </div>

          <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* 顶部悬浮控制栏 */}
                <div className="w-full flex items-center justify-between z-50 px-2 sm:px-4">
                  {/* 左侧：标题微预览 */}
                  <div className="text-white/90 font-semibold text-sm sm:text-base truncate max-w-xs sm:max-w-md drop-shadow-sm">
                    {title || "光影预览"}
                  </div>

                  {/* 右侧：缩放控制胶囊 + 关闭按钮 */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-black/40 border border-white/20 backdrop-blur-xl p-1 rounded-xl text-white shadow-lg">
                      <button
                        type="button"
                        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                        onClick={() => zoomIn()}
                        aria-label="放大图片"
                      >
                        <ZoomIn size={16} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                        onClick={() => zoomOut()}
                        aria-label="缩小图片"
                      >
                        <ZoomOut size={16} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                        onClick={() => resetTransform()}
                        aria-label="重置图片"
                      >
                        <RotateCcw size={16} />
                      </button>
                    </div>

                    {/* 关闭按钮 */}
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="p-2 rounded-xl bg-black/40 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
                        aria-label="关闭预览"
                      >
                        <X size={18} />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                {/* 中央主体：通透自适应图片大图 stage */}
                <div className="relative z-10 flex-1 w-full flex items-center justify-center py-4 my-auto overflow-hidden">
                  <TransformComponent
                    wrapperClass="w-full h-full flex items-center justify-center"
                    contentClass="flex items-center justify-center"
                  >
                    <img
                      src={imageUrl}
                      alt={title || "光影大图"}
                      className="max-w-[90vw] max-h-[78vh] object-contain rounded-xl shadow-2xl transition-all duration-300 animate-in zoom-in-95 duration-200"
                    />
                  </TransformComponent>
                </div>
              </>
            )}
          </TransformWrapper>

          {/* 底部悬浮信息面板 */}
          {(title || description) && (
            <div className="w-full flex justify-center z-50 pb-2">
              <div className="bg-black/55 border border-white/15 backdrop-blur-xl px-6 py-3 rounded-2xl text-center text-white space-y-1 max-w-xl shadow-2xl">
                {title && <h3 className="text-base sm:text-lg font-extrabold tracking-tight">{title}</h3>}
                {description && <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">{description}</p>}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ImagePreviewButton({
  imageUrl,
  title,
  description,
  className,
}: Omit<LightboxModalProps, "open" | "onOpenChange"> & { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-label={`预览图片：${title || "图片"}`}
      >
        <img
          src={imageUrl}
          alt={title || "图片"}
          className="w-full h-full object-cover"
        />
      </button>
      <LightboxModal
        open={open}
        onOpenChange={setOpen}
        imageUrl={imageUrl}
        title={title}
        description={description}
      />
    </>
  );
}
