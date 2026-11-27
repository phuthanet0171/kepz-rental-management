"use client";

import clsx from "clsx";
import { Check, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { emptyDraft, loadDraft, saveDraft } from "@/lib/onboarding";

/**
 * ต้นแบบหน้าสมัคร: ยังไม่สร้างบัญชีจริง เก็บแค่ชื่อและอีเมลไว้ในร่าง (ไม่เก็บรหัสผ่าน) แล้วพาไปตั้งค่ากิจการ
 */
export function SignupForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [tried, setTried] = useState(false);
  const [pending, setPending] = useState(false);

  const longEnough = password.length >= 8;
  const hasNumber = /\d/.test(password);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTried(true);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    if (!name || !email || !longEnough || !hasNumber) return;
    setPending(true);
    const draft = loadDraft() ?? emptyDraft();
    saveDraft({ ...draft, owner: { name, email } });
    router.push("/start");
  }

  const pwBad = tried && (!longEnough || !hasNumber);

  return (
    <form onSubmit={submit} noValidate={false} className="space-y-5">
      <label className="block">
        <span className="label">ชื่อของคุณ</span>
        <input name="name" required autoComplete="name" className="input h-12" placeholder="เช่น สมชาย ใจดี" />
      </label>
      <label className="block">
        <span className="label">อีเมล</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          spellCheck={false}
          className="input h-12"
          placeholder="you@example.com"
        />
        <span className="mt-1.5 block text-sm text-muted">ใช้เข้าสู่ระบบ และรับใบเสร็จค่าบริการ</span>
      </label>
      <div>
        <label htmlFor="password" className="label">
          ตั้งรหัสผ่าน
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={pwBad || undefined}
            aria-describedby="pw-rules"
            className="input h-12 pr-12"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted hover:text-ink"
            aria-label={show ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
          >
            {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        <ul id="pw-rules" className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Rule ok={longEnough} bad={tried}>
            อย่างน้อย 8 ตัว
          </Rule>
          <Rule ok={hasNumber} bad={tried}>
            มีตัวเลขอย่างน้อย 1 ตัว
          </Rule>
        </ul>
      </div>
      <button type="submit" className="btn btn-primary h-13 w-full text-base" disabled={pending}>
        {pending ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-white/25 border-t-brand" />
            กำลังสร้างบัญชี…
          </>
        ) : (
          "สร้างบัญชีและเริ่มตั้งค่า"
        )}
      </button>
    </form>
  );
}

function Rule({ ok, bad, children }: { ok: boolean; bad: boolean; children: React.ReactNode }) {
  return (
    <li className={clsx("flex items-center gap-1.5 transition-colors", ok ? "text-ok" : bad ? "text-bad" : "text-muted")}>
      <span
        className={clsx(
          "grid size-4 place-items-center rounded-full border-2 transition",
          ok ? "border-ok bg-ok text-white" : "border-current",
        )}
      >
        {ok && <Check className="size-2.5" strokeWidth={4} />}
      </span>
      {children}
    </li>
  );
}
