"use client";

import { ActionForm, SubmitButton } from "@/components/ui/client";
import { signIn } from "./actions";

export function LoginForm({ next }: { next: string }) {
  return (
    <ActionForm action={signIn}>
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="label">อีเมล</span>
        <input name="email" type="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} required className="input h-12" inputMode="email" />
      </label>
      <label className="block">
        <span className="label">รหัสผ่าน</span>
        <input name="password" type="password" autoComplete="current-password" autoCapitalize="none" autoCorrect="off" spellCheck={false} required className="input h-12" />
      </label>
      <SubmitButton className="btn btn-primary h-13 w-full text-base" pendingText="กำลังเข้าสู่ระบบ…">
        เข้าสู่ระบบ
      </SubmitButton>
    </ActionForm>
  );
}
