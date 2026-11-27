import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth-shell";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "เข้าสู่ระบบ" };

async function Form({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/";
  return (
    <>
      {sp.inactive === "1" && (
        <p className="mb-5 rounded-xl bg-warn-soft px-3.5 py-2.5 text-sm text-warn">
          ออกจากระบบแล้ว เพราะบัญชีนี้ถูกปิดการใช้งานหรือไม่มีสิทธิ์เข้าใช้ระบบแล้ว กรุณาติดต่อเจ้าของกิจการ
        </p>
      )}
      <LoginForm next={next} />
    </>
  );
}

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <AuthShell
      tag={
        <>
          <p className="hand text-xl text-brand">ยินดีต้อนรับกลับมา</p>
          <p className="mt-4 text-3xl leading-snug font-bold">
            วันนี้มีบิลถึงรอบ
            <br />
            และห้องว่างรออยู่
          </p>
          <p className="mt-4 text-white/65">เข้าระบบแล้วจะเห็นงานที่ต้องทำวันนี้ที่หน้าแรกทันที</p>
        </>
      }
    >
      <h1 className="text-3xl font-bold tracking-tight">เข้าสู่ระบบ</h1>
      <p className="mt-2 mb-7 text-[17px] leading-relaxed text-muted">
        เจ้าของกิจการใช้อีเมลที่สมัครไว้ พนักงานใช้บัญชีที่เจ้าของสร้างให้
      </p>
      <Suspense>
        <Form searchParams={searchParams} />
      </Suspense>
      <p className="mt-8 text-center text-[15px] text-muted">
        ยังไม่มีบัญชี?{" "}
        <Link href="/signup" className="-my-2 inline-block py-2 font-semibold text-ink underline decoration-2 underline-offset-4">
          สมัครใช้งาน
        </Link>
      </p>
    </AuthShell>
  );
}
