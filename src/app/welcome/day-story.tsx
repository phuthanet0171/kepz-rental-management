"use client";

import clsx from "clsx";
import {
  Check,
  Download,
  LayoutDashboard,
  Menu,
  ReceiptText,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Screen = "bills" | "paid" | "map" | "night";

type Step = {
  time: string;
  title: string;
  body: string;
  screen: Screen;
  /** โน้ตลายมือข้างจอ: ข้อความ, ระยะจากบนของโน้ต, ระยะจากบนของจุดที่ลูกศรชี้ */
  note: { text: string; top: number; target: number };
};

const STEPS: Step[] = [
  {
    time: "08:00",
    title: "ออกบิลค่าเช่าทั้งเดือนในครั้งเดียว",
    body: "เปิดแอปมาก็เห็นว่าวันนี้ห้องไหนถึงรอบจ่าย ติ๊ก “เลือกทั้งหมด” แล้วกดปุ่มเดียว บิลของทุกห้องก็ออกครบ ไม่ต้องนั่งเขียนทีละใบ",
    screen: "bills",
    note: { text: "ติ๊กครั้งเดียว ได้ครบทุกห้อง", top: 118, target: 158 },
  },
  {
    time: "13:20",
    title: "ลูกค้าโอนมา ใบเสร็จก็พร้อมส่ง",
    body: "เปิดบิลของห้องนั้น กดรับเงินแล้วใส่ยอดที่โอนมา Kepz ออกใบเสร็จเป็น PDF ให้ทันที และแยกให้เองว่าเงินก้อนนี้เป็นค่าเช่าเท่าไร เงินประกันเท่าไร",
    screen: "paid",
    note: { text: "แยกค่าเช่ากับเงินประกันให้เอง", top: 236, target: 268 },
  },
  {
    time: "17:45",
    title: "มีคนโทรมาถามห้องว่าง ตอบได้ทันที",
    body: "เปิดผังดูภาพเดียวก็รู้ว่าอะไรว่าง สีเขียวคือว่าง สีดำคือมีคนเช่า สีแดงคือค้างจ่าย แตะช่องที่ว่างเพื่อทำสัญญาให้ลูกค้าคนใหม่ได้เลย",
    screen: "map",
    note: { text: "ช่องเขียว = ว่าง แตะเพื่อทำสัญญา", top: 176, target: 214 },
  },
  {
    time: "21:00",
    title: "ก่อนนอน รู้ว่าเดือนนี้เก็บได้เท่าไร",
    body: "หน้าภาพรวมสรุปเงินที่เข้ามาให้ แยกค่าเช่าที่เป็นรายได้จริง ออกจากเงินประกันที่ต้องคืนผู้เช่าตอนย้ายออก จะได้ไม่เผลอนับรวมกัน",
    screen: "night",
    note: { text: "รายได้จริง ไม่ปนเงินประกัน", top: 190, target: 222 },
  },
];

/** สีพื้นของแต่ละช่วงเวลา: เช้า → กลางวัน → เย็น → กลางคืน */
const SKY = ["#fff3c4", "#ffffff", "#ffd9b0", "#1c1b2b"];

/** หนึ่งวันของคนปล่อยเช่า: เลื่อนอ่านทีละช่วงเวลา สีพื้นเปลี่ยนตามเวลา และพระอาทิตย์เคลื่อนไปตามเส้นโค้ง */
export function DayStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const sunRef = useRef<SVGGElement>(null);
  const clockRef = useRef<SVGTextElement>(null);
  const night = active === 3;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));

    // พระอาทิตย์เดินตามการเลื่อนแบบต่อเนื่อง (เฉพาะจอคอมที่เห็นเส้นโค้ง)
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const place = () => {
      raf = 0;
      const first = refs.current[0];
      const last = refs.current[STEPS.length - 1];
      if (!first || !last || !sunRef.current) return;
      const a = first.getBoundingClientRect();
      const b = last.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const from = a.top + a.height / 2;
      const to = b.top + b.height / 2;
      const p = Math.min(1, Math.max(0, (mid - from) / (to - from || 1)));
      const ang = Math.PI * p;
      const x = 280 - 250 * Math.cos(ang);
      const y = 270 - 250 * Math.sin(ang);
      sunRef.current.setAttribute("transform", `translate(${x} ${y})`);
      if (clockRef.current) {
        const m = Math.round((480 + p * 780) / 5) * 5;
        clockRef.current.textContent = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    place();
    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="day"
      className={clsx("day-sky scroll-mt-0 transition-colors duration-700", night ? "text-white" : "text-ink")}
      style={{ backgroundColor: SKY[active] }}
    >
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-16 sm:pt-32">
        <h2 className="max-w-2xl text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
          หนึ่งวันของ<span className="inline-block">คนปล่อยเช่า</span>
        </h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed opacity-70">
          ตั้งแต่เช้าถึงค่ำ งานที่เคยต้องจด ต้องโทรตาม ต้องนั่งคิดเลข Kepz ทำให้จบในมือถือเครื่องเดียว
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-12">
          <ol>
            {STEPS.map((s, i) => (
              <li
                key={s.time}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className="flex min-h-[75vh] flex-col justify-center py-10 max-lg:min-h-0"
              >
                <div className={clsx("transition-opacity duration-500 lg:opacity-30", active === i && "lg:opacity-100")}>
                  <span className="tabular block text-5xl font-semibold tracking-tight sm:text-6xl">{s.time}</span>
                  <h3 className="mt-3 max-w-md text-2xl leading-snug font-bold sm:text-3xl">{s.title}</h3>
                  <p className="mt-3 max-w-md text-[17px] leading-relaxed opacity-70">{s.body}</p>
                </div>
                {/* มือถือ: หน้าจอของแต่ละช่วงอยู่ใต้ข้อความ พร้อมโน้ตสั้นๆ */}
                <div className="mt-8 lg:hidden">
                  <Phone step={s} on={active === i} />
                  <p className={clsx("hand mt-4 text-center text-xl", active === 3 ? "text-[#9fb4ff]" : "text-[#2d4bc9]")}>
                    {s.note.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* คอม: จอค้างอยู่ด้านข้าง เปลี่ยนตามช่วงเวลา มีเส้นทางพระอาทิตย์และโน้ตลายมือ */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-300px)]">
              <svg
                aria-hidden
                viewBox="0 0 560 300"
                className="pointer-events-none absolute -top-[150px] -left-[130px] w-[560px] overflow-visible"
              >
                <path
                  d="M30 270 A250 250 0 0 1 530 270"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.18"
                  strokeWidth="2"
                  strokeDasharray="2 10"
                  strokeLinecap="round"
                />
                <g ref={sunRef} transform="translate(30 270)">
                  <circle r="22" fill={night ? "#f4f1ff" : "#ffd21f"} className="transition-[fill] duration-700" />
                  {!night && <circle r="32" fill="#ffd21f" opacity="0.25" />}
                  <text
                    ref={clockRef}
                    y="-40"
                    textAnchor="middle"
                    className="tabular fill-current text-[15px] font-semibold"
                  >
                    08:00
                  </text>
                </g>
              </svg>

              <div className="relative">
                <Phone step={STEPS[active]} on />
                <div className="absolute top-0 left-[318px] w-[200px]">
                  {STEPS.map((s, i) => (
                    <Note key={s.time} step={s} on={active === i} night={night} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** โน้ตลายมือ + ลูกศรที่ค่อยๆ วาดตัวเองชี้ไปที่จุดบนจอ */
function Note({ step, on, night }: { step: Step; on: boolean; night: boolean }) {
  const { top, target, text } = step.note;
  const a = top + 16;
  const b = target;
  return (
    <div
      data-on={on || undefined}
      className={clsx("note absolute inset-x-0", night ? "text-[#9fb4ff]" : "text-[#2d4bc9]")}
      aria-hidden={!on}
    >
      <svg
        aria-hidden
        className="absolute -left-[30px] overflow-visible"
        style={{ top: 0 }}
        width="40"
        height="1"
      >
        <path
          className="note-path"
          d={`M40 ${a} C 22 ${a}, 24 ${b}, 4 ${b} M13 ${b - 7} L4 ${b} L14 ${b + 6}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="note-text hand absolute left-3 text-[22px] leading-tight" style={{ top }}>
        {text}
      </p>
    </div>
  );
}

/* ===== จอมือถือ: เลียนแบบหน้าจอจริงของ Kepz ===== */

const NAV: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "home", label: "ภาพรวม", icon: LayoutDashboard },
  { key: "units", label: "ห้องและที่จอด", icon: Warehouse },
  { key: "tenants", label: "ผู้เช่า", icon: Users },
  { key: "bills", label: "ใบวางบิล", icon: ReceiptText },
  { key: "menu", label: "เมนู", icon: Menu },
];
const NAV_FOR: Record<Screen, string> = { bills: "bills", paid: "bills", map: "units", night: "home" };

function Phone({ step, on }: { step: Step; on: boolean }) {
  const navActive = NAV_FOR[step.screen];
  return (
    <div className="mx-auto w-[300px] max-w-full rounded-[2.6rem] bg-[#1b1a17] p-2.5 shadow-[0_40px_80px_-34px_rgb(0_0_0/0.55)] lg:mx-0">
      <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[2.1rem] bg-canvas font-sans text-ink">
        {/* แถบสถานะ: เวลาตรงกับช่วงของเรื่อง */}
        <div className="flex h-7 shrink-0 items-center justify-between bg-ink px-6 text-[11px] font-semibold text-white">
          <span className="tabular">{step.time}</span>
          <span className="h-4 w-16 rounded-full bg-black" />
          <span className="flex gap-0.5">
            <i className="h-2 w-1 rounded-sm bg-white" />
            <i className="h-2.5 w-1 rounded-sm bg-white" />
            <i className="h-3 w-1 rounded-sm bg-white" />
          </span>
        </div>
        {/* หัวแอปจริง: ดำ ขอบล่างเหลือง */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b-[3px] border-brand bg-ink px-3.5">
          <span className="text-xl font-bold tracking-tight text-white">
            kepz<span className="text-brand">.</span>
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-brand text-xs font-bold">ส</span>
        </div>

        <div data-on={on || undefined} className="scr relative min-h-0 flex-1 overflow-hidden px-3 pt-3">
          {step.screen === "bills" && <BillsScreen />}
          {step.screen === "paid" && <PaidScreen />}
          {step.screen === "map" && <MapScreen />}
          {step.screen === "night" && <NightScreen />}
        </div>

        {/* เมนูล่างจริง */}
        <nav className="grid shrink-0 grid-cols-5 bg-ink pt-1.5 pb-2.5">
          {NAV.map(({ key, label, icon: Icon }) => {
            const act = key === navActive;
            return (
              <span
                key={key}
                className={clsx(
                  "flex flex-col items-center gap-0.5 text-[8.5px] whitespace-nowrap",
                  act ? "text-brand" : "text-white/60",
                )}
              >
                <span className={clsx("grid h-6 w-10 place-items-center rounded-full", act && "bg-brand text-ink")}>
                  <Icon className="size-4" strokeWidth={act ? 2.25 : 1.75} />
                </span>
                {label}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function seq(i: number): CSSProperties {
  return { ["--i" as string]: i };
}

function Card({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={clsx("rounded-2xl border border-line bg-surface", className)} style={style}>
      {children}
    </div>
  );
}

function Tick({ i }: { i: number }) {
  return (
    <span className="tick grid size-[18px] shrink-0 place-items-center rounded-[5px] border-2 border-ink/30" style={seq(i)}>
      <Check className="size-3 text-white" strokeWidth={3.5} />
    </span>
  );
}

function BillsScreen() {
  const rows = [
    ["S-02", "สมชาย ใจดี", "1,600.00"],
    ["S-05", "ร้านป้าแดง", "1,600.00"],
    ["M-01", "บจก. ทวีทรัพย์", "1,700.00"],
    ["P-03", "คุณนิด", "990.00"],
    ["A12", "แผงผลไม้ลุงชัย", "250.00"],
  ];
  return (
    <>
      <div className="text-lg leading-tight font-bold">ใบวางบิล</div>
      <div className="text-[11px] text-muted">ถึงรอบออกบิล 12 รายการ</div>
      <Card className="mt-2.5 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-3 py-2 text-[11px]">
          <span className="flex items-center gap-2 font-medium">
            <Tick i={0} /> เลือกทั้งหมด
          </span>
          <span className="text-[10px] text-muted">วันที่ 1 ธ.ค. 69</span>
        </div>
        <ul className="divide-y divide-line">
          {rows.map(([code, name, amt], i) => (
            <li key={code} className="flex items-start gap-2 px-3 py-2">
              <span className="mt-0.5">
                <Tick i={i + 1} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[12px]">
                  <b>{code}</b>
                  <span className="truncate text-muted">{name}</span>
                </span>
                <span className="block text-[9.5px] text-muted">รอบ 1–31 ธ.ค. · รายเดือน</span>
              </span>
              <span className="tabular text-[12px] font-semibold">{amt}</span>
            </li>
          ))}
        </ul>
      </Card>
      {/* แถบล่างที่โผล่มาหลังเลือก */}
      <div className="rise absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-line bg-surface px-3 py-2.5 shadow-[0_-8px_20px_-12px_rgba(0,0,0,0.25)]" style={seq(7)}>
        <span className="text-[11px]">
          เลือก <b>12</b> รายการ · <b className="tabular">18,450</b> บาท
        </span>
        <span className="rounded-lg bg-ink px-2.5 py-1.5 text-[11px] font-semibold text-white">ออกบิลที่เลือก</span>
      </div>
    </>
  );
}

function PaidScreen() {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-[15px] leading-tight font-bold">INV-2569-0142</span>
        <span className="rounded-full bg-ok-soft px-2 py-0.5 text-[10px] font-medium text-ok ring-1 ring-ok/20 ring-inset">
          ชำระแล้ว
        </span>
      </div>
      <div className="text-[11px] text-muted">S-02 · สมชาย ใจดี</div>
      <Card className="mt-2.5 grid grid-cols-2 divide-x divide-line">
        <div className="px-3 py-2">
          <div className="text-[10px] text-muted">ยอดค้าง</div>
          <div className="tabular text-[15px] font-bold">0.00 บาท</div>
        </div>
        <div className="px-3 py-2">
          <div className="text-[10px] text-muted">ครบกำหนด</div>
          <div className="text-[13px] font-semibold">5 ธ.ค. 69</div>
        </div>
      </Card>
      <Card className="mt-2.5 overflow-hidden">
        <ul className="divide-y divide-line text-[11.5px]">
          <li className="hl flex justify-between px-3 py-2" style={seq(1)}>
            <span>
              <span className="font-medium">ค่าเช่า ธ.ค. 69</span>
              <span className="block text-[9.5px] text-muted">นับเป็นรายได้</span>
            </span>
            <span className="tabular font-medium">1,600.00</span>
          </li>
          <li className="hl flex justify-between px-3 py-2" style={seq(2)}>
            <span>
              <span className="font-medium">เงินประกัน 2 เดือน</span>
              <span className="block text-[9.5px] text-muted">คืนผู้เช่าเมื่อย้ายออก</span>
            </span>
            <span className="tabular font-medium">3,200.00</span>
          </li>
        </ul>
        <div className="space-y-1 border-t border-line bg-canvas/60 px-3 py-2 text-[11.5px]">
          <div className="flex justify-between font-bold">
            <span>รวม</span>
            <span className="tabular">4,800.00</span>
          </div>
          <div className="flex justify-between text-ok">
            <span>รับชำระแล้ว · โอนเงิน</span>
            <span className="tabular">4,800.00</span>
          </div>
        </div>
      </Card>
      <Card className="pop mt-2.5 flex items-center gap-2.5 px-3 py-2.5" style={seq(4)}>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ok text-white">
          <Check className="size-4" strokeWidth={3} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-semibold">ใบเสร็จ RC2569-0031</span>
          <span className="block text-[10px] text-muted">พร้อมส่งให้ลูกค้า</span>
        </span>
        <span className="flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-[10px] font-semibold">
          <Download className="size-3" /> PDF
        </span>
      </Card>
    </>
  );
}

function MapScreen() {
  // a = ว่าง, k = มีผู้เช่า, y = ใกล้หมดสัญญา, r = ค้างชำระ
  const units: [string, string, string][] = [
    ["A1", "k", "สมชาย"], ["A2", "k", "ป้าแดง"], ["A3", "y", "คุณนิด"], ["A4", "a", ""],
    ["A5", "k", "ทวีทรัพย์"], ["A6", "r", "ลุงชัย"], ["A7", "a", ""], ["A8", "k", "มานี"],
    ["A9", "k", "สุดา"], ["A10", "a", ""], ["A11", "k", "วิชัย"], ["A12", "y", "ก้อย"],
    ["A13", "k", "เอก"], ["A14", "a", ""], ["A15", "k", "ปู"], ["A16", "a", ""],
  ];
  const cls: Record<string, string> = {
    a: "border-ok bg-ok-soft",
    k: "border-ink bg-ink text-white",
    y: "border-brand-strong bg-brand",
    r: "border-bad bg-bad text-white",
  };
  return (
    <>
      <div className="text-lg leading-tight font-bold">ห้องและที่จอด</div>
      <div className="mt-2 flex rounded-xl bg-line/70 p-0.5 text-[10.5px] font-semibold">
        <span className="flex-1 py-1 text-center text-muted">ผังปกติ</span>
        <span className="flex-1 rounded-lg bg-surface py-1 text-center shadow-sm">ดูสถานะเช่า</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1 text-[9.5px] text-muted">
        <span className="flex items-center gap-1"><i className="size-2.5 rounded-sm border-2 border-ok bg-ok-soft" />ว่าง</span>
        <span className="flex items-center gap-1"><i className="size-2.5 rounded-sm border-2 border-ink bg-ink" />มีผู้เช่า</span>
        <span className="flex items-center gap-1"><i className="size-2.5 rounded-sm border-2 border-brand-strong bg-brand" />ใกล้หมดสัญญา</span>
        <span className="flex items-center gap-1"><i className="size-2.5 rounded-sm bg-bad" />ค้างชำระ</span>
      </div>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {units.map(([code, s, name], i) => (
          <span
            key={code}
            className={clsx(
              "tile relative flex h-[50px] flex-col justify-between rounded-lg border-2 px-1.5 py-1",
              cls[s],
              code === "A4" && "pick",
            )}
            style={seq(i)}
          >
            {s === "r" && (
              <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded bg-bad text-[9px] font-black text-white ring-2 ring-canvas">
                !
              </span>
            )}
            <b className="text-[11px] leading-none">{code}</b>
            <span className={clsx("truncate text-[8.5px] leading-none", s === "a" && "text-ok")}>{s === "a" ? "ว่าง" : name}</span>
          </span>
        ))}
      </div>
      {/* แผ่นข้อมูลที่เลื่อนขึ้นเมื่อแตะช่องว่าง */}
      <div className="rise absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-line bg-surface px-3.5 pt-2 pb-3 shadow-[0_-10px_24px_-14px_rgba(0,0,0,0.35)]" style={seq(18)}>
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-line" />
        <div className="flex items-center justify-between">
          <span>
            <b className="text-[14px]">A4</b>
            <span className="ml-1.5 rounded-full bg-ok-soft px-1.5 py-0.5 text-[9.5px] font-medium text-ok">ว่าง</span>
            <span className="block text-[10px] text-muted">ห้องเก็บของ 3×4 ม. · ฿1,600/เดือน</span>
          </span>
          <span className="rounded-lg bg-ink px-2.5 py-1.5 text-[10.5px] font-semibold text-white">ทำสัญญาเช่า</span>
        </div>
      </div>
    </>
  );
}

function NightScreen() {
  const bars = [52, 61, 58, 70, 66, 83];
  return (
    <>
      <div className="text-lg leading-tight font-bold">ภาพรวม</div>
      <div className="mt-2.5 rounded-2xl bg-ink p-3.5 text-white">
        <div className="text-[10.5px] text-white/60">รายรับเดือน ธันวาคม 2569</div>
        <div className="tabular text-[26px] leading-tight font-bold">฿48,600</div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <div className="hl-dark rounded-xl bg-brand p-2 text-ink" style={seq(1)}>
            <div className="text-[9.5px] font-medium text-ink/70">ค่าเช่า</div>
            <div className="tabular text-[14px] font-bold">฿41,400</div>
          </div>
          <div className="rounded-xl bg-white/10 p-2">
            <div className="text-[9.5px] font-medium text-white/60">เงินประกัน</div>
            <div className="tabular text-[14px] font-bold">฿7,200</div>
          </div>
        </div>
        <div className="mt-3 mb-1 text-[9px] text-white/40">ค่าเช่า 6 เดือนล่าสุด</div>
        <div className="flex h-14 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className={clsx("bar flex-1 rounded-t", i === bars.length - 1 ? "bg-brand" : "bg-white/25")}
              style={{ ...seq(i), height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <Card className="mt-2.5 p-3">
        <div className="text-[11px] font-semibold">อัตราการเช่าแต่ละสาขา</div>
        {[
          ["สาขาบางนา", 18, 21],
          ["สาขาลาดพร้าว", 9, 14],
        ].map(([name, used, all]) => (
          <div key={name} className="mt-2">
            <div className="flex justify-between text-[10.5px]">
              <span>{name}</span>
              <span className="tabular text-muted">
                {used}/{all}
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-ink" style={{ width: `${(Number(used) / Number(all)) * 100}%` }} />
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}
