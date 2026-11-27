"use client";

import clsx from "clsx";
import { ChevronsLeftRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Phone, type Screen } from "./app-screens";
import { Phrases } from "./phrases";
import { ChatToReceipt, DepositSplit, LeaseTimeline, MonthSummary } from "./story-visuals";

type Chapter = {
  key: string;
  /** ธุรกิจที่ยกเป็นตัวอย่าง */
  biz: string;
  /** ปัญหาที่เจอจริง (เสียงของคนปล่อยเช่า) */
  pain: string;
  title: string;
  body: string;
  visual: ReactNode;
};

/**
 * ปัญหาที่คนปล่อยเช่าเจอบ่อย (จากกระทู้และแบบสำรวจเจ้าของรายเล็ก) + สิ่งที่ Kepz มีจริงในแอป
 * ยกตัวอย่างหลายธุรกิจ: หอพัก ร้านเช่าชุด ร้านเช่ากล้อง แผงตลาด เจ้าของหลายสาขา
 */
const CHAPTERS: Chapter[] = [
  {
    key: "chase",
    biz: "หอพัก ห้องเช่า",
    pain: "ถึงสิ้นเดือนทีไร ต้องไล่ทักทวงค่าเช่าทีละห้อง",
    title: "รู้ทันทีว่าใครยังไม่จ่าย",
    body: "Kepz ออกบิลทุกห้องที่ถึงรอบในครั้งเดียว ห้องที่ยังไม่จ่ายขึ้นป้ายรอชำระ พอเลยกำหนดก็เปลี่ยนเป็นค้างชำระให้เอง ไม่ต้องจำ",
    visual: <CompareCard screen="bills" time="08:00" hint />,
  },
  {
    key: "slips",
    biz: "ร้านเช่าชุด",
    pain: "ลูกค้าส่งสลิปมาในแชท จะเช็กยอดทีต้องเลื่อนหาย้อนหลัง",
    title: "รับเงินแล้ว ได้ใบเสร็จทันที",
    body: "กดรับเงินแล้วใส่ยอด Kepz ออกใบเสร็จ PDF ให้ส่งลูกค้า และเก็บทุกการรับเงินไว้ที่เดียว ย้อนดูได้ทุกรายการ",
    visual: <ChatToReceipt />,
  },
  {
    key: "deposit",
    biz: "ร้านเช่ากล้อง อุปกรณ์",
    pain: "รับมัดจำมาปนกับค่าเช่า พอลูกค้าคืนของ ไม่แน่ใจว่าต้องคืนเท่าไร",
    title: "เงินประกันแยกไว้ ไม่ปนรายได้",
    body: "Kepz แยกเงินประกันออกจากค่าเช่าตั้งแต่บิลแรก รู้เสมอว่าถือเงินประกันของใครอยู่เท่าไร ถึงวันคืนก็ไม่ต้องคิดเลขใหม่",
    visual: <DepositSplit />,
  },
  {
    key: "expiring",
    biz: "แผงตลาด ที่จอดรถ",
    pain: "สัญญาหมดไปตั้งแต่เดือนก่อน เพิ่งรู้ตอนผู้เช่าย้ายออก",
    title: "สัญญาใกล้หมด เห็นก่อนถึงวัน",
    body: "สัญญาที่ใกล้หมดขึ้นเป็นสีเหลืองบนผังและในรายการ มีเวลาคุยต่อสัญญา หรือหาผู้เช่าใหม่ก่อนที่จะว่าง",
    visual: <LeaseTimeline />,
  },
  {
    key: "summary",
    biz: "มีหลายสาขา",
    pain: "สิ้นเดือนนั่งรวมยอดจากสมุดหลายเล่ม รวมเสร็จก็ยังไม่แน่ใจว่าถูก",
    title: "สิ้นเดือน รู้ยอดทันที",
    body: "หน้าภาพรวมรวมรายรับให้ทุกวัน แยกตามสาขา บอกว่าใครรอชำระหรือค้าง และแยกเงินประกันออกจากรายได้",
    visual: <MonthSummary />,
  },
];

/** ปัญหาจริง → Kepz ช่วยยังไง: แต่ละเรื่องมีภาพประกอบคนละแบบ (ลากเทียบมีแค่เรื่องแรก) */
export function CompareStory() {
  return (
    <section id="story" className="scroll-mt-16 overflow-x-clip bg-brand-soft">
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-24 sm:pt-32 sm:pb-32">
        <Reveal className="max-w-2xl">
          <h2 className="text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl">
            ปัญหาที่คนปล่อยเช่า<span className="inline-block">เจอจริง</span>{" "}
            <span className="inline-block">Kepz ช่วยได้</span>
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/65">
            <Phrases text="ไม่ว่าจะให้เช่าห้อง ที่จอด ชุด หรือกล้อง ปัญหาคล้ายกันหมด นี่คือ 5 เรื่องที่เจอบ่อยที่สุด" />
          </p>
        </Reveal>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {CHAPTERS.map((c, i) => (
            <article
              key={c.key}
              className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
            >
              <Reveal variant={i % 2 === 1 ? "right" : "left"} className={clsx(i % 2 === 1 && "lg:order-2")}>
                <span className="inline-block rounded-full border-2 border-ink bg-white px-3 py-1 text-sm font-semibold">
                  {c.biz}
                </span>
                <p className="hand mt-4 max-w-md text-xl leading-snug text-ink/60 sm:text-2xl">“{c.pain}”</p>
                <h3 className="mt-4 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                  <Phrases text={c.title} />
                </h3>
                <p className="mt-3 max-w-md text-[17px] leading-relaxed text-ink/70">{c.body}</p>
              </Reveal>
              <Reveal variant="pop" delay={150}>
                {c.visual}
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareCard({ screen, time, hint }: { screen: Screen; time: string; hint?: boolean }) {
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
        className="relative h-[460px] cursor-ew-resize touch-pan-y overflow-hidden rounded-[2rem] border-2 border-ink shadow-[6px_6px_0_0_#1b1a17] select-none sm:h-[520px]"
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
          <Label className="right-4 bg-ink text-white">กับ Kepz</Label>
        </div>

        {/* ก่อน: สมุดจด (ตัดให้เห็นเฉพาะฝั่งซ้ายของเส้นแบ่ง) */}
        <div
          className="absolute inset-0 grid place-items-center bg-[#efe9dc]"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden
        >
          <Notebook screen={screen} />
          <Label className="left-4 bg-white text-ink">แบบเดิม</Label>
        </div>

        {/* เส้นแบ่ง + ปุ่มลาก */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute inset-y-0 -left-px w-0.5 bg-ink" />
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
          <div className="absolute top-1/2 left-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-white shadow-lg peer-focus-visible:ring-4 peer-focus-visible:ring-brand">
            <ChevronsLeftRight className="size-5" strokeWidth={2.5} />
          </div>
        </div>
      </div>
      {hint && (
        <p
          className="hand pointer-events-none absolute right-6 -bottom-10 rotate-[-3deg] text-xl text-[#2d4bc9]"
          aria-hidden
        >
          ลองลากเส้นตรงกลางดู
        </p>
      )}
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
        "absolute top-4 rounded-full border-2 border-ink px-3 py-1 text-sm font-bold",
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
