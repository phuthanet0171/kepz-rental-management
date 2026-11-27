import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Phrases } from "./phrases";

/** แต่ละขั้นบอกสิ่งที่ทำ (ขึ้นต้นด้วยคำกริยา) และสิ่งที่ได้ ในประโยคสั้นๆ */
const STEPS = [
  {
    title: "สมัครและตั้งชื่อกิจการ",
    body: "ใช้แค่อีเมล แล้วใส่ชื่อหอพัก ร้าน หรือตลาดของคุณ",
  },
  {
    title: "เพิ่มของที่ให้เช่า",
    body: "ใส่ห้อง ที่จอด หรือแผงพร้อมราคา เพิ่มทีละช่องหรือหลายช่องพร้อมกันก็ได้",
  },
  {
    title: "ใส่ผู้เช่า แล้วเริ่มเก็บเงิน",
    body: "ใส่ชื่อผู้เช่า ค่าเช่า และวันจ่าย ถึงรอบเมื่อไร Kepz เตรียมบิลไว้ให้กดออก",
  },
];

/**
 * 3 ขั้น + ปุ่มเริ่มใช้งาน อยู่ในป้ายดำใบเดียวกัน
 * อ่านจบขั้นที่ 3 แล้วเจอปุ่มทันที ไม่ต้องเลื่อนไปหาอีกส่วน
 */
export function StartSteps() {
  return (
    <section id="start" aria-labelledby="start-title" className="scroll-mt-20 overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
      {/* ป้ายใหญ่ห้อยเชือก: แกว่งเข้ามาเมื่อเลื่อนถึง */}
      <div className="tag-swing mx-auto max-w-5xl">
        <svg aria-hidden className="mx-auto block h-16 w-6 overflow-visible" viewBox="0 0 24 64">
          <path d="M12 0 C 4 22, 20 40, 12 64" fill="none" stroke="#1b1a17" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="cta-tag relative -mt-3 bg-[#1b1a17] px-5 pt-20 pb-14 text-white sm:px-10 sm:pb-16 lg:px-14">
          <span aria-hidden className="absolute top-7 left-1/2 size-6 -translate-x-1/2 rounded-full bg-white ring-4 ring-brand" />

          <div className="text-center">
            <h2 id="start-title" className="text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl">
              เริ่มใช้ได้ใน 3 ขั้น
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/65">
              <Phrases text="ตั้งค่าครั้งแรกครั้งเดียว เดือนต่อไป แค่กดออกบิล กับกดรับเงิน" />
            </p>
          </div>

          <div className="relative mt-12">
            {/* ราวแขวนกุญแจ */}
            <div aria-hidden className="relative z-10 hidden h-2.5 rounded-full bg-white/25 sm:block" />
            <ol className="grid gap-5 sm:-mt-1 sm:grid-cols-3 sm:gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="key-tag relative sm:pt-2" style={{ ["--d" as string]: `${i * 0.4}s` }}>
                  <Reveal variant="drop" delay={i * 180}>
                    {/* ตะขอ + ห่วง */}
                    <svg aria-hidden className="mx-auto hidden h-11 w-8 overflow-visible sm:block" viewBox="0 0 32 48">
                      <path d="M16 0 V14" stroke="rgb(255 255 255 / 0.4)" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="16" cy="28" r="12" fill="none" stroke="#9a978e" strokeWidth="3" />
                    </svg>
                    <div className="relative rounded-[1.5rem] border-2 border-ink bg-brand px-5 pt-8 pb-6 text-ink shadow-[4px_4px_0_0_rgb(255_255_255/0.22)] sm:-mt-3">
                      <span aria-hidden className="absolute top-3 left-1/2 size-3.5 -translate-x-1/2 rounded-full border-2 border-ink bg-white" />
                      <span className="tabular block text-5xl leading-none font-bold">{i + 1}</span>
                      <h3 className="mt-3 text-xl font-bold sm:text-[22px]">{s.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-ink/75">{s.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* ต่อจากขั้นที่ 3 ลงมาที่ปุ่ม: ขั้นที่ 1 เริ่มได้จากตรงนี้ */}
          <div className="mt-12 flex flex-col items-center text-center">
            <p className="hand flex items-center gap-2 text-2xl text-brand">
              ขั้นที่ 1 เริ่มได้เลยตอนนี้
            </p>
            <ArrowDown aria-hidden className="nudge-down mt-1 size-5 text-brand" strokeWidth={2.5} />
            <ShinyButton href="/signup" className="mt-4 w-full max-w-xs sm:w-auto">
              เริ่มใช้งาน Kepz
            </ShinyButton>
            <p className="mt-5 text-[15px] text-white/55">
              <Phrases text="ไม่ต้องติดตั้งโปรแกรม ใช้บนมือถือหรือคอมก็ได้" />
            </p>
            <p className="mt-1.5 text-[15px] text-white/55">
              มีบัญชีอยู่แล้ว?{" "}
              <Link href="/login" className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:text-brand">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
