import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { DayStory } from "./day-story";
import { sriracha } from "@/lib/hand-font";
import { StartSteps } from "./start-steps";
import { TagRiver } from "./tag-river";

export const metadata: Metadata = {
  title: { absolute: "Kepz — มีอะไรให้เช่า ก็จัดการได้บน Kepz" },
  description: "ระบบจัดการธุรกิจให้เช่า ห้อง ที่จอด แผงตลาด รถ ชุด อุปกรณ์ ทำสัญญา ออกบิล รับเงิน ครบในที่เดียว ใช้บนมือถือได้",
};

/** หน้าแรกสำหรับคนทั่วไป: ชวนมาใช้ Kepz */
export default function WelcomePage() {
  return (
    <div
      className={`${sriracha.variable} min-h-dvh bg-white text-ink`}
    >
      {/* เปิดการเคลื่อนไหวเฉพาะเมื่อ JS พร้อม ถ้าไม่มี JS เนื้อหาแสดงตามปกติ */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('motion-ready')" }} />
      <Hero />
      <TagRiver />
      <DayStory />
      <StartSteps />
      <Closing />
      <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-ink/55 sm:px-10">
        <span className="text-lg font-bold text-ink">
          kepz<span className="text-brand-strong">.</span>
        </span>
        <span>มีอะไรให้เช่า ก็จัดการได้บน Kepz</span>
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-brand">
      <header
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <span className="text-2xl font-bold tracking-tight">
          kepz<span className="text-white">.</span>
        </span>
        <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold">
          <span className="roll">
            <span>เข้าสู่ระบบ</span>
            <span aria-hidden>เข้าสู่ระบบ</span>
          </span>
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-5 pt-14 pb-24 text-center sm:pt-20 sm:pb-32">
        <h1 className="text-[3.1rem] leading-[1.08] font-bold tracking-[-0.03em] sm:text-[6.5rem]">
          <span className="line-rise" style={intro(0)}>
            <span>มีอะไรให้เช่า</span>
          </span>
          <span className="line-rise" style={intro(110)}>
            <span>ก็จัดการได้</span>
          </span>
        </h1>
        <p className="intro mx-auto mt-7 max-w-lg text-lg leading-relaxed text-ink/70 sm:text-xl" style={intro(420)}>
          <Phrases text="ห้อง ที่จอด แผงตลาด รถ ชุด อุปกรณ์ ทำสัญญา ออกบิล รับเงิน และดูว่าอะไรว่าง บนมือถือเครื่องเดียว" />
        </p>
        <div className="intro mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" style={intro(560)}>
          <Link href="/signup" className="ink-cta w-full max-w-xs sm:w-auto">
            <span>เริ่มใช้งาน Kepz</span>
            <span aria-hidden className="ink-cta-mark">
              <ArrowRight className="ink-cta-arrow" strokeWidth={2.5} />
              <ArrowRight className="ink-cta-arrow" strokeWidth={2.5} />
            </span>
          </Link>
          <a href="#day" className="group inline-flex items-center gap-3 px-4 py-3 text-base font-semibold">
            <span className="grid size-10 place-items-center rounded-full border-2 border-ink/80 transition group-hover:bg-ink group-hover:text-brand">
              <ArrowDown className="nudge-down size-5" strokeWidth={2.5} />
            </span>
            เลื่อนลงดูว่าใช้ยังไง
          </a>
        </div>
      </div>
    </section>
  );
}

function intro(ms: number): CSSProperties {
  return { ["--intro-delay" as string]: `${ms}ms` };
}

function Closing() {
  return (
    <section className="overflow-hidden px-4 pt-10 pb-16 sm:px-6">
      {/* ป้ายใหญ่ห้อยเชือก: แกว่งเข้ามาเมื่อเลื่อนถึง */}
      <div className="tag-swing mx-auto max-w-4xl">
        <svg aria-hidden className="mx-auto block h-16 w-6 overflow-visible" viewBox="0 0 24 64">
          <path d="M12 0 C 4 22, 20 40, 12 64" fill="none" stroke="#1b1a17" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="big-tag relative -mt-3 bg-[#1b1a17] px-6 pt-20 pb-16 text-center text-white sm:px-12 sm:pb-20">
          <span aria-hidden className="absolute top-7 left-1/2 size-6 -translate-x-1/2 rounded-full bg-white ring-4 ring-brand" />
          <p className="hand text-2xl text-brand">ป้ายนี้ว่าง รอของของคุณอยู่</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
            <Phrases text="เริ่มจากของที่คุณ ให้เช่าอยู่วันนี้" />
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/65">
            <Phrases text="มีห้องเดียวหรือร้อยห้อง แผงเดียวหรือทั้งตลาด เริ่มได้เลย แล้วค่อยเพิ่มของอย่างอื่นเมื่อพร้อม" />
          </p>
          <ShinyButton href="/signup" className="mt-10 w-full max-w-xs sm:w-auto">
            เริ่มใช้งาน Kepz
          </ShinyButton>
        </div>
      </div>
    </section>
  );
}

/**
 * ภาษาไทยไม่เว้นวรรคระหว่างคำ เบราว์เซอร์จึงตัดบรรทัดกลางวลีได้
 * แยกตามช่องว่างแล้วให้แต่ละวลีอยู่บรรทัดเดียวกันเสมอ
 */
function Phrases({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {w}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
