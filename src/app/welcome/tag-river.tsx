"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ArtKey } from "./rental-art";

type Tag = { title: string; line: string; tone: "paper" | "ink" | "brand" | "gray"; art: ArtKey };

const ROW_A: Tag[] = [
  { title: "ห้อง S-02", line: "ว่าง · ฿1,600/เดือน", tone: "brand", art: "storage" },
  { title: "แผง A12", line: "เสาร์–อาทิตย์ ฿250/วัน", tone: "ink", art: "stall" },
  { title: "Yaris กข 1234", line: "คืนวันนี้ 18:00", tone: "paper", art: "car" },
  { title: "ที่จอด P-03", line: "รายเดือน ฿990", tone: "gray", art: "parking" },
  { title: "ชุดราตรีแดง M", line: "จองแล้ว 14–16 ธ.ค.", tone: "brand", art: "dress" },
  { title: "เต็นท์ 3×3 ม.", line: "ว่าง 12 จาก 20 หลัง", tone: "ink", art: "tent" },
];
const ROW_B: Tag[] = [
  { title: "กล้อง A7 IV", line: "฿900/วัน + ประกัน ฿5,000", tone: "gray", art: "camera" },
  { title: "ห้องเช่า 4B", line: "ค้างจ่าย 5 วัน", tone: "paper", art: "dorm" },
  { title: "โกดัง 2", line: "ว่าง · 40 ตร.ม.", tone: "ink", art: "warehouse" },
  { title: "จักรยาน #07", line: "รายชั่วโมง ฿40", tone: "brand", art: "bike" },
  { title: "โต๊ะจัดเลี้ยง", line: "ว่าง 64 จาก 100 ตัว", tone: "gray", art: "table" },
  { title: "ห้องประชุม B", line: "จอง 13:00–15:00", tone: "paper", art: "meeting" },
];

/** ป้ายเช่าไหลผ่านจอเป็นแนวโค้ง: โค้งเข้ามาจากขอบ แบนราบตรงกลาง แล้วจางหายอีกฝั่ง */
export function TagRiver() {
  return (
    <section aria-label="ตัวอย่างสิ่งที่จัดการได้บน Kepz" className="-mt-12 overflow-hidden pb-4">
      <TagRow tags={ROW_A} speed={34} />
      <TagRow tags={ROW_B} speed={-28} />
      <p className="mt-3 px-5 text-center text-[15px] text-ink/55">ตัวอย่างของให้เช่าที่ดูแลบน Kepz ได้ ทั้งรายเดือน รายวัน และรายชั่วโมง</p>
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
    <div ref={rowRef} className="tag-row py-4">
      <div ref={trackRef} className="tag-track">
        {[...tags, ...tags].map((t, i) => (
          <RentTag key={i} tag={t} tilt={((i * 37) % 7) - 3} hidden={i >= tags.length} />
        ))}
      </div>
    </div>
  );
}

function RentTag({ tag, tilt, hidden }: { tag: Tag; tilt: number; hidden: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="tag-item shrink-0">
      <div
        className={clsx(
          "relative flex items-center gap-3.5 rounded-[18px] py-3 pr-6 pl-8 sm:gap-4 sm:py-3.5 sm:pr-7 sm:pl-10 shadow-[0_10px_24px_-14px_rgb(22_21_19/0.45)]",
          tag.tone === "paper" && "bg-white text-ink",
          tag.tone === "ink" && "bg-ink text-white",
          tag.tone === "brand" && "bg-brand text-ink ring-2 ring-ink",
          tag.tone === "gray" && "bg-[#e6e4de] text-ink",
        )}
        style={{ rotate: `${tilt * 0.6}deg` }}
      >
        {/* รูร้อยเชือกของป้าย */}
        <span
          aria-hidden
          className={clsx(
            "absolute top-1/2 left-3.5 size-2.5 -translate-y-1/2 rounded-full ring-2",
            tag.tone === "ink" ? "bg-ink ring-white/40" : "bg-white ring-ink/15",
          )}
        />
        <Image
          src={`/rentals/${tag.art}.webp`}
          alt=""
          width={64}
          height={64}
          draggable={false}
          loading="eager"
          unoptimized
          className="size-14 shrink-0 rounded-xl object-cover ring-1 ring-black/10 sm:size-16"
        />
        <div className="whitespace-nowrap">
          <div className="text-base leading-tight font-bold sm:text-lg">{tag.title}</div>
          <div className={clsx("text-sm", tag.tone === "ink" ? "text-white/65" : "opacity-70")}>{tag.line}</div>
        </div>
      </div>
    </div>
  );
}
