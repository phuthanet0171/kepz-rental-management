"use client";

import clsx from "clsx";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * โผล่เมื่อเลื่อนมาถึง: ค่อยๆ ปรากฏ + เลื่อนขึ้นเล็กน้อย ครั้งเดียว
 * variant: up (เลื่อนขึ้น) · pop (ขยายจากเล็ก + เอียงนิด) · fade (จางเข้า) · left/right (เลื่อนเข้าจากข้าง) · drop (ตกลงมาแล้วแกว่ง)
 * delay (ms) ใช้ไล่จังหวะทีละชิ้น · ไม่มี JS หรือผู้ใช้ตั้งลดการเคลื่อนไหว = แสดงทันที (ดู globals.css)
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  as?: "div" | "li" | "section" | "span";
  variant?: "up" | "pop" | "fade" | "left" | "right" | "drop";
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.shown = "";
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal={variant}
      className={clsx(className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
