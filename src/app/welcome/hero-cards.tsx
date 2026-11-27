import clsx from "clsx";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { ArtKey } from "./rental-art";

type Card = {
  art: ArtKey;
  title: string;
  price: string;
  status: "ว่าง" | "เช่าอยู่" | "จองแล้ว";
  pos: string;
  tilt: number;
  delay: number;
};

/** การ์ดของให้เช่ารูปจริงลอยรอบหัวข้อ (จอคอมเท่านั้น): ซ้าย 3 ใบ ขวา 3 ใบ */
const CARDS: Card[] = [
  { art: "storage", title: "ห้องเก็บของ S-02", price: "฿1,600/เดือน", status: "ว่าง", pos: "left-[3%] top-[17%]", tilt: -6, delay: 0 },
  { art: "dress", title: "ชุดราตรีแดง M", price: "฿800/วัน", status: "จองแล้ว", pos: "left-[9%] top-[50%]", tilt: 4, delay: 1.2 },
  { art: "stall", title: "แผงตลาด A12", price: "฿250/วัน", status: "ว่าง", pos: "left-[1%] top-[78%]", tilt: -3, delay: 2.1 },
  { art: "car", title: "Yaris กข 1234", price: "฿1,200/วัน", status: "เช่าอยู่", pos: "right-[3%] top-[14%]", tilt: 5, delay: 0.6 },
  { art: "dorm", title: "หอพัก ห้อง 4B", price: "฿4,500/เดือน", status: "ว่าง", pos: "right-[9%] top-[47%]", tilt: -4, delay: 1.7 },
  { art: "parking", title: "ที่จอดรถ P-03", price: "฿990/เดือน", status: "เช่าอยู่", pos: "right-[1%] top-[76%]", tilt: 3, delay: 2.6 },
];

const STATUS = {
  ว่าง: "bg-ok-soft text-ok",
  เช่าอยู่: "bg-ink text-white",
  จองแล้ว: "bg-brand text-ink",
};

export function HeroCards() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      {CARDS.map((c) => (
        <div
          key={c.art}
          className={clsx("intro absolute w-44 2xl:w-48", c.pos)}
          style={{ ["--intro-delay" as string]: `${300 + c.delay * 120}ms` } as CSSProperties}
        >
          <div className="float-soft" style={{ ["--float-delay" as string]: `-${c.delay}s` } as CSSProperties}>
            <div
              className="rounded-2xl border border-line bg-white p-2 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.35)]"
              style={{ rotate: `${c.tilt}deg` }}
            >
              <Image
                src={`/rentals/${c.art}.webp`}
                alt=""
                width={192}
                height={128}
                loading="eager"
                unoptimized
                className="h-28 w-full rounded-xl object-cover"
              />
              <div className="px-1 pt-2 pb-1">
                <div className="truncate text-sm font-bold">{c.title}</div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted">{c.price}</span>
                  <span className={clsx("rounded-full px-2 py-0.5 text-[11px] font-semibold", STATUS[c.status])}>
                    {c.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
