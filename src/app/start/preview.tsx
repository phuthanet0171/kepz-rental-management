"use client";

import clsx from "clsx";
import { MapPin } from "lucide-react";
import { BUSINESS_TYPES, type Draft, money, PERIOD_LABEL, unitCodes } from "@/lib/onboarding";

const MAX_TILES = 40;

/** ตัวอย่างสดด้านข้าง: ขั้น 1–3 เป็นป้ายกิจการ ขั้น 4 เป็นบิลตัวอย่างที่ผู้เช่าจะได้รับ */
export function Preview({ draft, step }: { draft: Draft; step: number }) {
  return (
    <div>
      <p className="hand mb-3 text-center text-xl text-[#2d4bc9]">
        {step === 3 ? "บิลที่ผู้เช่าจะได้รับ หน้าตาแบบนี้" : "เปลี่ยนตามที่คุณกรอก"}
      </p>
      {step === 3 ? <BillPreview draft={draft} /> : <BusinessTag draft={draft} />}
    </div>
  );
}

export function BusinessTag({ draft }: { draft: Draft }) {
  const types = BUSINESS_TYPES.filter((t) => draft.business.types.includes(t.key));
  const all = draft.groups.flatMap((g) => unitCodes(g).map((c) => ({ c, g: g.id })));
  const total = all.length;
  const monthly = draft.groups.filter((g) => g.period === "month").reduce((a, g) => a + g.count * g.price, 0);
  const others = draft.groups.filter((g) => g.period !== "month" && g.count > 0 && g.price > 0);

  return (
    <div className="tag-idle">
      <svg aria-hidden className="mx-auto block h-12 w-6 overflow-visible" viewBox="0 0 24 48">
        <path d="M12 0 C 5 16, 19 32, 12 48" fill="none" stroke="#1b1a17" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div className="big-tag relative -mt-2 bg-[#1b1a17] px-6 pt-14 pb-7 text-white">
        <span aria-hidden className="absolute top-5 left-1/2 size-5 -translate-x-1/2 rounded-full bg-brand" />
        <p className={clsx("text-2xl leading-snug font-bold break-words", !draft.business.name && "text-white/30")}>
          {draft.business.name || "ชื่อกิจการของคุณ"}
        </p>
        {types.length > 0 && (
          <p className="mt-2 flex flex-wrap gap-1.5">
            {types.map((t) => (
              <span key={t.key} className="rounded-full bg-white/10 px-2.5 py-0.5 text-sm text-white/80">
                {t.label}
              </span>
            ))}
          </p>
        )}
        {draft.business.name && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-white/60">
            <MapPin className="size-4" />
            {draft.branch.name || "สาขาหลัก"}
          </p>
        )}

        {total > 0 && (
          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="grid grid-cols-5 gap-1">
              {all.slice(0, MAX_TILES).map(({ c }, i) => (
                <span
                  key={c}
                  className="unit-pop truncate rounded-md border-2 border-ok bg-ok-soft px-1 py-1 text-center text-[10px] leading-none font-bold text-ink"
                  style={{ ["--i" as string]: i }}
                >
                  {c}
                </span>
              ))}
            </div>
            {total > MAX_TILES && <p className="mt-1.5 text-xs text-white/50">และอีก {total - MAX_TILES} ช่อง</p>}
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-white/60">ทั้งหมด</dt>
                <dd className="tabular font-semibold">{total} ช่อง · ว่างพร้อมให้เช่า</dd>
              </div>
              {monthly > 0 && (
                <div className="flex justify-between">
                  <dt className="text-white/60">ถ้าเช่าเต็ม</dt>
                  <dd className="tabular font-semibold text-brand">฿{money(monthly)} ต่อเดือน</dd>
                </div>
              )}
              {others.map((g) => (
                <div key={g.id} className="flex justify-between">
                  <dt className="truncate text-white/60">{g.name || "ไม่มีชื่อ"}</dt>
                  <dd className="tabular font-semibold">
                    ฿{money(g.price)} {PERIOD_LABEL[g.period]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

function BillPreview({ draft }: { draft: Draft }) {
  const g = draft.groups[0];
  const code = g ? unitCodes(g, 1)[0] : "A-01";
  const price = g?.price || 0;
  const b = draft.billing;
  const day = typeof b.billDay === "number" ? b.billDay : 15;
  return (
    <div className="rotate-1 rounded-sm bg-white px-6 pt-6 pb-7 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.45)] [mask:radial-gradient(circle_7px_at_50%_100%,transparent_96%,#000)_bottom/18px_100%_repeat-x]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg leading-tight font-bold">{draft.business.name || "ชื่อกิจการ"}</p>
          <p className="text-xs text-muted">
            {draft.branch.name}
            {draft.business.phone && ` · โทร ${draft.business.phone}`}
          </p>
        </div>
        <span className="rounded-md bg-brand px-2 py-1 text-xs font-bold">ใบวางบิล</span>
      </div>
      <div className="mt-5 flex justify-between text-sm">
        <span className="text-muted">ผู้เช่า</span>
        <span>คุณสมชาย · {code}</span>
      </div>
      <div className="mt-1 flex justify-between text-sm">
        <span className="text-muted">ออกบิล</span>
        <span>{day} ม.ค. 70</span>
      </div>
      <div className="mt-1 flex justify-between text-sm">
        <span className="text-muted">จ่ายภายใน</span>
        <span className="font-semibold">
          {Math.min(day + b.dueDays, 31)} ม.ค. 70
        </span>
      </div>
      <div className="mt-4 border-t border-dashed border-line pt-3">
        <div className="flex justify-between text-sm">
          <span>
            ค่าเช่า {g?.name || ""} {PERIOD_LABEL[g?.period ?? "month"]}
          </span>
          <span className="tabular">{money(price)}</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="font-semibold">รวม</span>
          <span className="tabular text-2xl font-bold">฿{money(price)}</span>
        </div>
      </div>
      {(b.promptpay || b.bankAccount) && (
        <div className="mt-4 rounded-xl bg-canvas px-3 py-2.5 text-sm">
          <p className="font-semibold">โอนเงินได้ที่</p>
          {b.promptpay && <p>พร้อมเพย์ {b.promptpay}</p>}
          {b.bankAccount && (
            <p>
              {b.bank || "ธนาคาร"} {b.bankAccount}
            </p>
          )}
        </div>
      )}
      {b.depositMonths > 0 && (
        <p className="mt-3 text-xs text-muted">
          ตอนทำสัญญาเก็บเงินประกัน {b.depositMonths} เดือน (฿{money(price * b.depositMonths)}) แยกจากรายได้
        </p>
      )}
    </div>
  );
}
