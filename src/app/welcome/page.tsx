import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ShinyButton } from "@/components/ui/shiny-button";
import { DayStory } from "./day-story";

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
        <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-ink/10">
          เข้าสู่ระบบ
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-5 pt-14 pb-24 text-center sm:pt-20 sm:pb-32">
        <h1 className="text-[3.1rem] leading-[1.08] font-bold tracking-[-0.03em] sm:text-[6.5rem]">
          <span className="intro block" style={intro(0)}>
            มีอะไรให้เช่า
          </span>
          <span className="intro block" style={intro(120)}>
            ก็จัดการได้
          </span>
        </h1>
        <p className="intro mx-auto mt-7 max-w-lg text-lg leading-relaxed text-ink/70 sm:text-xl" style={intro(260)}>
          <Phrases text="ห้อง ที่จอด แผงตลาด รถ ชุด อุปกรณ์ ทำสัญญา ออกบิล รับเงิน และดูว่าอะไรว่าง บนมือถือเครื่องเดียว" />
        </p>
        <div className="intro mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" style={intro(380)}>
          <Link
            href="/login"
            className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full bg-ink px-9 text-lg font-semibold text-white transition hover:bg-black active:scale-[0.98] sm:w-auto"
          >
            เริ่มใช้งาน Kepz
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

type Tag = { title: string; line: string; tone: "paper" | "ink" | "free" };

const ROW_A: Tag[] = [
  { title: "ห้อง S-02", line: "ว่าง · ฿1,600/เดือน", tone: "free" },
  { title: "แผง A12", line: "เสาร์–อาทิตย์ ฿250/วัน", tone: "paper" },
  { title: "Yaris กข 1234", line: "คืนวันนี้ 18:00", tone: "ink" },
  { title: "ที่จอด P-03", line: "รายเดือน ฿990", tone: "paper" },
  { title: "ชุดราตรีแดง M", line: "จองแล้ว 14–16 ธ.ค.", tone: "ink" },
  { title: "เต็นท์ 3×3 ม.", line: "ว่าง 12 จาก 20 หลัง", tone: "free" },
];
const ROW_B: Tag[] = [
  { title: "กล้อง A7 IV", line: "฿900/วัน + ประกัน ฿5,000", tone: "paper" },
  { title: "ห้องเช่า 4B", line: "ค้างจ่าย 5 วัน", tone: "ink" },
  { title: "โกดัง 2", line: "ว่าง · 40 ตร.ม.", tone: "free" },
  { title: "จักรยาน #07", line: "รายชั่วโมง ฿40", tone: "paper" },
  { title: "โต๊ะจัดเลี้ยง", line: "ว่าง 64 จาก 100 ตัว", tone: "free" },
  { title: "ห้องประชุม B", line: "จอง 13:00–15:00", tone: "ink" },
];

/** ป้ายเช่าแบบป้ายผูกจริง ไหลผ่านจอ: บอกว่า Kepz ใช้กับของเช่าได้ทุกแบบ */
function TagRiver() {
  return (
    <section aria-label="ตัวอย่างสิ่งที่จัดการได้บน Kepz" className="-mt-12 overflow-hidden pb-4">
      <TagRow tags={ROW_A} />
      <TagRow tags={ROW_B} reverse />
    </section>
  );
}

function TagRow({ tags, reverse }: { tags: Tag[]; reverse?: boolean }) {
  return (
    <div className="tag-row py-3" data-reverse={reverse ? "" : undefined}>
      <div className="tag-track">
        {[...tags, ...tags].map((t, i) => (
          <RentTag key={i} tag={t} tilt={((i * 37) % 7) - 3} hidden={i >= tags.length} />
        ))}
      </div>
    </div>
  );
}

function RentTag({ tag, tilt, hidden }: { tag: Tag; tilt: number; hidden: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className={clsx(
        "relative flex shrink-0 items-center gap-4 rounded-[14px] py-4 pr-6 pl-9 shadow-[0_10px_24px_-14px_rgb(22_21_19/0.45)]",
        tag.tone === "paper" && "bg-white text-ink",
        tag.tone === "ink" && "bg-ink text-white",
        tag.tone === "free" && "bg-[#e3f4ea] text-[#145c33]",
      )}
      style={{ rotate: `${tilt * 0.6}deg` }}
    >
      {/* รูร้อยเชือกของป้าย */}
      <span
        aria-hidden
        className={clsx(
          "absolute top-1/2 left-3.5 size-2.5 -translate-y-1/2 rounded-full ring-2",
          tag.tone === "ink" ? "bg-ink ring-white/40" : "bg-[#f7f5ef] ring-ink/15",
        )}
      />
      <div className="whitespace-nowrap">
        <div className="text-base leading-tight font-bold">{tag.title}</div>
        <div className={clsx("text-sm", tag.tone === "ink" ? "text-white/65" : "opacity-70")}>{tag.line}</div>
      </div>
    </div>
  );
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
