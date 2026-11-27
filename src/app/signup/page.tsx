import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = { title: "สมัครใช้งาน" };

const STEPS = ["สร้างบัญชี", "บอกชื่อกิจการ", "ตั้งสาขาแรก", "ใส่ของที่ให้เช่าและราคา", "เลือกวิธีเก็บเงิน"];

export default function SignupPage() {
  return (
    <AuthShell
      tag={
        <>
          <p className="hand text-xl text-brand">ตั้งค่าเสร็จได้ในไม่กี่นาที</p>
          <ol className="mt-5 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-lg">
                <span
                  className={
                    i === 0
                      ? "grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-ink"
                      : "grid size-8 shrink-0 place-items-center rounded-full border-2 border-white/25 text-sm font-semibold text-white/70"
                  }
                >
                  {i + 1}
                </span>
                <span className={i === 0 ? "font-semibold" : "text-white/75"}>{s}</span>
              </li>
            ))}
          </ol>
        </>
      }
    >
      <h1 className="text-3xl font-bold tracking-tight">สมัครใช้งาน Kepz</h1>
      <p className="mt-2 mb-7 text-[17px] leading-relaxed text-muted">
        สร้างบัญชีเจ้าของกิจการ แล้วเราจะพาตั้งค่าทีละขั้น
      </p>
      <SignupForm />
      <p className="mt-8 text-center text-[15px] text-muted">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/login" className="-my-2 inline-block py-2 font-semibold text-ink underline decoration-2 underline-offset-4">
          เข้าสู่ระบบ
        </Link>
      </p>
    </AuthShell>
  );
}
