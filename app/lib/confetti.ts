/**
 * 微交互彩蛋粒子工具库 (canvas-confetti 封装)
 * 采用动态异步 import() 加载，零影响首屏打包体积
 */
export async function fireConfetti(options?: {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
}) {
  if (typeof window === "undefined") return;

  try {
    const confettiModule = await import("canvas-confetti");
    const confetti = confettiModule.default || confettiModule;

    confetti({
      particleCount: options?.particleCount ?? 45,
      spread: options?.spread ?? 60,
      origin: options?.origin ?? { y: 0.7 },
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"],
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.warn("Confetti animation failed:", err);
  }
}
