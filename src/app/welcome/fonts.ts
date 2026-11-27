import { Anuphan, Sriracha } from "next/font/google";

/** หัวข้อและเนื้อหาหน้าแรก: ตัวไทยไม่มีหัว อ่านง่าย น้ำหนักหนาได้ดี */
export const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** ลายมือเขียนโน้ต ใช้เฉพาะคำอธิบายที่ชี้ไปบนหน้าจอ */
export const sriracha = Sriracha({
  variable: "--font-hand",
  subsets: ["thai", "latin"],
  weight: "400",
  display: "swap",
});
