"use client";

import clsx from "clsx";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Screen = "bills" | "paid" | "map";

const STEPS: { time: string; title: string; body: string; screen: Screen }[] = [
  {
    time: "08:00",
    title: "ออกบิลทั้งเดือนในครั้งเดียว",
    body: "เปิดมาเห็นเลยว่าใครถึงรอบจ่าย เลือกทั้งหมดแล้วกดออกบิล ไม่ต้องไล่ทำทีละห้อง",
    screen: "bills",
  },
  {
    time: "13:20",
    title: "ลูกค้าโอนมา ออกใบเสร็จทันที",
    body: "แนบสลิป กดรับเงิน ใบเสร็จพร้อมส่งเป็น PDF ระบบแยกให้ว่าก้อนไหนค่าเช่า ก้อนไหนเงินประกัน",
    screen: "paid",
  },
  {
    time: "17:45",
    title: "รู้ว่าอะไรว่าง ก่อนลูกค้าคนต่อไปถาม",
    body: "ผังสถานที่บอกสถานะทุกห้อง ทุกแผง ทุกคัน ว่าง ไม่ว่าง หรือค้างจ่าย ในภาพเดียว",
    screen: "map",
  },
];

/** หนึ่งวันของเจ้าของธุรกิจเช่า: เลื่อนอ่านทีละช่วงเวลา จอมือถือ (คอม) เปลี่ยนตามช่วงที่อ่านอยู่ */
export function DayStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-20">
      <ol>
        {STEPS.map((s, i) => (
          <li
            key={s.time}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            className="flex min-h-[70vh] flex-col justify-center py-10 max-lg:min-h-0"
          >
            <div
              className={clsx(
                "transition-opacity duration-500",
                "lg:opacity-30",
                active === i && "lg:opacity-100",
              )}
            >
              <span className="tabular text-5xl font-bold tracking-tight sm:text-6xl">{s.time}</span>
              <h3 className="mt-3 max-w-md text-2xl leading-snug font-bold sm:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink/65">{s.body}</p>
            </div>
            {/* มือถือ: หน้าจอของแต่ละช่วงอยู่ใต้ข้อความ */}
            <div className="mt-8 lg:hidden">
              <Phone screen={s.screen} />
            </div>
          </li>
        ))}
      </ol>
      {/* คอม: จอค้างอยู่ด้านข้าง เปลี่ยนตามช่วงเวลาที่อ่าน */}
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-280px)]">
          <Phone screen={STEPS[active].screen} />
        </div>
      </div>
    </div>
  );
}

function Phone({ screen }: { screen: Screen }) {
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-[2.75rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgb(22_21_19/0.55)]">
      <div className="relative h-[540px] overflow-hidden rounded-[2.2rem] bg-[#f7f5ef]">
        <div className="mx-auto mt-2.5 h-6 w-24 rounded-full bg-ink" />
        {(["bills", "paid", "map"] as Screen[]).map((k) => (
          <div
            key={k}
            aria-hidden={k !== screen}
            className={clsx(
              "absolute inset-x-0 top-12 bottom-0 px-4 transition duration-500 ease-out",
              k === screen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
            )}
          >
            {k === "bills" && <BillsScreen />}
            {k === "paid" && <PaidScreen />}
            {k === "map" && <MapScreen />}
          </div>
        ))}
      </div>
    </div>
  );
}

function BillsScreen() {
  const rows = [
    ["S-02", "สมชาย", "1,600"],
    ["S-05", "ร้านป้าแดง", "1,600"],
    ["M-01", "บจก. ทวีทรัพย์", "1,700"],
    ["P-03", "คุณนิด", "990"],
    ["A12", "แผงผลไม้", "250"],
  ];
  return (
    <div>
      <div className="text-sm text-ink/60">ถึงรอบออกบิล</div>
      <div className="text-3xl font-bold">12 รายการ</div>
      <ul className="mt-4 divide-y divide-ink/10 rounded-2xl bg-white">
        {rows.map(([code, name, amt]) => (
          <li key={code} className="flex items-center gap-3 px-3 py-2.5 text-sm">
            <span className="grid h-8 w-12 place-items-center rounded-lg bg-[#f7f5ef] text-xs font-bold">{code}</span>
            <span className="min-w-0 flex-1 truncate">{name}</span>
            <span className="tabular font-semibold">{amt}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid h-12 place-items-center rounded-2xl bg-brand text-sm font-bold">ออกบิล 12 รายการ</div>
    </div>
  );
}

function PaidScreen() {
  return (
    <div>
      <div className="mt-6 grid place-items-center">
        <span className="grid size-16 place-items-center rounded-full bg-[#1f9d55] text-white">
          <Check className="size-8" strokeWidth={3} />
        </span>
        <div className="mt-3 text-sm text-ink/60">รับชำระแล้ว</div>
        <div className="tabular text-4xl font-bold">฿4,800</div>
        <div className="text-sm text-ink/60">S-02 · สมชาย · โอนเงิน</div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-brand p-3">
          <div className="text-xs text-ink/70">ค่าเช่า</div>
          <div className="tabular text-lg font-bold">฿1,600</div>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <div className="text-xs text-ink/60">เงินประกัน</div>
          <div className="tabular text-lg font-bold">฿3,200</div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-sm">
        <div className="font-semibold">ใบเสร็จ RC2569-0031</div>
        <div className="text-ink/60">พร้อมส่ง PDF ให้ลูกค้า</div>
      </div>
    </div>
  );
}

function MapScreen() {
  // ว่าง = เขียว · มีผู้เช่า = ดำ · ใกล้หมดสัญญา = เหลือง · ค้างจ่าย = แดง
  const cells = "gkkgkyk gkrkgkk kgkkykg".replace(/ /g, "").split("");
  const cls: Record<string, string> = {
    g: "border-[#1f9d55] bg-[#e3f4ea] text-[#1f9d55]",
    k: "border-ink bg-ink text-white",
    y: "border-[#e0b800] bg-brand text-ink",
    r: "border-[#c0392b] bg-[#c0392b] text-white",
  };
  return (
    <div>
      <div className="text-sm text-ink/60">โซน A · วันนี้</div>
      <div className="text-3xl font-bold">ว่าง 5 จาก 21</div>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {cells.map((c, i) => (
          <span key={i} className={clsx("grid aspect-square place-items-center rounded-md border-2 text-[9px] font-bold", cls[c])}>
            {`A${i + 1}`}
          </span>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-white p-3 text-sm">
        <div className="font-semibold">A3 ว่างตั้งแต่วันนี้</div>
        <div className="text-ink/60">แตะเพื่อทำสัญญาเช่าใหม่</div>
      </div>
    </div>
  );
}
