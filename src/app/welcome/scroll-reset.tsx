"use client";

import { useEffect } from "react";

/**
 * เปิดหน้าแรกเมื่อไร (รีเฟรช กดย้อนกลับ หรือกลับมาจากหน้าอื่น) ให้เริ่มที่ส่วนบนสุดเสมอ
 * - ไม่ให้เบราว์เซอร์จำตำแหน่งเลื่อนเดิม
 * - ลบ #ส่วน ออกจากที่อยู่เว็บ ไม่งั้นรีเฟรชแล้วจะกระโดดไปส่วนนั้น
 * - กดย้อนกลับแล้วเบราว์เซอร์ดึงหน้าเก่าจากหน่วยความจำ (bfcache) ก็กลับขึ้นบนเหมือนกัน
 */
export function ScrollReset() {
  useEffect(() => {
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    toTop();
    // บางเบราว์เซอร์เลื่อนคืนตำแหน่งเดิมหลังโหลดเสร็จ: ดันกลับขึ้นอีกครั้งในเฟรมถัดไป
    const raf = requestAnimationFrame(toTop);
    const onShow = (e: PageTransitionEvent) => e.persisted && toTop();
    window.addEventListener("pageshow", onShow);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pageshow", onShow);
    };
  }, []);
  return null;
}
