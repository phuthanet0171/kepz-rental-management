"use client";

import clsx from "clsx";
import { ArrowLeft, Check, CloudCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type Draft, emptyDraft, loadDraft, presetGroups, saveDraft } from "@/lib/onboarding";
import { Done } from "./done";
import { Preview } from "./preview";
import { BillingStep, BranchStep, BusinessStep, UnitsStep, type Errors } from "./steps";

const STEPS = [
  { label: "กิจการ", next: "ต่อไป: สาขาแรก" },
  { label: "สาขาแรก", next: "ต่อไป: ของที่ให้เช่า" },
  { label: "ของที่ให้เช่า", next: "ต่อไป: การเก็บเงิน" },
  { label: "การเก็บเงิน", next: "เสร็จแล้ว เปิดใช้งาน" },
];

function validate(step: number, d: Draft): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!d.business.name.trim()) e["business.name"] = "ใส่ชื่อกิจการ ชื่อนี้จะขึ้นบนบิลและใบเสร็จ";
    if (!d.business.types.length) e["business.types"] = "เลือกอย่างน้อย 1 อย่าง เราจะเตรียมตัวอย่างให้ตรงกับกิจการ";
  }
  if (step === 1 && !d.branch.name.trim()) e["branch.name"] = "ใส่ชื่อสาขา ถ้ามีที่เดียวใช้ “สาขาหลัก” ได้เลย";
  if (step === 2) {
    if (!d.groups.length) e.groups = "เพิ่มของที่ให้เช่าอย่างน้อย 1 แบบ";
    const seen = new Set<string>();
    for (const g of d.groups) {
      if (!g.name.trim()) e[`g.${g.id}.name`] = "ใส่ชื่อ";
      if (!g.prefix.trim()) e[`g.${g.id}.prefix`] = "ใส่อักษรหน้ารหัส";
      else if (seen.has(g.prefix)) e[`g.${g.id}.prefix`] = "ซ้ำกับแบบอื่น เปลี่ยนเป็นอักษรอื่น";
      seen.add(g.prefix);
      if (g.count < 1) e[`g.${g.id}.count`] = "อย่างน้อย 1";
      if (!(g.price > 0)) e[`g.${g.id}.price`] = "ใส่ราคา";
    }
  }
  return e;
}

export function Wizard() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);
  const headRef = useRef<HTMLHeadingElement>(null);
  const step = draft.step;

  // โหลดร่างที่ค้างไว้ (กลับมาทำต่อจากขั้นเดิมได้)
  useEffect(() => {
    const d = loadDraft();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- อ่านร่างจาก localStorage ได้หลัง mount เท่านั้น
    if (d) setDraft(d);
    setReady(true);
  }, []);

  // บันทึกร่างอัตโนมัติทุกครั้งที่แก้
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => {
      saveDraft(draft);
      setSaved(true);
    }, 400);
    return () => clearTimeout(t);
  }, [draft, ready]);

  const update = (fn: (d: Draft) => Draft) => {
    setSaved(false);
    setDraft((d) => fn(d));
  };

  const go = (to: number) => {
    update((d) => {
      // ครั้งแรกที่ถึงขั้นของให้เช่า: ใส่ตัวอย่างตามประเภทกิจการให้ก่อน
      if (to === 2 && d.groups.length === 0) return { ...d, step: to, groups: presetGroups(d.business.types) };
      return { ...d, step: to };
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestAnimationFrame(() => headRef.current?.focus({ preventScroll: true }));
  };

  function next(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(step, draft);
    setErrors(errs);
    if (Object.keys(errs).length) {
      // พาไปที่ช่องแรกที่ต้องแก้
      requestAnimationFrame(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    go(step + 1);
  }

  if (step >= STEPS.length) return <Done draft={draft} onEdit={() => go(STEPS.length - 1)} />;

  const props = { draft, update, errors, headRef };

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/welcome" className="text-2xl font-bold tracking-tight">
            kepz<span className="text-brand-strong">.</span>
          </Link>
          <Stepper step={step} onJump={(i) => i < step && go(i)} />
          <span
            className={clsx(
              "flex items-center gap-1.5 text-sm text-muted transition-opacity",
              saved && ready ? "opacity-100" : "opacity-0",
            )}
            aria-live="polite"
          >
            <CloudCheck className="size-4" />
            <span className="max-sm:sr-only">บันทึกร่างแล้ว</span>
          </span>
        </div>
        {/* มือถือ: แถบความคืบหน้า */}
        <div className="h-1 bg-line md:hidden">
          <div className="h-full bg-ink transition-[width] duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </header>

      <form onSubmit={next} noValidate className="mx-auto max-w-6xl px-4 pt-6 pb-36 sm:px-6 sm:pt-10 lg:pb-16">
        <p className="mb-2 text-sm font-medium text-muted md:hidden">
          ขั้นที่ {step + 1} จาก {STEPS.length} · {STEPS[step].label}
        </p>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <div key={step} className={clsx("step-in min-w-0", !ready && "invisible")}>
            {step === 0 && <BusinessStep {...props} />}
            {step === 1 && <BranchStep {...props} />}
            {step === 2 && <UnitsStep {...props} />}
            {step === 3 && <BillingStep {...props} />}

            {/* ปุ่มบนคอม: อยู่ท้ายฟอร์ม */}
            <div className="mt-10 hidden items-center justify-between gap-3 lg:flex">
              <BackButton step={step} onBack={() => go(step - 1)} />
              <button type="submit" className="btn btn-primary h-12 px-6 text-base">
                {STEPS[step].next}
              </button>
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Preview draft={draft} step={step} />
            </div>
          </aside>
        </div>

        {/* ปุ่มบนมือถือ: ติดล่างจอ ใกล้นิ้ว */}
        <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-3 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-xl items-center gap-2">
            <BackButton step={step} onBack={() => go(step - 1)} compact />
            <button type="submit" className="btn btn-primary h-12 flex-1 text-base">
              {STEPS[step].next}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function BackButton({ step, onBack, compact }: { step: number; onBack: () => void; compact?: boolean }) {
  if (step === 0) return compact ? null : <span />;
  return (
    <button type="button" onClick={onBack} className={clsx("btn btn-ghost h-12", compact && "w-12 px-0")} aria-label="ย้อนกลับ">
      <ArrowLeft className="size-5" />
      {!compact && "ย้อนกลับ"}
    </button>
  );
}

/** แถบขั้นตอน (คอม/แท็บเล็ต): กดย้อนไปขั้นที่ทำแล้วได้ */
function Stepper({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <ol className="hidden items-center gap-1 md:flex" aria-label="ขั้นตอนการตั้งค่า">
      {STEPS.map((s, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <li key={s.label} className="flex items-center gap-1">
            {i > 0 && <span className={clsx("h-0.5 w-6 rounded-full", i <= step ? "bg-ink" : "bg-line")} />}
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={!done}
              aria-current={current ? "step" : undefined}
              className={clsx(
                "flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-sm font-medium transition",
                done && "hover:bg-ink/5",
                current ? "text-ink" : done ? "text-ink-2" : "text-muted",
              )}
            >
              <span
                className={clsx(
                  "grid size-6 place-items-center rounded-full text-xs font-bold",
                  done && "bg-ink text-brand",
                  current && "bg-brand text-ink ring-2 ring-ink",
                  !done && !current && "border-2 border-line text-muted",
                )}
              >
                {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
              </span>
              {s.label}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
