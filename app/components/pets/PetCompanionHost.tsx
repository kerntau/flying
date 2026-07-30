"use client";

import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import PetCompanion from "./PetCompanion";

export function PetCompanionHost() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlayingBGM, setIsPlayingBGM] = useState(false);

  const toggleBGM = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => setIsPlayingBGM(false));
      return;
    }

    audio.pause();
  }, []);

  // 如果处于文章详情页 (/posts/...)，自动隐藏桌面宠物
  if (pathname && pathname.startsWith("/posts/")) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlayingBGM(true)}
        onPause={() => setIsPlayingBGM(false)}
      />
      <PetCompanion
        activeSection={pathname}
        reaction={null}
        isPlayingBGM={isPlayingBGM}
        onToggleBGM={toggleBGM}
      />
    </>
  );
}
