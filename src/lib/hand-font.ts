import { Sriracha } from "next/font/google";

/** ลายมือเขียนโน้ต ใช้เฉพาะคำอธิบายที่ชี้ไปบนหน้าจอ (หน้าแรกและหน้าเริ่มต้นใช้งาน) */
export const sriracha = Sriracha({
  variable: "--font-hand",
  subsets: ["thai", "latin"],
  weight: "400",
  display: "swap",
});
