import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { CompareStory } from "./compare-story";
import { MiddleDiagram } from "./middle-diagram";
import { Phrases } from "./phrases";
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
      <MiddleDiagram />
      <CompareStory />
      <StartSteps />
      <footer className="flex flex-wrap items-center justify-between gap-3 bg-ink px-5 py-8 text-sm text-white/55 sm:px-10">
        <span className="text-lg font-bold text-white">
          kepz<span className="text-brand">.</span>
        </span>
        <span>มีอะไรให้เช่า ก็จัดการได้บน Kepz</span>
      </footer>
    </div>
  );
}

/**
 * ส่วนบนสูงพอดีหนึ่งจอ: กลุ่มหัวข้ออยู่กึ่งกลางพื้นที่เหนือแถบการ์ด
 * แถบการ์ด + คำอธิบาย + "เลื่อนลง" เป็นแถบล่างของจอ ระยะห่างใช้จังหวะเดียวกัน (8 / 16 / 32)
 */
function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-brand pt-16">
      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          {/* ขนาดตัวอักษรตามความกว้างจอ: บรรทัดแรกพร้อมคำที่ยาวที่สุด ("เครื่องประดับ") ต้องพอดีบรรทัดเดียวเสมอ */}
          <h1 className="text-[clamp(1rem,calc((100vw_-_80px)/14),2.6rem)] leading-[1.35] font-bold tracking-tight">
            <span className="sr-only">ไม่ว่าคุณจะปล่อยเช่าอะไร ก็จัดการได้ในแบบของคุณ</span>
            <span aria-hidden className="intro flex flex-nowrap items-center justify-center gap-2 whitespace-nowrap sm:gap-3" style={intro(0)}>
              <span>ไม่ว่าคุณจะปล่อยเช่า</span>
              <RotatingWord />
            </span>
            <span aria-hidden className="intro mt-2.5 block sm:mt-4" style={intro(200)}>
              ก็จัดการได้ในแบบของคุณ
            </span>
          </h1>
          <p className="intro mx-auto mt-4 max-w-2xl text-[15px] text-ink/75 sm:text-lg" style={intro(420)}>
            <Phrases text="ระบบจัดการธุรกิจให้เช่าครบวงจร จัดการรายการเช่าได้ในที่เดียว" />
          </p>
          <div className="intro mt-7 flex justify-center sm:mt-8" style={intro(560)}>
            <span className="rainbow-glow">
              <ShinyButton href="/signup" className="shiny-hero">
                เริ่มใช้งาน Kepz
              </ShinyButton>
            </span>
          </div>
        </div>
      </div>

      {/* แถบล่าง: ของให้เช่าที่ไหลผ่าน + ที่ว่างให้ "เลื่อนลง" ไม่ทับคำอธิบาย */}
      <div className="pb-20">
        <TagRiver />
      </div>
      <ScrollCue />
    </section>
  );
}

function intro(ms: number): CSSProperties {
  return { ["--intro-delay" as string]: `${ms}ms` };
}
