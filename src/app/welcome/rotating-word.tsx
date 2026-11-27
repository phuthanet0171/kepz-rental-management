"use client";

import { useEffect, useState, type CSSProperties } from "react";

const WORDS = ["อะไร", "รถ", "เสื้อผ้า", "หอพัก", "ที่จอดรถ", "บ้าน", "ห้องเก็บของ", "คอนโด", "แผงตลาด", "เครื่องประดับ"];
const HOLD_FIRST = 2800;
const HOLD = 2000;

/**
 * คำที่สลับในหัวข้อ: กรอบขาวขอบดำอยู่นิ่ง มีแต่คำข้างในที่หมุนขึ้น (คำเก่าออก คำใหม่เข้า)
 * บรรทัดสูงพอให้สระบน/วรรณยุกต์ไม่ถูกตัด · แถบเล็กใต้กรอบค่อยๆ เต็ม บอกว่าคำกำลังจะเปลี่ยน
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
      <span className="hand relative inline-grid overflow-hidden rounded-2xl border-[3px] border-ink bg-white px-6 leading-[1.75] shadow-[4px_4px_0_0_#1b1a17]">
        {/* จองความกว้างไว้เท่าคำที่ยาวที่สุด กรอบจะได้ไม่ยืดหด */}
        <span className="invisible col-start-1 row-start-1 whitespace-nowrap">เครื่องประดับ</span>
        {prev !== null && (
          <span key={`out-${prev}-${i}`} className="word-out col-start-1 row-start-1 text-center whitespace-nowrap">
            {WORDS[prev]}
          </span>
        )}
        <span
          key={`in-${i}`}
          className={`col-start-1 row-start-1 text-center whitespace-nowrap ${prev !== null ? "word-in" : ""}`}
        >
          {WORDS[i]}
        </span>
      </span>
      {!still && (
        <span className="mt-3 h-1 w-14 overflow-hidden rounded-full bg-ink/15">
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
