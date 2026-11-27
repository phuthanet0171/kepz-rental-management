"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ArtKey } from "./rental-art";

type Tag = { title: string; line: string; tone: "free" | "busy" | "late" | "info"; art: ArtKey };

const ROW_A: Tag[] = [
  { title: "ห้องเก็บของไซส์ M", line: "ว่าง · ฿1,600/เดือน", tone: "free", art: "storage" },
  { title: "แผง A12", line: "เสาร์–อาทิตย์ ฿250/วัน", tone: "info", art: "stall" },
  { title: "Yaris กข 1234", line: "คืนวันนี้ 18:00", tone: "busy", art: "car" },
  { title: "ที่จอด P-03", line: "รายเดือน ฿990", tone: "info", art: "parking" },
  { title: "ชุดราตรีแดง M", line: "จองแล้ว 14–16 ธ.ค.", tone: "busy", art: "dress" },
  { title: "เต็นท์ 3×3 ม.", line: "ว่าง 12 จาก 20 หลัง", tone: "free", art: "tent" },
];
const ROW_B: Tag[] = [
  { title: "กล้อง A7 IV", line: "฿900/วัน + ประกัน ฿5,000", tone: "info", art: "camera" },
  { title: "ห้องเช่า 4B", line: "ค้างจ่าย 5 วัน", tone: "late", art: "dorm" },
  { title: "โกดัง 2", line: "ว่าง · 40 ตร.ม.", tone: "free", art: "warehouse" },
  { title: "จักรยาน #07", line: "รายชั่วโมง ฿40", tone: "info", art: "bike" },
  { title: "โต๊ะจัดเลี้ยง", line: "ว่าง 64 จาก 100 ตัว", tone: "free", art: "table" },
  { title: "ห้องประชุม B", line: "จอง 13:00–15:00", tone: "busy", art: "meeting" },
];

/** ป้ายเช่าไหลผ่านจอเป็นแนวโค้ง: โค้งเข้ามาจากขอบ แบนราบตรงกลาง แล้วจางหายอีกฝั่ง */
export function TagRiver() {
  return (
    <section aria-label="ตัวอย่างสิ่งที่จัดการได้บน Kepz" className="overflow-hidden pt-2 pb-4">
      <TagRow tags={ROW_A} speed={34} />
      <TagRow tags={ROW_B} speed={-28} />
      <p className="mt-2 px-5 text-center text-xs text-ink/50">ตัวอย่างของให้เช่าที่ดูแลบน Kepz ได้ ทั้งรายเดือน รายวัน และรายชั่วโมง</p>
    </section>
  );
}

function TagRow({ tags, speed }: { tags: Tag[]; speed: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;
    if (!row || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(track.children) as HTMLElement[];
    let centers: number[] = [];
    let half = 0;
    let rowW = 0;
    const measure = () => {
      // วัดครั้งเดียว (และตอนขนาดจอเปลี่ยน) ไม่อ่าน layout ทุกเฟรม
      rowW = row.clientWidth;
      half = track.scrollWidth / 2;
      centers = items.map((el) => el.offsetLeft + el.offsetWidth / 2);
    };
    measure();

    let x = speed > 0 ? 0 : -half;
    let last = performance.now();
    let paused = false;
    let visible = true;
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!paused) {
        x -= speed * dt;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      track.style.transform = `translate3d(${x}px,0,0)`;
      for (let i = 0; i < items.length; i++) {
        // -1 = ขอบซ้าย, 0 = กลางจอ, 1 = ขอบขวา
        const n = Math.max(-1.3, Math.min(1.3, ((centers[i] + x) / rowW) * 2 - 1));
        const curve = Math.sign(n) * Math.pow(Math.abs(n), 1.6);
        const fade = 1 - Math.max(0, Math.abs(n) - 0.75) / 0.45;
        items[i].style.transform = `rotateY(${-curve * 52}deg) translateZ(${Math.abs(curve) * 90}px)`;
        items[i].style.opacity = String(Math.max(0, fade));
      }
      if (visible) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(row);
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    const pause = () => (paused = true);
    const play = () => (paused = false);
    row.addEventListener("pointerenter", pause);
    row.addEventListener("pointerleave", play);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      row.removeEventListener("pointerenter", pause);
      row.removeEventListener("pointerleave", play);
    };
  }, [speed]);

  return (
    <div ref={rowRef} className="tag-row py-2.5">
      <div ref={trackRef} className="tag-track">
        {[...tags, ...tags].map((t, i) => (
          <RentTag key={i} tag={t} tilt={((i * 37) % 7) - 3} hidden={i >= tags.length} />
        ))}
      </div>
    </div>
  );
}

/** การ์ดของให้เช่า: พื้นขาวทุกใบให้รูปเด่น สถานะใช้สีเล็กๆ ที่บรรทัดล่าง */
function RentTag({ tag, tilt, hidden }: { tag: Tag; tilt: number; hidden: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="tag-item shrink-0">
      <div
        className="flex items-center gap-2.5 rounded-xl bg-white py-1.5 pr-4 pl-1.5 text-ink shadow-[0_10px_22px_-14px_rgb(22_21_19/0.5)]"
        style={{ rotate: `${tilt * 0.4}deg` }}
      >
        <Image
          src={`/rentals/${tag.art}.webp`}
          alt=""
          width={56}
          height={56}
          draggable={false}
          loading="eager"
          unoptimized
          className="size-10 shrink-0 rounded-lg object-cover sm:size-12"
        />
        <div className="whitespace-nowrap">
          <div className="text-[13px] leading-tight font-bold sm:text-sm">{tag.title}</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink/60 sm:text-xs">
            <span className={clsx("size-1.5 rounded-full", DOT[tag.tone])} />
            {tag.line}
          </div>
        </div>
      </div>
    </div>
  );
}

/** สีจุดสถานะ (สีเดียวกับในแอป): ว่าง = เขียว, เช่าอยู่/จองแล้ว = ดำ, ค้างจ่าย = แดง, บอกราคา = เทา */
const DOT: Record<Tag["tone"], string> = {
  free: "bg-ok",
  busy: "bg-ink",
  late: "bg-bad",
  info: "bg-ink/30",
};
