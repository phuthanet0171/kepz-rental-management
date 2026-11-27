import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowDown } from "lucide-react";
import { CompareStory } from "./compare-story";
import { KeyRing, RentSign } from "./hero-props";
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
      <CompareStory />
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

      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-36 text-center sm:pt-20 sm:pb-44">
        {/* ของแขวนจริงในโลกการปล่อยเช่า ห้อยลงมาจากขอบบน */}
        <RentSign className="intro absolute top-0 left-2 hidden w-40 lg:block xl:-left-4 xl:w-48" />
        <KeyRing className="intro absolute top-0 right-4 hidden w-36 lg:block xl:right-0 xl:w-44" />
        <KeyRing className="intro mx-auto -mt-8 mb-4 w-24 lg:hidden" />
        <h1 className="text-[3.1rem] leading-[1.08] font-bold tracking-[-0.03em] sm:text-[6.5rem]">
          <span className="line-rise" style={intro(0)}>
            <span>มีอะไรให้เช่า</span>
          </span>
          <span className="line-rise" style={intro(110)}>
            <span>ก็จัดการได้</span>
          </span>
        </h1>
        <p className="intro mx-auto mt-7 max-w-md text-lg leading-relaxed text-ink/80 sm:text-xl" style={intro(420)}>
          <Phrases text="ออกบิล รับเงิน ดูว่าอะไรว่าง ในมือถือเครื่องเดียว" />
        </p>
        <div className="intro mt-10 flex justify-center" style={intro(560)}>
          <span className="rainbow-glow w-full max-w-xs sm:w-auto">
            <ShinyButton href="/signup" className="shiny-hero w-full">
              เริ่มใช้งาน Kepz
            </ShinyButton>
          </span>
        </div>
      </div>

      {/* ชวนเลื่อนลง: เล็ก จาง ขยับเบาๆ อยู่ล่างสุดของส่วนบน */}
      <a
        href="#story"
        className="intro absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-sm font-medium text-ink/45 transition hover:text-ink sm:bottom-20"
        style={intro(900)}
      >
        เลื่อนลง
        <ArrowDown className="nudge-down size-4" strokeWidth={2.5} />
      </a>
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
          <p className="hand text-2xl text-brand">พร้อมลองหรือยัง</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
            <Phrases text="เริ่มใช้ Kepz กับของที่คุณ ให้เช่าอยู่วันนี้" />
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/65">
            <Phrases text="สมัครแล้วตั้งค่าตามขั้นตอนได้ทันที มีห้องเดียวหรือหลายสาขาก็ใช้ได้" />
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
