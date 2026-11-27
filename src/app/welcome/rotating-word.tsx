"use client";

import { useEffect, useState } from "react";

const WORDS = ["อะไร", "รถ", "เสื้อผ้า", "หอพัก", "ที่จอดรถ", "บ้าน", "ห้องเก็บของ", "คอนโด", "แผงตลาด", "เครื่องประดับ"];

/**
 * คำที่สลับไปเรื่อยๆ ในหัวข้อ: "อะไร" ค้างนานกว่าคำอื่นเพราะเป็นคำหลักของแบรนด์
 * โปรแกรมอ่านหน้าจอได้ยินประโยคเต็มครั้งเดียว (ดู sr-only ใน page) ไม่ได้ยินคำที่สลับ
 */
export function RotatingWord() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % WORDS.length), i === 0 ? 2600 : 1500);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <span aria-hidden className="relative inline-grid place-items-center">
      {/* จองความกว้างไว้เท่าคำที่ยาวที่สุด บรรทัดจะได้ไม่กระตุก */}
      <span className="invisible col-start-1 row-start-1 px-5">เครื่องประดับ</span>
      <span className="col-start-1 row-start-1 px-1 py-2">
        <span
          key={i}
          className="word-in hand inline-block -rotate-2 rounded-2xl bg-ink px-5 pt-1 pb-2 leading-[1.15] text-brand shadow-[4px_4px_0_0_#ffffff]"
        >
          {WORDS[i]}
        </span>
      </span>
    </span>
  );
}
