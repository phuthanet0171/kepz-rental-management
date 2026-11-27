import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { CompareStory } from "./compare-story";
import { RotatingWord } from "./rotating-word";
import { ScrollCue } from "./scroll-cue";
import { sriracha } from "@/lib/hand-font";
import { StartSteps } from "./start-steps";
import { TagRiver } from "./tag-river";
import { TopBar } from "./top-bar";

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
      <TopBar />
      <Hero />
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
    <section id="top" className="relative overflow-hidden bg-brand pt-24 sm:pt-28">
      <div className="relative mx-auto max-w-3xl px-5 pb-10 text-center sm:pb-14">
        <h1 className="text-[1.7rem] leading-[1.45] font-bold tracking-tight text-balance sm:text-[2.6rem]">
          <span className="sr-only">ไม่ว่าคุณจะปล่อยเช่าอะไร ก็จัดการได้ในแบบของคุณ</span>
          <span aria-hidden className="intro block" style={intro(0)}>
            ไม่ว่าคุณจะปล่อยเช่า <RotatingWord />
          </span>
          <span aria-hidden className="intro mt-2 block sm:mt-3" style={intro(200)}>
            ก็จัดการได้ในแบบของคุณ
          </span>
        </h1>
        <p className="intro mx-auto mt-6 max-w-2xl text-base text-ink/75 sm:text-lg" style={intro(420)}>
          <Phrases text="ระบบจัดการธุรกิจให้เช่าครบวงจร จัดการรายการเช่าได้ในที่เดียว" />
        </p>
        <div className="intro mt-9 flex justify-center" style={intro(560)}>
          <span className="rainbow-glow w-full max-w-xs sm:w-auto">
            <ShinyButton href="/signup" className="shiny-hero w-full">
              เริ่มใช้งาน Kepz
            </ShinyButton>
          </span>
        </div>
      </div>

      {/* ของให้เช่าที่ไหลผ่าน: จุดเด่นของส่วนบน */}
      <TagRiver />

      <ScrollCue />
      <div className="h-6" />
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
