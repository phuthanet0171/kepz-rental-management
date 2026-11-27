"use client";

import clsx from "clsx";
import { ArrowDown, FileText } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { TILE_CLASS } from "@/components/floor-plan/shared";
import { OverdueBadge, PendingBadge } from "@/components/floor-plan/viewer";

/*
 * ภาพประกอบของแต่ละปัญหาในส่วน "ช่วยอะไร" (ข้อมูลสมมติทั้งหมด)
 * แต่ละเรื่องใช้รูปแบบต่างกัน ไม่ซ้ำการ์ดลากเทียบ
 * ชิ้นที่มี seq-pop / bar-grow จะเริ่มขยับเมื่อกรอบ Reveal รอบนอกเลื่อนเข้ามาในจอ
 */

const seq = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-[2rem] border-2 border-ink p-4 shadow-[6px_6px_0_0_#1b1a17] sm:p-7", className)}>
      {children}
    </div>
  );
}

/* ===== ร้านเช่าชุด: สลิปกระจายในแชท → ใบเสร็จใบเดียว ===== */

export function ChatToReceipt() {
  return (
    <Frame className="bg-[#e8eef5]">
      <div className="mx-auto flex max-w-sm flex-col gap-3">
        {/* แชทกับลูกค้า */}
        <div className="grid grid-cols-2 gap-2 text-[13px]">
          <Bubble i={0}>ขอเช่าชุดราตรีสีแดง 3 วันค่ะ</Bubble>
          <Bubble i={1}>
            <span className="block rounded-lg bg-[#e7f6ec] px-2.5 py-1.5 text-[11px] text-[#166534]">
              โอนเงินสำเร็จ
              <b className="tabular block text-sm">฿1,200</b>
            </span>
          </Bubble>
          <Bubble i={2}>อีกสลิปเป็นค่ามัดจำนะคะ</Bubble>
          <Bubble i={3}>
            <span className="block rounded-lg bg-[#e7f6ec] px-2.5 py-1.5 text-[11px] text-[#166534]">
              โอนเงินสำเร็จ
              <b className="tabular block text-sm">฿2,000</b>
            </span>
          </Bubble>
        </div>

        <span className="seq-pop mx-auto flex items-center gap-1.5 rounded-full border-2 border-ink bg-brand px-3 py-1.5 text-xs font-bold" style={seq(5)}>
          <ArrowDown className="size-4" strokeWidth={3} />
          กดรับเงิน
        </span>

        {/* ใบเสร็จที่ได้ */}
        <div className="seq-pop rounded-xl border-2 border-ink bg-white p-3.5 text-[13px]" style={seq(7)}>
          <p className="flex items-center justify-between">
            <b className="text-sm whitespace-nowrap">ใบเสร็จรับเงิน</b>
            <span className="flex items-center gap-1 rounded-md bg-ink px-1.5 py-0.5 text-[10px] font-bold text-white">
              <FileText className="size-3" /> PDF
            </span>
          </p>
          <p className="mt-0.5 text-[11px] text-muted">D-07 ชุดราตรีสีแดง</p>
          <p className="mt-2.5 flex justify-between">
            <span className="text-ink/70">ค่าเช่า 3 วัน</span>
            <span className="tabular">1,200</span>
          </p>
          <p className="flex justify-between">
            <span className="text-ink/70">เงินประกัน</span>
            <span className="tabular">2,000</span>
          </p>
          <p className="mt-1.5 flex justify-between border-t border-line pt-1.5 font-bold">
            <span>รวม</span>
            <span className="tabular">3,200 บาท</span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

function Bubble({ children, i }: { children: ReactNode; i: number }) {
  return (
    <p className="seq-pop rounded-2xl rounded-bl-md bg-white px-3 py-2 shadow-sm" style={seq(i)}>
      {children}
    </p>
  );
}

/* ===== ร้านเช่ากล้อง: รับเงินก้อนเดียว → แยกค่าเช่ากับเงินประกัน ===== */

export function DepositSplit() {
  return (
    <Frame className="bg-white">
      <div className="seq-pop mx-auto w-fit rounded-xl border-2 border-ink bg-canvas px-5 py-3 text-center" style={seq(0)}>
        <p className="text-xs text-muted">ลูกค้าโอนมา (กล้อง C-02 เช่า 3 วัน)</p>
        <p className="tabular text-2xl font-bold">฿5,500</p>
      </div>
      {/* เส้นแยกเป็นสองทาง */}
      <svg aria-hidden viewBox="0 0 200 40" preserveAspectRatio="none" className="mx-auto h-10 w-[62%]">
        <path d="M100 0 V14 Q100 20 92 20 H18 Q10 20 10 28 V40" fill="none" stroke="#1b1a17" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d="M100 14 Q100 20 108 20 H182 Q190 20 190 28 V40" fill="none" stroke="#1b1a17" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="grid grid-cols-2 gap-3">
        <div className="seq-pop rounded-xl border-2 border-ink bg-brand p-3.5" style={seq(3)}>
          <p className="text-xs font-semibold">ค่าเช่า</p>
          <p className="tabular text-xl font-bold">฿1,500</p>
          <p className="mt-1 text-xs text-ink/70">นับเป็นรายได้</p>
        </div>
        <div className="seq-pop rounded-xl border-2 border-ink bg-ink p-3.5 text-white" style={seq(5)}>
          <p className="text-xs font-semibold text-brand">เงินประกัน</p>
          <p className="tabular text-xl font-bold">฿4,000</p>
          <p className="mt-1 text-xs text-white/70">เก็บแยกไว้ คืนเมื่อลูกค้าคืนกล้อง</p>
        </div>
      </div>
    </Frame>
  );
}

/* ===== แผงตลาด: เส้นเวลาสัญญา เห็นก่อนว่าแผงไหนใกล้หมด ===== */

const MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."];
const LEASES: { stall: string; who: string; from: number; to: number; tone: "occupied" | "expiring" | "available" }[] = [
  { stall: "A01", who: "ร้านข้าวแกง", from: 0, to: 6, tone: "occupied" },
  { stall: "A02", who: "ร้านผลไม้", from: 0, to: 3, tone: "expiring" },
  { stall: "A03", who: "ร้านเสื้อผ้า", from: 1, to: 6, tone: "occupied" },
  { stall: "A04", who: "ว่าง พร้อมให้เช่า", from: 0, to: 6, tone: "available" },
];

export function LeaseTimeline() {
  return (
    <Frame className="bg-white">
      <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2 text-[11px] sm:grid-cols-[4rem_minmax(0,1fr)] sm:text-xs">
        <span />
        <div className="relative grid grid-cols-6 pb-2 text-center text-muted">
          {MONTHS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        {LEASES.map((l, i) => (
          <div key={l.stall} className="contents">
            <b className="flex h-11 items-center text-sm whitespace-nowrap">
              <span className="hidden sm:inline">แผง&nbsp;</span>
              {l.stall}
            </b>
            <div className="relative h-11 border-t border-line">
              <span
                className={clsx(
                  "bar-grow absolute top-2 bottom-2 flex items-center overflow-hidden rounded-md border-2 px-2 text-[11px] font-semibold whitespace-nowrap",
                  TILE_CLASS[l.tone],
                  l.tone === "available" && "border-dashed",
                )}
                style={{ left: `${(l.from / 6) * 100}%`, width: `${((l.to - l.from) / 6) * 100}%`, ...seq(i) }}
              >
                {l.who}
              </span>
            </div>
          </div>
        ))}
        {/* วันนี้ */}
        <span />
        <div className="relative h-0">
          <span className="absolute bottom-0 h-[11.5rem] border-l-2 border-dashed border-bad" style={{ left: "33%" }} />
          <span className="absolute top-1 -translate-x-1/2 rounded-full bg-bad px-2 py-0.5 text-[10px] font-bold text-white" style={{ left: "33%" }}>
            วันนี้
          </span>
        </div>
      </div>
      <p className="seq-pop mt-9 flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2.5 text-sm" style={seq(6)}>
        <span className={clsx("size-3.5 shrink-0 rounded border-2", TILE_CLASS.expiring)} />
        แผง A02 ใกล้หมดสัญญา เหลือเวลาคุยต่อสัญญาอีก 1 เดือน
      </p>
    </Frame>
  );
}

/* ===== หลายสาขา: หน้าภาพรวม ยอดวิ่งขึ้นจนถึงยอดจริง ===== */

const BRANCHES = [
  { name: "ตลาดนัดเช้า", amount: 62000 },
  { name: "ลานจอดรถ", amount: 38400 },
  { name: "ห้องเก็บของ", amount: 28000 },
];

export function MonthSummary() {
  const total = BRANCHES.reduce((s, b) => s + b.amount, 0);
  return (
    <Frame className="bg-white">
      <p className="text-sm text-muted">รับเงินแล้วเดือนนี้ ทุกสาขา</p>
      <p className="tabular text-4xl font-bold tracking-tight sm:text-5xl">
        ฿<CountUp to={total} />
      </p>
      <div className="mt-5 space-y-3">
        {BRANCHES.map((b, i) => (
          <div key={b.name}>
            <p className="flex justify-between text-sm">
              <span>{b.name}</span>
              <span className="tabular font-semibold">{b.amount.toLocaleString("th-TH")}</span>
            </p>
            <span className="mt-1 block h-2.5 overflow-hidden rounded-full bg-canvas">
              <span className="bar-grow block h-full rounded-full bg-ink" style={{ width: `${(b.amount / BRANCHES[0].amount) * 100}%`, ...seq(i) }} />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2.5 text-sm">
        <p className="flex items-center gap-2 rounded-xl bg-[#ffedd5] px-3 py-2.5 font-semibold text-[#c2410c]">
          <PendingBadge size={16} /> รอชำระ 3 ราย
        </p>
        <p className="flex items-center gap-2 rounded-xl bg-bad-soft px-3 py-2.5 font-semibold text-bad">
          <OverdueBadge size={16} /> ค้างชำระ 1 ราย
        </p>
        <p className="col-span-2 flex justify-between rounded-xl bg-ink px-3 py-2.5 text-white">
          <span className="text-white/75">เงินประกันที่ถืออยู่ (ไม่นับเป็นรายได้)</span>
          <b className="tabular">฿45,000</b>
        </p>
      </div>
    </Frame>
  );
}

/** ตัวเลขวิ่งจาก 0 ถึงยอดจริงเมื่อเลื่อนมาถึง (ผู้ใช้ที่ลดการเคลื่อนไหว เห็นยอดจริงทันที) */
function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setN(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <span ref={ref}>{n.toLocaleString("th-TH")}</span>;
}
