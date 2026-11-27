"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { id: "how", label: "คืออะไร" },
  { id: "story", label: "ช่วยอะไร" },
];

/**
 * แถบด้านบนหน้าแรก
 * - อยู่บนพื้นเหลือง: โปร่ง ไม่มีพื้นหลัง ให้หัวข้อเด่น
 * - เลื่อนพ้นส่วนบนแล้ว: กลายเป็นแถบดำขอบล่างเหลือง แบบเดียวกับหัวแอปจริง
 * ลิงก์ของส่วนที่กำลังอ่านจะเป็นสีเหลือง
 */
export function TopBar() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    // ส่วนบนและส่วน 3 ขั้นไม่มีลิงก์ในแถบ: ถึงตรงนั้นแล้วไม่ต้องไฮไลต์ลิงก์ไหน
    const extra = ["top", "start"].map((id) => document.getElementById(id));
    [...extra, ...LINKS.map((l) => document.getElementById(l.id))].forEach((el) => el && io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        solid ? "border-b-[3px] border-brand bg-ink text-white" : "border-b-[3px] border-transparent bg-transparent text-ink",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6" aria-label="เมนูหลัก">
        <Link href="#top" className="text-2xl font-bold tracking-tight" aria-label="Kepz กลับขึ้นบนสุด">
          kepz<span className={solid ? "text-brand" : "text-white"}>.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const on = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={on ? "true" : undefined}
                  className={clsx(
                    "relative rounded-full px-3.5 py-2 text-[15px] font-semibold transition",
                    solid ? (on ? "text-brand" : "text-white/70 hover:text-white") : on ? "text-ink" : "text-ink/70 hover:text-ink",
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300",
                      solid ? "bg-brand" : "bg-ink",
                      on ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/login"
            className={clsx(
              "rounded-full border-[1.5px] px-4 py-2 text-sm font-semibold transition sm:px-5",
              solid
                ? "border-white/35 text-white hover:border-brand hover:text-brand"
                : "border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-brand",
            )}
          >
            เข้าสู่ระบบ
          </Link>
          {/* โผล่เมื่อเลื่อนพ้นส่วนบน (ส่วนบนมีปุ่มเริ่มใช้งานใหญ่อยู่แล้ว) */}
          <Link
            href="/signup"
            aria-hidden={!solid || undefined}
            tabIndex={solid ? undefined : -1}
            className={clsx(
              "rounded-full bg-brand px-4 py-2 text-sm font-bold text-ink transition-all duration-300 hover:bg-white sm:px-5",
              solid ? "animate-[fade-in_0.3s_ease-out]" : "hidden",
            )}
          >
            เริ่มใช้งาน
          </Link>
        </div>
      </nav>
    </header>
  );
}
