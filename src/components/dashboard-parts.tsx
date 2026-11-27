/**
 * ชิ้นส่วนหน้าภาพรวมธุรกิจ (ใช้ในหน้าภาพรวมจริง และตัวอย่างในหน้าแนะนำ Kepz)
 * ไม่มีโค้ดฝั่งเซิร์ฟเวอร์ ส่งข้อมูลเข้ามาเป็น props
 */
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui";
import { money, thMonth } from "@/lib/format";

export type Mix = { total: number; occupied: number; available: number; maintenance: number };

/** แถบสัดส่วนห้อง: มีผู้เช่า (ดำ) · ว่าง (เขียว) · ปิดปรับปรุง (เทา) สีเดียวกับผังสถานที่ */
export function MixBar({ mix, className }: { mix: Mix; className?: string }) {
  const seg = (n: number) => (mix.total ? `${(n / mix.total) * 100}%` : "0%");
  return (
    <div
      className={clsx("flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-line", className)}
      role="img"
      aria-label={`มีผู้เช่า ${mix.occupied} ว่าง ${mix.available} ปิดปรับปรุง ${mix.maintenance}`}
    >
      {mix.occupied > 0 && <span className="bg-ink" style={{ width: seg(mix.occupied) }} />}
      {mix.available > 0 && <span className="bg-ok/70" style={{ width: seg(mix.available) }} />}
      {mix.maintenance > 0 && <span className="bg-muted/40" style={{ width: seg(mix.maintenance) }} />}
    </div>
  );
}

export function MixLegend({ className }: { className?: string }) {
  return (
    <div className={clsx("flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted", className)}>
      {(
        [
          ["bg-ink", "มีผู้เช่า"],
          ["bg-ok/70", "ว่าง"],
          ["bg-muted/40", "ปิดปรับปรุง"],
        ] as const
      ).map(([c, l]) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          <span className={clsx("size-2.5 rounded-full", c)} /> {l}
        </span>
      ))}
    </div>
  );
}

/** ตัวเลขย่อบนกราฟ เช่น 2,700 → 2.7k */
function short(n: number) {
  if (n < 1000) return Math.round(n).toLocaleString("th-TH");
  const k = n / 1000;
  return `${k >= 100 ? Math.round(k) : +k.toFixed(1)}k`;
}

/** กราฟรายรับ 6 เดือน (ไม่รวมเงินประกัน) */
export function RevenueChart({ months, revenue, current }: { months: string[]; revenue: Map<string, number>; current: string }) {
  const max = Math.max(1, ...revenue.values());
  return (
    <div className="grid h-24 grid-cols-6 gap-2 sm:h-32 sm:gap-3" role="img" aria-label="รายรับย้อนหลัง 6 เดือน">
      {months.map((m) => {
        const v = revenue.get(m) ?? 0;
        const pct = v > 0 ? Math.max(6, (v / max) * 78) : 0;
        const cur = m === current;
        return (
          <div key={m} className="flex min-w-0 flex-col items-center gap-1.5" title={`${thMonth(m)}: ${money(v)} บาท`}>
            <div className="relative w-full flex-1">
              <span
                className={clsx(
                  "tabular absolute inset-x-0 text-center text-[11px] font-semibold",
                  cur ? "text-brand" : "text-white/60",
                )}
                style={{ bottom: `calc(${pct}% + 4px)` }}
              >
                {v > 0 ? short(v) : "–"}
              </span>
              <div
                className={clsx("absolute inset-x-0 bottom-0 rounded-t-md sm:inset-x-1", cur ? "bg-brand" : "bg-white/15")}
                style={{ height: pct ? `${pct}%` : "2px" }}
              />
            </div>
            <span className={clsx("text-[11px] whitespace-nowrap", cur ? "font-semibold text-white" : "text-white/50")}>
              {thMonth(m)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export type Tone = "neutral" | "ok" | "warn" | "bad" | "brand";

const ICON_TONE: Record<Tone, string> = {
  neutral: "bg-canvas text-ink-2",
  ok: "bg-ok-soft text-ok",
  warn: "bg-warn-soft text-warn",
  bad: "bg-bad-soft text-bad",
  brand: "bg-brand text-ink",
};

export function Kpi({
  label,
  icon,
  tone = "neutral",
  href,
  value,
  children,
  className,
}: {
  label: string;
  icon: ReactNode;
  tone?: Tone;
  href: string;
  value: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx("card group flex flex-col p-4 transition hover:border-ink/25 hover:shadow-sm sm:p-5", className)}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted sm:text-sm">{label}</span>
        <span className={clsx("grid size-8 shrink-0 place-items-center rounded-lg", ICON_TONE[tone])}>{icon}</span>
      </div>
      <div className="tabular mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{value}</div>
      {children}
    </Link>
  );
}

export type TaskRow = {
  key: string;
  href: string;
  code: string;
  title: string;
  sub: string;
  amount?: string;
  pill: string;
  tone: "bad" | "warn" | "brand";
};

const PILL_TONE: Record<TaskRow["tone"], string> = {
  bad: "bg-bad-soft text-bad",
  warn: "bg-warn-soft text-warn",
  brand: "bg-brand text-ink",
};

export type TaskProps = {
  title: string;
  icon: ReactNode;
  tone: Tone;
  count: number;
  href: string;
  empty: string;
  rows: TaskRow[];
};

export function TaskCard({ title, icon, tone, count, href, rows, className }: TaskProps & { className?: string }) {
  return (
    <Card className={clsx("flex flex-col overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
        <span className={clsx("grid size-9 shrink-0 place-items-center rounded-xl", ICON_TONE[tone])}>{icon}</span>
        <h3 className="min-w-0 flex-1 truncate font-semibold">{title}</h3>
        <Link href={href} className="btn btn-outline btn-sm shrink-0">
          ดูทั้งหมด {count}
        </Link>
      </div>
      <ul className="divide-y divide-line">
          {rows.map((r) => (
            <li key={r.key}>
              <Link href={r.href} className="flex items-center gap-3 px-4 py-3 transition hover:bg-canvas/60 sm:px-5">
                <span className="grid h-10 w-[4.75rem] shrink-0 place-items-center rounded-xl bg-canvas px-1.5 text-xs font-bold">
                  <span className="truncate">{r.code}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{r.title}</div>
                  <div className="truncate text-xs text-muted">{r.sub}</div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {r.amount && (
                    <span className={clsx("tabular text-sm font-semibold", r.tone === "bad" && "text-bad")}>{r.amount}</span>
                  )}
                  <span className={clsx("rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", PILL_TONE[r.tone])}>
                    {r.pill}
                  </span>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted" />
              </Link>
            </li>
          ))}
      </ul>
    </Card>
  );
}
