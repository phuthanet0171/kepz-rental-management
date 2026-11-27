"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const WORDS = ["อะไร", "รถ", "เสื้อผ้า", "หอพัก", "ที่จอดรถ", "บ้าน", "ห้องเก็บของ", "คอนโด", "แผงตลาด", "เครื่องประดับ"];
const HOLD_FIRST = 2800;
const HOLD = 2000;

/**
 * คำที่สลับในหัวข้อ (อยู่ท้ายบรรทัดแรก)
 * - กรอบขาวขอบดำ ยืด/หดตามความยาวคำอย่างนุ่มนวล
 * - คำเก่าเลื่อนขึ้นออก คำใหม่เลื่อนขึ้นมาแทน แล้วคำเก่าถูกเอาออกจากหน้า (คัดลอกข้อความจะไม่ติดคำซ้อน)
 * - เส้นที่ขอบล่างในกรอบค่อยๆ เต็ม บอกว่าคำกำลังจะเปลี่ยน
 * โปรแกรมอ่านหน้าจอได้ยินประโยคเต็มครั้งเดียว (ดู sr-only ใน page)
 */
export function RotatingWord() {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [still, setStill] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const measure = useRef<HTMLSpanElement>(null);
  const hold = i === 0 ? HOLD_FIRST : HOLD;

  // วัดความกว้างของคำปัจจุบัน แล้วให้กรอบยืด/หดไปเท่านั้น
  useLayoutEffect(() => {
    const el = measure.current;
    if (!el) return;
    const fit = () => setWidth(el.getBoundingClientRect().width);
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [i]);

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

  // เอาคำเก่าออกเสมอหลังเลื่อนเสร็จ (กันกรณีภาพเคลื่อนไหวไม่ทำงาน แล้วคำซ้อนกันค้าง)
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 750);
    return () => clearTimeout(t);
  }, [prev]);

  return (
    <span aria-hidden className="hand relative inline-block font-normal select-none">
      {/* ตัววัดความกว้าง (มองไม่เห็น) */}
      <span ref={measure} className="invisible absolute top-0 left-0 w-max px-5 whitespace-nowrap">
        {WORDS[i]}
      </span>
      <span
        className="relative block overflow-hidden rounded-2xl border-[3px] border-ink bg-white leading-[1.7] shadow-[4px_4px_0_0_#1b1a17] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: width ? width + 6 : undefined }}
      >
        {/* ความสูงหนึ่งบรรทัด */}
        <span className="invisible block px-5 whitespace-nowrap">{WORDS[i]}</span>
        {prev !== null && (
          <span
            key={`out-${prev}-${i}`}
            className="word-out absolute inset-x-0 top-0 text-center whitespace-nowrap"
            onAnimationEnd={() => setPrev(null)}
          >
            {WORDS[prev]}
          </span>
        )}
        <span key={`in-${i}`} className={`absolute inset-x-0 top-0 text-center whitespace-nowrap ${prev !== null ? "word-in" : ""}`}>
          {WORDS[i]}
        </span>
        {!still && (
          <span
            key={`t-${i}`}
            className="word-timer absolute inset-x-3 bottom-1 block h-[3px] rounded-full bg-ink/80"
            style={{ ["--hold" as string]: `${hold}ms` } as CSSProperties}
          />
        )}
      </span>
    </span>
  );
}
