"use client";

import clsx from "clsx";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

/** "เลื่อนลง" ติดขอบล่างจอตั้งแต่เปิดหน้า เห็นได้ทันทีโดยไม่ต้องเลื่อน แล้วค่อยๆ หายเมื่อเริ่มเลื่อน */
export function ScrollCue() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#how"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={clsx(
        "fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center text-xs font-medium text-ink/50 transition-[opacity,translate] duration-500 hover:text-ink",
        hidden && "pointer-events-none translate-y-4 opacity-0",
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      เลื่อนลง
      <ArrowDown className="nudge-down size-3.5" strokeWidth={2.5} />
    </a>
  );
}
