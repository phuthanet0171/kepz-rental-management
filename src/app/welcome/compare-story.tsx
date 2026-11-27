"use client";

import clsx from "clsx";
import { ChevronsLeftRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Phone, type Screen } from "./app-screens";

/** แต่ละเรื่อง: ปัญหาแบบเดิม → สิ่งที่ Kepz ทำได้ (ข้อความสั้นที่สุด ให้ภาพเทียบเล่าเรื่องแทน) */
const TOPICS: { screen: Screen; time: string; tab: string; before: string; after: string }[] = [
  { screen: "bills", time: "08:00", tab: "ทวงค่าเช่า", before: "ไล่ทักทวงทีละคน", after: "รู้ทันทีว่าใครยังไม่จ่าย" },
  { screen: "paid", time: "13:20", tab: "ใบเสร็จ", before: "หาสลิปในแชท เขียนใบเสร็จเอง", after: "กดรับเงิน ได้ใบเสร็จ PDF" },
  { screen: "map", time: "17:45", tab: "ช่องว่าง", before: "เปิดสมุดไล่ดูว่าอะไรว่าง", after: "ดูผังสีเดียวรู้" },
  { screen: "night", time: "21:00", tab: "ยอดสิ้นเดือน", before: "กดเครื่องคิดเลขรวมเอง", after: "เห็นยอดทุกสาขาทันที" },
];

/**
 * แบบเดิม vs Kepz: การ์ดลากเทียบใบเดียว สลับเรื่องด้วยแท็บด้านบน
 * ข้อความน้อยที่สุด: หัวข้อ 1 บรรทัด + ใต้การ์ดบอกแบบเดิม/แบบ Kepz อย่างละวลีเดียว
 */
export function CompareStory() {
  const [active, setActive] = useState(0);
  const t = TOPICS[active];
  return (
    <section
      id="story"
      className="scroll-mt-16 overflow-x-clip bg-canvas [background-image:radial-gradient(rgb(27_26_23/0.08)_1.5px,transparent_1.5px)] [background-size:26px_26px]"
    >
      <div className="mx-auto max-w-3xl px-5 pt-24 pb-24 sm:pt-28 sm:pb-28">
        <Reveal className="text-center">
          <h2 className="text-3xl leading-[1.2] font-bold tracking-tight sm:text-5xl">
            แบบเดิม <span className="text-ink/35">vs</span> Kepz
          </h2>
          <p className="mt-3 text-base text-ink/60 sm:text-lg">ลากเส้นตรงกลางเพื่อเทียบ</p>
        </Reveal>

        <Reveal delay={120} className="mt-8">
          <div role="tablist" aria-label="เลือกเรื่องที่จะเทียบ" className="mx-auto grid max-w-sm grid-cols-2 gap-2 sm:flex sm:max-w-none sm:justify-center">
            {TOPICS.map((x, i) => (
              <button
                key={x.screen}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="compare-panel"
                onClick={() => setActive(i)}
                className={clsx(
                  "rounded-full border-2 px-4 py-2 text-sm font-semibold transition sm:text-[15px]",
                  i === active ? "border-ink bg-ink text-brand" : "border-ink/15 bg-white text-ink/70 hover:border-ink/40 hover:text-ink",
                )}
              >
                {x.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal variant="pop" delay={200} className="mt-6">
          <div id="compare-panel" role="tabpanel" aria-label={t.tab}>
            {/* key: เปลี่ยนเรื่องแล้วเส้นแบ่งกวาดให้ดูใหม่ */}
            <CompareCard key={t.screen} screen={t.screen} time={t.time} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-center text-[15px] sm:text-base">
            <p className="text-ink/50">
              <span className="block text-xs font-semibold text-ink/40">แบบเดิม</span>
              <span className="line-through decoration-ink/30">{t.before}</span>
            </p>
            <p className="font-semibold">
              <span className="block text-xs font-semibold text-ink/50">Kepz</span>
              {t.after}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CompareCard({ screen, time }: { screen: Screen; time: string }) {
  const [pos, setPos] = useState(50);
  const [inView, setInView] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const dragging = useRef(false);

  // เลื่อนมาถึงครั้งแรก: เส้นแบ่งกวาดไปมาเองหนึ่งรอบ บอกว่าลากได้
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setInView(true);
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        const keys = [50, 78, 24, 55];
        const seg = 700;
        const start = performance.now() + 400;
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.max(0, now - start);
          const k = Math.min(keys.length - 2, Math.floor(t / seg));
          const p = Math.min(1, (t - k * seg) / seg);
          const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          setPos(keys[k] + (keys[k + 1] - keys[k]) * ease);
          if (t < seg * (keys.length - 1)) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const moveTo = (clientX: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="relative">
      <div
        ref={boxRef}
        className="relative h-[440px] cursor-ew-resize touch-pan-y overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgb(0_0_0/0.45)] ring-1 ring-ink/10 select-none sm:h-[500px]"
        onPointerDown={(e) => {
          touched.current = true;
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* หลัง: ใช้ Kepz */}
        <div className="absolute inset-0 grid place-items-center bg-brand">
          <div className="origin-center scale-[0.7] sm:scale-[0.78]">
            <Phone screen={screen} time={time} on={inView} />
          </div>
          <Label className="right-4 bg-ink text-brand">Kepz</Label>
        </div>

        {/* ก่อน: สมุดจด (ตัดให้เห็นเฉพาะฝั่งซ้ายของเส้นแบ่ง) */}
        <div
          className="absolute inset-0 grid place-items-center bg-[#e6dfcf]"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden
        >
          <Notebook screen={screen} />
          <Label className="left-4 bg-white/90 text-ink">แบบเดิม</Label>
        </div>

        {/* เส้นแบ่ง + ปุ่มลาก */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute inset-y-0 -left-0.5 w-1 bg-white shadow-[0_0_0_1px_rgb(27_26_23/0.25)]" />
          <input
            type="range"
            min={4}
            max={96}
            value={Math.round(pos)}
            onChange={(e) => {
              touched.current = true;
              setPos(Number(e.target.value));
            }}
            aria-label="เลื่อนเปรียบเทียบ แบบเดิมกับเมื่อใช้ Kepz"
            className="peer sr-only"
          />
          <div className="absolute top-1/2 left-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-white bg-ink text-brand shadow-lg peer-focus-visible:ring-4 peer-focus-visible:ring-brand">
            <ChevronsLeftRight className="size-5" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "absolute bottom-4 rounded-full px-3 py-1 text-sm font-bold shadow-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ===== สมุดจดแบบเดิม (ลายมือ) ===== */

function Notebook({ screen }: { screen: Screen }) {
  const page = NOTES[screen];
  return (
    <div className="relative">
      <div className="hand relative h-[380px] w-[250px] -rotate-2 overflow-hidden rounded-sm bg-[#fffdf6] pt-7 pr-4 pl-12 text-[18px] leading-[30px] whitespace-nowrap text-[#2d4bc9] shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)] [background-image:repeating-linear-gradient(transparent_0_29px,#c9d6ef_29px_30px)] [background-position:0_26px] sm:h-[420px] sm:w-[280px]">
        <span className="absolute inset-y-0 left-9 w-px bg-[#f2a7a7]" />
        <p className="text-[22px] underline decoration-2 underline-offset-4">
          {page.title}
        </p>
        <div className="mt-1">{page.lines}</div>
      </div>
      <p className="hand absolute -right-6 bottom-6 w-36 rotate-[5deg] bg-[#fff27a] px-3 py-2.5 text-[17px] leading-snug text-ink shadow-md sm:-right-10">
        {page.sticky}
      </p>
    </div>
  );
}

const Strike = ({ children }: { children: ReactNode }) => (
  <span className="relative">
    {children}
    <span className="absolute top-1/2 -right-1 -left-1 h-0.5 -rotate-3 bg-[#d6283b]" />
  </span>
);
const Red = ({ children }: { children: ReactNode }) => (
  <span className="text-[#d6283b]">{children}</span>
);

const NOTES: Record<
  Screen,
  { title: string; lines: ReactNode; sticky: string }
> = {
  bills: {
    title: "ค่าเช่า ธ.ค.",
    lines: (
      <>
        <p>S-02 สมชาย 1,600 ✓</p>
        <p>
          S-05 ป้าแดง 1,600 <Red>ทักยัง?</Red>
        </p>
        <p>
          M-01 ทวี <Strike>1,500</Strike> 1,700
        </p>
        <p>P-03 นิด 990</p>
        <p>A12 ลุงชัย 250</p>
        <p className="text-[#2d4bc9]/60">…อีก 7 ห้อง</p>
      </>
    ),
    sticky: "ทวงไลน์ทีละคน ครบ 12 คนยัง!?",
  },
  paid: {
    title: "สมชายโอนมา",
    lines: (
      <>
        <p>13:20 รับ 4,800</p>
        <p>
          ค่าเช่า 1,600 <Red>?</Red>
        </p>
        <p>
          ประกัน 3,200 <Red>?</Red>
        </p>
        <p>
          <Strike>เขียนใบเสร็จ</Strike>
        </p>
        <p>
          <Red>เล่มใบเสร็จหมด!</Red>
        </p>
      </>
    ),
    sticky: "สลิปอยู่แชทไหนนะ…",
  },
  map: {
    title: "ห้องว่าง?",
    lines: (
      <>
        <div className="mt-2 grid w-[150px] grid-cols-4 gap-1.5">
          {"xx?ox?xxoxxx".split("").map((c, i) => (
            <span
              key={i}
              className="grid aspect-square place-items-center rounded-[3px] border-2 border-[#2d4bc9] text-[15px] leading-none"
            >
              {c === "x" ? "✕" : c === "o" ? "" : <Red>?</Red>}
            </span>
          ))}
        </div>
        <p className="mt-2">
          A4 ว่างไหมนะ <Red>??</Red>
        </p>
      </>
    ),
    sticky: "ต้องเดินไปดูเองอีกแล้ว",
  },
  night: {
    title: "สรุปเดือนนี้",
    lines: (
      <>
        <p>1,600+1,600+1,700</p>
        <p>+990+250+3,000</p>
        <p>+4,500+ …</p>
        <p>
          = <Strike>46,200</Strike> 48,600 <Red>?</Red>
        </p>
        <p>
          <Red>รวมเงินประกันด้วยไหม??</Red>
        </p>
      </>
    ),
    sticky: "กดเครื่องคิดเลขไปชั่วโมงนึง",
  },
};
