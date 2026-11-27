import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * ปุ่มเรืองแสง (ขอบแสงสีเหลืองวิ่งรอบปุ่มดำ) ใช้ชวนกดในจุดสำคัญ เช่น ท้ายหน้าแรก
 * สไตล์อยู่ใน globals.css (.shiny-cta) · ใส่ href = ลิงก์, ไม่ใส่ = ปุ่ม
 */
export function ShinyButton({
  children,
  href,
  onClick,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const inner = <span>{children}</span>;
  if (href) {
    return (
      <Link href={href} className={clsx("shiny-cta", className)}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={clsx("shiny-cta", className)} onClick={onClick}>
      {inner}
    </button>
  );
}
