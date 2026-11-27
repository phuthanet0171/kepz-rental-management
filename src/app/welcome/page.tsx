import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowRight } from "lucide-react";
import { DayStory } from "./day-story";
import { TagRiver } from "./tag-river";

export const metadata: Metadata = {
  title: { absolute: "Kepz — มีอะไรให้เช่า ก็จัดการได้บน Kepz" },
  description: "ระบบจัดการธุรกิจให้เช่า ห้อง ที่จอด แผงตลาด รถ ชุด อุปกรณ์ ทำสัญญา ออกบิล รับเงิน ครบในที่เดียว ใช้บนมือถือได้",
};

/** หน้าแรกสำหรับคนทั่วไป: ชวนมาใช้ Kepz */
export default function WelcomePage() {
  return (
    <div className="min-h-dvh bg-[#f7f5ef] text-[#161513]">
      {/* เปิดการเคลื่อนไหวเฉพาะเมื่อ JS พร้อม ถ้าไม่มี JS เนื้อหาแสดงตามปกติ */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('motion-ready')" }} />
      <Hero />
      <TagRiver />
      <section id="day" className="mx-auto max-w-6xl scroll-mt-6 px-5 pt-24 pb-8 sm:pt-32">
        <Reveal>
          <h2 className="max-w-2xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
            <Phrases text="หนึ่งวันของคน ปล่อยเช่า" />
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink/60">
            <Phrases text="งานซ้ำ ๆ ที่เคยกินเวลาทั้งวัน เหลือแค่ไม่กี่แตะ" />
          </p>
        </Reveal>
        <DayStory />
      </section>
      <Closing />
      <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-ink/50 sm:px-10">
        <span className="text-lg font-bold text-ink">
          kepz<span className="text-[#e0b800]">.</span>
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
          <Link href="/login" className="ink-cta w-full max-w-xs sm:w-auto">
            <span>เริ่มใช้งาน Kepz</span>
            <span aria-hidden className="ink-cta-mark">
              <ArrowRight className="ink-cta-arrow" strokeWidth={2.5} />
              <ArrowRight className="ink-cta-arrow" strokeWidth={2.5} />
            </span>
          </Link>
          <a href="#day" className="px-5 py-3 text-base font-semibold underline decoration-2 underline-offset-[6px] hover:decoration-4">
            ดูหนึ่งวันกับ Kepz
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
    <section className="px-3 pt-16 pb-6 sm:px-6">
      <div className="grow-on-scroll mx-auto max-w-6xl rounded-[2rem] bg-ink px-6 py-20 text-center text-white sm:py-28">
        <h2 className="mx-auto max-w-3xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
          <Phrases text="เริ่มจากของที่คุณ ให้เช่าอยู่วันนี้" />
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/60">
          <Phrases text="ห้องเดียวหรือร้อยห้อง แผงเดียวหรือทั้งตลาด เพิ่มอย่างอื่นได้เมื่อพร้อม" />
        </p>
        <ShinyButton href="/login" className="mt-10 w-full max-w-xs sm:w-auto">
          เริ่มใช้งาน Kepz
        </ShinyButton>
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
