import Link from "next/link";
import type { ReactNode } from "react";
import { sriracha } from "@/lib/hand-font";

/**
 * โครงหน้าสมัคร/เข้าสู่ระบบ: ซ้ายเป็นพื้นเหลืองกับป้ายห้อยเชือก (ต่อเนื่องจากหน้าแรก) ขวาเป็นฟอร์ม
 * มือถือแสดงเฉพาะแถบเหลืองสั้นๆ ด้านบน ให้ฟอร์มอยู่ใกล้นิ้ว
 */
export function AuthShell({ tag, children }: { tag: ReactNode; children: ReactNode }) {
  return (
    <div className={`${sriracha.variable} grid min-h-dvh bg-white lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]`}>
      <aside className="relative overflow-hidden bg-brand px-5 pt-5 pb-8 lg:flex lg:flex-col lg:px-12 lg:pt-10 lg:pb-12">
        <Link href="/welcome" className="inline-block text-2xl font-bold tracking-tight lg:text-3xl">
          kepz<span className="text-white">.</span>
        </Link>
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div className="tag-idle w-full max-w-sm">
            <svg aria-hidden className="mx-auto block h-14 w-6 overflow-visible" viewBox="0 0 24 56">
              <path d="M12 0 C 5 18, 19 36, 12 56" fill="none" stroke="#1b1a17" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="big-tag relative -mt-2 bg-[#1b1a17] px-8 pt-16 pb-10 text-white">
              <span aria-hidden className="absolute top-6 left-1/2 size-5 -translate-x-1/2 rounded-full bg-brand" />
              {tag}
            </div>
          </div>
        </div>
      </aside>
      <main className="flex justify-center px-5 pt-8 pb-12 sm:pt-14 lg:items-center lg:py-12">
        <div className="w-full max-w-[26rem]">{children}</div>
      </main>
    </div>
  );
}
