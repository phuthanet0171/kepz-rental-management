"use client";

import clsx from "clsx";
import {
  BedDouble,
  CarFront,
  Info,
  Minus,
  Plus,
  Shapes,
  SquareParking,
  Store,
  Tent,
  Trash2,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode, RefObject } from "react";
import {
  BUSINESS_TYPES,
  type BusinessType,
  type Draft,
  type Period,
  PERIOD_LABEL,
  type RentalGroup,
  uid,
  unitCodes,
} from "@/lib/onboarding";

export type Errors = Record<string, string>;
type StepProps = {
  draft: Draft;
  update: (fn: (d: Draft) => Draft) => void;
  errors: Errors;
  headRef: RefObject<HTMLHeadingElement | null>;
};

const TYPE_ICON: Record<BusinessType, LucideIcon> = {
  storage: Warehouse,
  dorm: BedDouble,
  parking: SquareParking,
  market: Store,
  vehicle: CarFront,
  equipment: Tent,
  other: Shapes,
};

function Head({ headRef, title, sub }: { headRef: StepProps["headRef"]; title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h1 ref={headRef} tabIndex={-1} className="text-3xl leading-tight font-bold tracking-tight outline-none sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{sub}</p>
    </div>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span role="alert" className="mt-1.5 block text-sm font-medium text-bad">
      {msg}
    </span>
  );
}

function Field({ label, hint, error, children }: { label: ReactNode; hint?: ReactNode; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label text-[15px]">{label}</span>
      {children}
      {error ? <Err msg={error} /> : hint && <span className="mt-1.5 block text-sm text-muted">{hint}</span>}
    </label>
  );
}

const Optional = () => <span className="ml-1 font-normal text-muted">(ไม่บังคับ)</span>;

/* ===== ขั้นที่ 1: กิจการ ===== */
export function BusinessStep({ draft, update, errors, headRef }: StepProps) {
  const first = draft.owner.name.trim().split(/\s+/)[0];
  const types = draft.business.types;
  const toggle = (k: BusinessType) =>
    update((d) => ({
      ...d,
      business: {
        ...d.business,
        types: d.business.types.includes(k) ? d.business.types.filter((t) => t !== k) : [...d.business.types, k],
      },
    }));

  return (
    <>
      <Head
        headRef={headRef}
        title={first ? `สวัสดีคุณ${first} มาเริ่มจากกิจการของคุณ` : "มาเริ่มจากกิจการของคุณ"}
        sub="ข้อมูลนี้ขึ้นบนบิลและใบเสร็จที่ส่งให้ผู้เช่า แก้ทีหลังได้ทุกเมื่อในหน้าตั้งค่า"
      />
      <div className="space-y-8">
        <Field label="ชื่อกิจการ" hint="เช่น ชื่อหอ ชื่อร้าน หรือชื่อตลาด" error={errors["business.name"]}>
          <input
            value={draft.business.name}
            onChange={(e) => update((d) => ({ ...d, business: { ...d.business, name: e.target.value } }))}
            aria-invalid={Boolean(errors["business.name"]) || undefined}
            autoFocus
            maxLength={80}
            className="input h-13 text-lg sm:text-lg"
            placeholder="เช่น หอพักบ้านสุขใจ"
          />
        </Field>

        <fieldset>
          <legend className="label text-[15px]">
            ให้เช่าอะไรบ้าง <span className="font-normal text-muted">เลือกได้มากกว่า 1</span>
          </legend>
          <div
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
            aria-invalid={Boolean(errors["business.types"]) || undefined}
            tabIndex={errors["business.types"] ? -1 : undefined}
          >
            {BUSINESS_TYPES.map(({ key, label, hint }) => {
              const Icon = TYPE_ICON[key];
              const on = types.includes(key);
              return (
                <label
                  key={key}
                  className={clsx(
                    "relative flex cursor-pointer flex-col gap-2 rounded-2xl border-2 bg-white p-3.5 transition select-none has-focus-visible:ring-2 has-focus-visible:ring-brand",
                    on ? "border-ink shadow-[3px_3px_0_0_var(--color-ink)]" : "border-line hover:border-ink/30",
                  )}
                >
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(key)} />
                  <span
                    className={clsx(
                      "grid size-10 place-items-center rounded-xl transition",
                      on ? "bg-brand" : "bg-canvas text-ink-2",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{label}</span>
                    <span className="block text-sm leading-snug text-muted">{hint}</span>
                  </span>
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute top-3 right-3 size-5 rounded-full border-2 transition",
                      on ? "border-ink bg-ink" : "border-line",
                    )}
                  >
                    {on && <span className="absolute inset-1 rounded-full bg-brand" />}
                  </span>
                </label>
              );
            })}
          </div>
          <Err msg={errors["business.types"]} />
        </fieldset>

        <Field label={<>เบอร์โทรของกิจการ<Optional /></>} hint="ขึ้นบนบิล ให้ผู้เช่าโทรหาได้">
          <input
            value={draft.business.phone}
            onChange={(e) => update((d) => ({ ...d, business: { ...d.business, phone: e.target.value } }))}
            inputMode="tel"
            autoComplete="tel"
            className="input h-12 sm:max-w-xs"
            placeholder="08x-xxx-xxxx"
          />
        </Field>
      </div>
    </>
  );
}

/* ===== ขั้นที่ 2: สาขาแรก ===== */
export function BranchStep({ draft, update, errors, headRef }: StepProps) {
  return (
    <>
      <Head
        headRef={headRef}
        title="สาขาแรกของคุณ"
        sub="ถ้ามีที่เดียว ใช้ชื่อ “สาขาหลัก” ได้เลย มีหลายสาขาค่อยเพิ่มทีหลัง ทุกสาขาดูรวมกันได้ในหน้าภาพรวม"
      />
      <div className="space-y-8">
        <Field label="ชื่อสาขา" error={errors["branch.name"]}>
          <input
            value={draft.branch.name}
            onChange={(e) => update((d) => ({ ...d, branch: { ...d.branch, name: e.target.value } }))}
            aria-invalid={Boolean(errors["branch.name"]) || undefined}
            autoFocus
            maxLength={60}
            className="input h-13 text-lg sm:text-lg"
            placeholder="เช่น สาขาบางนา"
          />
        </Field>
        <Field label={<>ที่อยู่<Optional /></>} hint="ขึ้นบนใบเสร็จ และช่วยให้ผู้เช่าหาเจอ">
          <textarea
            value={draft.branch.address}
            onChange={(e) => update((d) => ({ ...d, branch: { ...d.branch, address: e.target.value } }))}
            rows={3}
            autoComplete="street-address"
            className="input"
            placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด"
          />
        </Field>
        <div className="flex gap-3 rounded-2xl bg-info-soft px-4 py-3.5 text-[15px] text-info">
          <Info className="mt-0.5 size-5 shrink-0" />
          <p>
            มีหลายสาขา? ตั้งสาขาแรกให้เสร็จก่อน แล้วไปที่เมนู <b>สาขา</b> เพื่อเพิ่มสาขาอื่น แต่ละสาขาตั้งราคาของตัวเองได้
          </p>
        </div>
      </div>
    </>
  );
}

/* ===== ขั้นที่ 3: ของที่ให้เช่า ===== */
export function UnitsStep({ draft, update, errors, headRef }: StepProps) {
  const setGroup = (id: string, patch: Partial<RentalGroup>) =>
    update((d) => ({ ...d, groups: d.groups.map((g) => (g.id === id ? { ...g, ...patch } : g)) }));
  const remove = (id: string) => update((d) => ({ ...d, groups: d.groups.filter((g) => g.id !== id) }));
  const add = () =>
    update((d) => {
      const used = new Set(d.groups.map((g) => g.prefix));
      const prefix = "ABCDEFGHJKLMNPQRSTUVWXYZ".split("").find((c) => !used.has(c)) ?? "X";
      return {
        ...d,
        groups: [...d.groups, { id: uid(), name: "", prefix, count: 1, price: 0, period: d.groups[0]?.period ?? "month", size: "" }],
      };
    });

  return (
    <>
      <Head
        headRef={headRef}
        title="มีอะไรให้เช่า กี่ช่อง ราคาเท่าไร"
        sub="เราใส่ตัวอย่างตามประเภทกิจการไว้ให้แล้ว แก้ชื่อ จำนวน และราคาให้ตรงกับของจริง ของแบบเดียวกันราคาเท่ากันรวมเป็นแบบเดียว"
      />
      <div className="space-y-4">
        {draft.groups.map((g) => (
          <GroupCard
            key={g.id}
            g={g}
            errors={errors}
            onChange={(p) => setGroup(g.id, p)}
            onRemove={draft.groups.length > 1 ? () => remove(g.id) : undefined}
          />
        ))}
        <Err msg={errors.groups} />
        <button
          type="button"
          onClick={add}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/25 py-4 font-semibold text-ink-2 transition hover:border-ink hover:bg-white hover:text-ink"
        >
          <Plus className="size-5" /> เพิ่มของให้เช่าอีกแบบ
        </button>
      </div>
    </>
  );
}

function GroupCard({
  g,
  errors,
  onChange,
  onRemove,
}: {
  g: RentalGroup;
  errors: Errors;
  onChange: (p: Partial<RentalGroup>) => void;
  onRemove?: () => void;
}) {
  const e = (k: string) => errors[`g.${g.id}.${k}`];
  const codes = unitCodes(g);
  return (
    <div className="rounded-3xl border border-line bg-white p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <input
            value={g.name}
            onChange={(ev) => onChange({ name: ev.target.value })}
            aria-label="ชื่อของที่ให้เช่า"
            aria-invalid={Boolean(e("name")) || undefined}
            placeholder="ชื่อ เช่น ห้องแอร์"
            maxLength={40}
            className="w-full rounded-lg bg-transparent px-1 py-1 text-xl font-bold outline-none placeholder:font-normal placeholder:text-muted/70 focus:bg-canvas"
          />
          <Err msg={e("name")} />
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="grid size-10 shrink-0 place-items-center rounded-xl text-muted transition hover:bg-bad-soft hover:text-bad"
            aria-label={`ลบ ${g.name || "แบบนี้"}`}
          >
            <Trash2 className="size-5" />
          </button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-[7rem_10rem_minmax(0,1fr)]">
        <div>
          <span className="mb-1.5 block text-sm text-muted">จำนวน</span>
          <div className="flex h-12 items-center rounded-xl border border-line">
            <button
              type="button"
              onClick={() => onChange({ count: Math.max(1, g.count - 1) })}
              className="grid h-full w-10 place-items-center text-ink-2 hover:text-ink"
              aria-label="ลดจำนวน"
            >
              <Minus className="size-4" />
            </button>
            <input
              value={g.count}
              onChange={(ev) => onChange({ count: Math.min(500, Math.max(0, Math.floor(Number(ev.target.value) || 0))) })}
              inputMode="numeric"
              aria-label="จำนวน"
              aria-invalid={Boolean(e("count")) || undefined}
              className="tabular h-full min-w-0 flex-1 bg-transparent text-center text-lg font-semibold outline-none"
            />
            <button
              type="button"
              onClick={() => onChange({ count: Math.min(500, g.count + 1) })}
              className="grid h-full w-10 place-items-center text-ink-2 hover:text-ink"
              aria-label="เพิ่มจำนวน"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">ราคา</span>
          <span className="relative block">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 grid place-items-center text-muted">฿</span>
            <input
              value={g.price || ""}
              onChange={(ev) => onChange({ price: Math.max(0, Number(ev.target.value.replace(/[^\d.]/g, "")) || 0) })}
              inputMode="decimal"
              aria-invalid={Boolean(e("price")) || undefined}
              placeholder="0"
              className="input tabular h-12 pl-8 text-lg font-semibold"
            />
          </span>
          <Err msg={e("price")} />
        </label>
        <div className="col-span-2 sm:col-span-1">
          <span className="mb-1.5 block text-sm text-muted">คิดราคา</span>
          <div className="grid h-12 grid-cols-3 rounded-xl bg-canvas p-1" role="radiogroup" aria-label="คิดราคา">
            {(Object.keys(PERIOD_LABEL) as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={g.period === p}
                onClick={() => onChange({ period: p })}
                className={clsx(
                  "rounded-lg text-sm font-semibold transition",
                  g.period === p ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink",
                )}
              >
                {PERIOD_LABEL[p]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <details className="group mt-3">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-muted select-none hover:text-ink">
          <span className="flex flex-wrap items-center gap-x-1.5">
            รหัส
            <b className="tabular font-semibold text-ink">
              {codes[0]}
              {codes.length > 1 && ` ถึง ${codes[codes.length - 1]}`}
            </b>
            {g.size && <span>· {g.size}</span>}
          </span>
          <span className="underline underline-offset-2">แก้รหัสและขนาด</span>
        </summary>
        <div className="mt-3 grid grid-cols-[6rem_minmax(0,1fr)] gap-3">
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">อักษรหน้ารหัส</span>
            <input
              value={g.prefix}
              onChange={(ev) => onChange({ prefix: ev.target.value.toUpperCase().replace(/[^A-Z0-9ก-๙]/g, "").slice(0, 4) })}
              aria-invalid={Boolean(e("prefix")) || undefined}
              className="input h-12 text-center font-semibold uppercase"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">
              ขนาด / รายละเอียด<Optional />
            </span>
            <input
              value={g.size}
              onChange={(ev) => onChange({ size: ev.target.value })}
              maxLength={60}
              className="input h-12"
              placeholder="เช่น 2 × 2 ม."
            />
          </label>
        </div>
      </details>
      <Err msg={e("prefix") || e("count")} />

      {/* มือถือ: เห็นช่องที่จะสร้างทันที */}
      <div className="mt-4 flex flex-wrap gap-1 lg:hidden" aria-hidden>
        {codes.slice(0, 24).map((c, i) => (
          <span
            key={c}
            className="unit-pop rounded-md border-2 border-ok bg-ok-soft px-1.5 py-0.5 text-[11px] font-bold"
            style={{ ["--i" as string]: i }}
          >
            {c}
          </span>
        ))}
        {codes.length > 24 && <span className="px-1 text-xs text-muted">+{codes.length - 24}</span>}
      </div>
    </div>
  );
}

/* ===== ขั้นที่ 4: การเก็บเงิน ===== */
export function BillingStep({ draft, update, headRef }: StepProps) {
  const b = draft.billing;
  const set = (patch: Partial<Draft["billing"]>) => update((d) => ({ ...d, billing: { ...d.billing, ...patch } }));
  const fixed = b.billDay !== "start";

  return (
    <>
      <Head
        headRef={headRef}
        title="เก็บค่าเช่าแบบไหน"
        sub="ตั้งครั้งเดียว Kepz ใช้กับทุกสัญญาใหม่ให้อัตโนมัติ ถ้าผู้เช่าคนไหนต่างออกไป ปรับเป็นรายคนได้ตอนทำสัญญา"
      />
      <div className="space-y-9">
        <fieldset>
          <legend className="label text-[15px]">ออกบิลเมื่อไร</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Choice on={fixed} onSelect={() => set({ billDay: typeof b.billDay === "number" ? b.billDay : 1 })} title="วันเดียวกันทุกคน" desc="ออกบิลพร้อมกันทุกห้อง ทำงานรวบเดียวจบ">
              <span className="mt-2 flex items-center gap-2 text-sm">
                ทุกวันที่
                <select
                  value={typeof b.billDay === "number" ? b.billDay : 1}
                  onChange={(e) => set({ billDay: Number(e.target.value) })}
                  onClick={(e) => e.stopPropagation()}
                  disabled={!fixed}
                  className="input h-10 w-20 py-0"
                  aria-label="วันที่ออกบิล"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                ของเดือน
              </span>
            </Choice>
            <Choice on={!fixed} onSelect={() => set({ billDay: "start" })} title="ตามวันเริ่มสัญญา" desc="แต่ละคนถึงรอบไม่พร้อมกัน เช่น เริ่มเช่าวันที่ 15 ก็ออกบิลทุกวันที่ 15" />
          </div>
        </fieldset>

        <Chips label="ให้ผู้เช่าจ่ายภายใน" hint="นับจากวันที่ออกบิล เลยกำหนดแล้ว Kepz จะเตือนให้" value={b.dueDays} options={[3, 5, 7, 15]} unit="วัน" onChange={(v) => set({ dueDays: v })} />

        <Chips
          label="เก็บเงินประกัน"
          hint="เก็บตอนทำสัญญา และ Kepz แยกออกจากรายได้ให้ เพราะต้องคืนตอนย้ายออก"
          value={b.depositMonths}
          options={[0, 1, 2, 3]}
          unit="เดือน"
          zero="ไม่เก็บ"
          onChange={(v) => set({ depositMonths: v })}
        />

        <fieldset className="space-y-4">
          <legend className="label text-[15px]">
            ช่องทางรับเงิน<Optional />
          </legend>
          <p className="-mt-2 text-sm text-muted">ขึ้นบนบิลให้ผู้เช่าโอนได้ถูกบัญชี</p>
          <Field label="พร้อมเพย์">
            <input
              value={b.promptpay}
              onChange={(e) => set({ promptpay: e.target.value })}
              inputMode="numeric"
              className="input h-12 sm:max-w-xs"
              placeholder="เบอร์มือถือ หรือเลขบัตรประชาชน"
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="ธนาคาร">
              <input value={b.bank} onChange={(e) => set({ bank: e.target.value })} className="input h-12" placeholder="เช่น กสิกรไทย" />
            </Field>
            <Field label="เลขบัญชี">
              <input value={b.bankAccount} onChange={(e) => set({ bankAccount: e.target.value })} inputMode="numeric" className="input tabular h-12" placeholder="xxx-x-xxxxx-x" />
            </Field>
          </div>
        </fieldset>

        <details className="rounded-2xl border border-line bg-white px-4 py-3">
          <summary className="cursor-pointer font-medium select-none">ออกใบกำกับภาษี / หักภาษี ณ ที่จ่าย</summary>
          <div className="mt-3">
            <Field label="เลขประจำตัวผู้เสียภาษี" hint="ใส่เมื่อต้องออกใบกำกับภาษี ไม่มีก็ข้ามได้">
              <input
                value={b.taxId}
                onChange={(e) => set({ taxId: e.target.value.replace(/\D/g, "").slice(0, 13) })}
                inputMode="numeric"
                className="input tabular h-12 sm:max-w-xs"
                placeholder="13 หลัก"
              />
            </Field>
          </div>
        </details>
      </div>
    </>
  );
}

function Choice({
  on,
  onSelect,
  title,
  desc,
  children,
}: {
  on: boolean;
  onSelect: () => void;
  title: string;
  desc: string;
  children?: ReactNode;
}) {
  return (
    <div
      role="radio"
      aria-checked={on}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && (e.preventDefault(), onSelect())}
      className={clsx(
        "cursor-pointer rounded-2xl border-2 bg-white p-4 transition outline-none focus-visible:ring-2 focus-visible:ring-brand",
        on ? "border-ink shadow-[3px_3px_0_0_var(--color-ink)]" : "border-line hover:border-ink/30",
      )}
    >
      <span className="flex items-center gap-2.5">
        <span className={clsx("grid size-5 place-items-center rounded-full border-2", on ? "border-ink" : "border-line")}>
          {on && <span className="size-2.5 rounded-full bg-ink" />}
        </span>
        <span className="font-semibold">{title}</span>
      </span>
      <span className="mt-1.5 block pl-7.5 text-sm leading-snug text-muted">{desc}</span>
      {children && <span className="block pl-7.5">{children}</span>}
    </div>
  );
}

function Chips({
  label,
  hint,
  value,
  options,
  unit,
  zero,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  options: number[];
  unit: string;
  zero?: string;
  onChange: (v: number) => void;
}) {
  return (
    <fieldset>
      <legend className="label text-[15px]">{label}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={value === o}
            onClick={() => onChange(o)}
            className={clsx(
              "h-11 min-w-[4.5rem] rounded-full border-2 px-4 font-semibold transition",
              value === o ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-2 hover:border-ink/30",
            )}
          >
            {o === 0 && zero ? zero : `${o} ${unit}`}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted">{hint}</p>
    </fieldset>
  );
}
