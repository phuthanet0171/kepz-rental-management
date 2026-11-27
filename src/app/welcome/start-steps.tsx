import clsx from "clsx";
import { Check, Minus, Plus } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Phrases } from "./phrases";

/** แต่ละขั้น: สิ่งที่ทำ (ขึ้นต้นด้วยคำกริยา) + ตัวอย่างหน้าจอเล็กๆ ว่าทำแล้วได้อะไร */
const STEPS: { title: string; body: string; preview: ReactNode; tilt: string }[] = [
  {
    title: "สมัคร แล้วตั้งชื่อกิจการ",
    body: "ใช้แค่อีเมล แล้วใส่ชื่อหอพัก ร้าน หรือตลาดของคุณ",
    preview: <NamePreview />,
    tilt: "lg:-rotate-[0.8deg]",
  },
  {
    title: "เพิ่มของที่ให้เช่า",
    body: "บอกว่ามีอะไรให้เช่า กี่ช่อง ราคาเท่าไร เช่น ห้องแอร์ 8 ห้อง เดือนละ 3,500 บาท แล้ว Kepz ตั้งรหัสห้องให้เอง",
    preview: <UnitsPreview />,
    tilt: "lg:rotate-[0.6deg]",
  },
  {
    title: "ทำสัญญา แล้วได้บิลแรกทันที",
    body: "เลือกห้องว่าง ใส่ชื่อผู้เช่า ค่าเช่า และเงินประกัน กดสร้างสัญญา Kepz ออกใบวางบิลแรกให้อัตโนมัติ",
    preview: <ContractPreview />,
    tilt: "lg:-rotate-[0.4deg]",
  },
];

/**
 * เริ่มใช้งาน: พื้นเหลืองเต็มจอ (คู่กับส่วนบนสุด) ปิดท้ายหน้า
 * - คอม: หัวข้อซ้ายบน · 3 ขั้นตอนฝั่งขวา · ปุ่มซ้ายล่าง (อ่านครบทุกขั้นก่อนถึงปุ่ม)
 * - มือถือ: หัวข้อ → 3 ขั้นตอน → ปุ่ม เรียงลงมาตามลำดับที่อ่าน
 * ตัวอย่างในการ์ดเลียนแบบหน้าจริงของ Kepz (ฟอร์มเพิ่มของให้เช่า และสรุปสัญญา)
 * เส้นทางจบที่ "ออกบิลแรกได้เลย" ให้เห็นว่าทำครบแล้วได้อะไร
 */
export function StartSteps() {
  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="scroll-mt-16 border-t-[3px] border-ink bg-brand [background-image:radial-gradient(rgb(27_26_23/0.09)_1.5px,transparent_1.5px)] [background-size:26px_26px]"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <h2 id="start-title" className="text-3xl leading-[1.2] font-bold tracking-tight sm:text-[2.6rem]">
            เริ่มใช้ได้<span className="inline-block">ใน 3 ขั้นตอน</span>
          </h2>
        </Reveal>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ol className="relative space-y-7 sm:space-y-9">
            {/* เส้นทางที่ร้อยทุกขั้นเข้าด้วยกัน */}
            <span aria-hidden className="absolute top-6 bottom-6 left-[1.375rem] w-[3px] rounded-full bg-ink sm:left-[1.625rem]" />
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 140} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-6">
                <Node>{i + 1}</Node>
                <article
                  className={clsx(
                    "grid gap-5 rounded-2xl border-2 border-ink bg-white p-4 shadow-[5px_5px_0_0_#1b1a17] transition-transform duration-300 hover:rotate-0 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-center sm:p-5",
                    s.tilt,
                  )}
                >
                  <div>
                    <h3 className="text-xl leading-snug font-bold sm:text-[22px]"><Phrases text={s.title} /></h3>
                    <p className="mt-1.5 text-base leading-relaxed text-ink/65">{s.body}</p>
                  </div>
                  <div aria-hidden className="rounded-xl bg-canvas p-3">
                    {s.preview}
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal as="li" delay={STEPS.length * 140} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-6">
              <Node done>
                <Check className="size-6" strokeWidth={3.5} />
              </Node>
              <p className="text-xl font-bold sm:text-2xl"><Phrases text="เสร็จแล้ว ส่งบิลแรกให้ผู้เช่าได้เลย" /></p>
            </Reveal>
          </ol>
        </div>

        {/* ปุ่มอยู่ซ้ายล่าง ตรงกับบรรทัด "เสร็จแล้ว" ของเส้นทาง */}
        <Reveal delay={300} className="lg:col-start-1 lg:row-start-2 lg:self-end">
          <StartCta />
        </Reveal>
      </div>
    </section>
  );
}

/** วงกลมบนเส้นทาง: ตัวเลขขั้น หรือเครื่องหมายถูกเมื่อจบ */
function Node({ children, done }: { children: ReactNode; done?: boolean }) {
  return (
    <span
      className={clsx(
        "relative z-10 grid size-11 place-items-center rounded-full border-[3px] border-ink text-xl font-bold ring-[5px] ring-brand sm:size-[3.25rem] sm:text-2xl",
        done ? "bg-white text-ok" : "tabular bg-ink text-brand",
      )}
    >
      {children}
    </span>
  );
}

/** ปุ่มเริ่มใช้งาน + ข้อความที่ช่วยให้กล้ากด */
function StartCta() {
  return (
    <div>
      <p className="hand flex items-end gap-1 text-[22px] leading-none">
        {/* ตัวอักษรไล่สีเป็นประกายวิ่งผ่าน */}
        <span className="shimmer-text">ขั้นที่ 1 เริ่มตรงนี้</span>
        <svg aria-hidden viewBox="0 0 40 34" className="point-nudge mb-[-14px] h-8 w-10 overflow-visible">
          <path d="M3 4 C 22 4, 32 12, 30 30" fill="none" stroke="#1b1a17" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M23 24 L30 31 L36 23" fill="none" stroke="#1b1a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>
      <span className="rainbow-glow mt-5 inline-block w-full max-w-xs sm:w-auto">
        <ShinyButton href="/signup" className="shiny-hero w-full">
          เริ่มใช้งาน Kepz
        </ShinyButton>
      </span>
      <p className="mt-6 flex max-w-sm items-start gap-2 text-[15px] leading-relaxed font-medium text-ink/75">
        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-brand">
          <Check className="size-3" strokeWidth={3.5} />
        </span>
        <span>
          <Phrases text="ไม่ต้องติดตั้งโปรแกรม ใช้งานผ่านเว็บไซต์ บนแพลตฟอร์มใดก็ได้" />
        </span>
      </p>
    </div>
  );
}

/* ===== ตัวอย่างหน้าจอเล็กๆ ของแต่ละขั้น (ข้อมูลสมมติ) ===== */

function NamePreview() {
  return (
    <div className="text-ink">
      <p className="text-[11px] font-medium text-ink/50">ชื่อกิจการ</p>
      <p className="mt-1 flex items-center rounded-lg border-2 border-ink bg-white px-2.5 py-1.5 text-sm font-semibold">
        หอพักบ้านสวน
        <span className="caret ml-0.5 h-4 w-0.5 bg-ink" />
      </p>
      <p className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] font-semibold">
        <span className="rounded-full border-2 border-ink bg-brand px-2 py-0.5">หอพัก</span>
        <span className="rounded-full border-2 border-ink/15 bg-white px-2 py-0.5 text-ink/60">ที่จอดรถ</span>
        <span className="rounded-full border-2 border-ink/15 bg-white px-2 py-0.5 text-ink/60">แผงตลาด</span>
      </p>
    </div>
  );
}

/** เหมือนการ์ด "เพิ่มของให้เช่า" ในหน้าตั้งค่ากิจการจริง: ชื่อ จำนวน ราคา คิดราคา และรหัสที่จะได้ */
function UnitsPreview() {
  return (
    <div className="rounded-xl border border-line bg-white p-2.5 text-ink">
      <p className="text-sm font-bold">ห้องแอร์</p>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        <div>
          <p className="text-[10px] text-muted">จำนวน</p>
          <p className="mt-0.5 flex h-7 items-center justify-between rounded-lg border border-line px-2 text-[11px] text-ink/60">
            <Minus className="size-3" />
            <b className="tabular text-sm text-ink">8</b>
            <Plus className="size-3" />
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted">ราคา</p>
          <p className="tabular mt-0.5 flex h-7 items-center gap-1 rounded-lg border border-line px-2 text-sm font-semibold">
            <span className="text-[11px] font-normal text-muted">฿</span>3,500
          </p>
        </div>
      </div>
      <p className="mt-1.5 grid grid-cols-3 rounded-lg bg-canvas p-0.5 text-center text-[9.5px] font-semibold text-muted">
        <span className="rounded-md bg-white py-1 text-ink shadow-sm">ต่อเดือน</span>
        <span className="py-1">ต่อวัน</span>
        <span className="py-1">ต่อชั่วโมง</span>
      </p>
      <p className="mt-2 flex flex-wrap gap-1">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="seq-pop tabular rounded-md border-2 border-ok bg-ok-soft px-1 py-px text-[9.5px] font-bold"
            style={{ ["--i" as string]: i } as CSSProperties}
          >
            A0{i + 1}
          </span>
        ))}
      </p>
    </div>
  );
}

/** เหมือนกล่อง "สรุปสัญญา" ในหน้าสร้างสัญญาจริง: กดสร้างแล้วได้ใบวางบิลแรกพร้อมกัน */
function ContractPreview() {
  return (
    <div className="rounded-xl bg-ink p-2.5 text-white">
      <p className="text-[10px] text-white/60">สรุปสัญญา</p>
      <p className="text-sm font-semibold">A01 ห้องแอร์</p>
      <div className="seq-pop mt-2 rounded-lg bg-white/10 p-2 text-[10.5px]" style={{ ["--i" as string]: 2 } as CSSProperties}>
        <p className="mb-1 font-semibold text-brand">ใบวางบิลแรก (ออกให้อัตโนมัติ)</p>
        <p className="flex justify-between">
          <span className="text-white/80">ค่าเช่า 1 เดือน</span>
          <span className="tabular">3,500</span>
        </p>
        <p className="flex justify-between">
          <span className="text-white/80">เงินประกัน</span>
          <span className="tabular">3,500</span>
        </p>
        <p className="mt-1 flex justify-between border-t border-white/20 pt-1 font-semibold">
          <span>รวมที่ต้องชำระ</span>
          <span className="tabular text-brand">7,000 บาท</span>
        </p>
      </div>
      <p className="mt-2 rounded-lg bg-brand py-1.5 text-center text-[11px] font-bold text-ink">สร้างสัญญาเช่า</p>
    </div>
  );
}
