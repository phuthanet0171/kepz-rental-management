"use client";

import { useEffect, useState, type CSSProperties } from "react";

const WORDS = ["อะไร", "รถ", "เสื้อผ้า", "หอพัก", "ที่จอดรถ", "บ้าน", "ห้องเก็บของ", "คอนโด", "แผงตลาด", "เครื่องประดับ"];
const HOLD_FIRST = 2800;
const HOLD = 2000;

/**
 * คำที่สลับในหัวข้อ: หมุนขึ้นแบบป้ายพลิก (คำเก่าเลื่อนขึ้นออก คำใหม่เลื่อนขึ้นมาแทน)
 * แถบเล็กใต้คำค่อยๆ เต็ม บอกผู้ใช้ว่าอีกเดี๋ยวคำจะเปลี่ยน
 * โปรแกรมอ่านหน้าจอได้ยินประโยคเต็มครั้งเดียว (ดู sr-only ใน page)
 */
export function RotatingWord() {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [still, setStill] = useState(false);
  const hold = i === 0 ? HOLD_FIRST : HOLD;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- อ่านค่าที่ผู้ใช้ตั้งไว้ได้หลัง mount เท่านั้น
      setStill(true);
      return;
    }
    const t = setTimeout(() => {
      setPrev(i);
      setI((n) => (n + 1) % WORDS.length);
    }, hold);
    return () => clearTimeout(t);
  }, [i, hold]);

  return (
    <span aria-hidden className="inline-flex flex-col items-center">
      <span className="relative inline-grid overflow-hidden px-2 pt-1 pb-3">
        {/* จองความกว้างไว้เท่าคำที่ยาวที่สุด บรรทัดจะได้ไม่ขยับ */}
        <Chip className="invisible">เครื่องประดับ</Chip>
        {prev !== null && (
          <Chip key={`out-${prev}-${i}`} className="word-out absolute inset-x-2 top-1">
            {WORDS[prev]}
          </Chip>
        )}
        <Chip key={`in-${i}`} className={prev !== null ? "word-in absolute inset-x-2 top-1" : "absolute inset-x-2 top-1"}>
          {WORDS[i]}
        </Chip>
      </span>
      {!still && (
        <span className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-ink/15">
          <span
            key={i}
            className="word-timer block h-full rounded-full bg-ink"
            style={{ ["--hold" as string]: `${hold}ms` } as CSSProperties}
          />
        </span>
      )}
    </span>
  );
}

function Chip({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={`hand col-start-1 row-start-1 block rounded-2xl bg-ink px-5 pt-0.5 pb-1.5 text-center leading-[1.2] whitespace-nowrap text-brand shadow-[3px_3px_0_0_#ffffff] ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
