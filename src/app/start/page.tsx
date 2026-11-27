import type { Metadata } from "next";
import { sriracha } from "@/lib/hand-font";
import { Wizard } from "./wizard";

export const metadata: Metadata = { title: "ตั้งค่ากิจการ" };

export default function StartPage() {
  return (
    <div className={sriracha.variable}>
      <Wizard />
    </div>
  );
}
