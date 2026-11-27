"use client";

import clsx from "clsx";
import { AlertTriangle, BadgeCheck, CalendarClock, DoorOpen, Palette, ReceiptText, Warehouse } from "lucide-react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BillDuePanel, ItemsTable, PaidStamp, PartyBoxes, PaymentInfoBox, PayToBox, TotalsBox } from "@/components/bill-parts";
import { Kpi, MixBar, RevenueChart, TaskCard } from "@/components/dashboard-parts";
import { gridBackground, labelStyle, TILE_CLASS, type TileState } from "@/components/floor-plan/shared";
import { FloorPlanLegend, OverdueBadge, PendingBadge, PlanObjectBox } from "@/components/floor-plan/viewer";
import { BrandHeader, toneStyle, type DocTone } from "@/components/print-kit";
import { baht, money, thDateLong } from "@/lib/format";
import type { InvoiceItem, InvoiceView, PlanColor, Tenant } from "@/lib/types";
import { PrintToolbar } from "../print/print-toolbar";

/*
 * ตัวอย่างหน้าจอจริงของ Kepz สำหรับหน้าแนะนำ
 * ใช้ชิ้นส่วนเดียวกับในแอปจริง (เอกสารใบวางบิล/ใบเสร็จ ผังสถานที่ หน้าภาพรวม) ใส่ข้อมูลสมมติ
 * แอปปรับหน้าตาเมื่อไร ตัวอย่างตรงนี้เปลี่ยนตามเอง
 */

/**
 * ย่อเนื้อหาที่ออกแบบไว้กว้าง `width` px ให้พอดีกรอบ (ไม่ขยายเกินขนาดจริง)
 * จอแคบไม่ย่อเกิน 50% (ตัวหนังสือยังอ่านได้) แล้ววางกึ่งกลาง ขอบซ้ายขวาที่เกินถูกตัดออก
 */
function Fit({ width, children }: { width: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox(el.clientWidth));
    ro.observe(el);
    setBox(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const scale = box ? Math.max(0.5, Math.min(1, box / width)) : 0;
  const shift = box ? (box - width * scale) / 2 : 0;
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div style={{ width, transform: `translateX(${shift}px) scale(${scale})`, transformOrigin: "top left", opacity: box ? 1 : 0 }}>
        {children}
      </div>
      {/* ขอบล่างจางลง บอกว่าหน้ายังยาวต่อ */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  );
}

/* ===== ข้อมูลสมมติ (หอพักตัวอย่าง) ===== */

const BUSINESS = {
  name: "หอพักบ้านสวน",
  address: "99/9 ถนนตัวอย่าง แขวงตัวอย่าง\nเขตตัวอย่าง กรุงเทพฯ 10000",
  phone: "02-000-0000",
  email: null,
  tax_id: null,
};
const TENANT = { full_name: "คุณสมชาย ใจดี", address: null, phone: "081-000-0000", id_number: null, tenant_type: "person" } as unknown as Tenant;
const INV = {
  unit_code: "203",
  branch_name: "ตึก A",
  contract_no: "CT-2569-0012",
  period_start: "2026-12-01",
  period_end: "2026-12-31",
} as unknown as InvoiceView;
const ITEMS = [
  { id: "1", description: "ค่าเช่าห้อง 203 เดือน ธ.ค. 2569", quantity: 1, unit_price: 4500, amount: 4500, item_type: "rent" },
  { id: "2", description: "ค่าน้ำประปา", quantity: 1, unit_price: 150, amount: 150, item_type: "other" },
  { id: "3", description: "ค่าไฟฟ้า 114 หน่วย", quantity: 114, unit_price: 8, amount: 912, item_type: "other" },
] as unknown as InvoiceItem[];
const TOTAL = 5562;

/** กระดาษ A4 แบบหน้าเอกสารจริง (หน้า /print) */
function Paper({ tone, title, children }: { tone: DocTone; title: string; children: ReactNode }) {
  return (
    <div className="bg-canvas pb-6">
      <PrintToolbar title={title} />
      <article style={toneStyle(tone)} className="mx-auto mt-4 w-[794px] bg-white p-[53px] text-[14.5px] leading-relaxed text-ink shadow-sm">
        {children}
      </article>
    </div>
  );
}

/** ใบวางบิลจริง: ออกให้ทุกเดือน แค่ส่งให้ผู้เช่าต่อ */
export function BillScreen() {
  return (
    <Fit width={842}>
      <Paper tone="bill" title="ใบวางบิล INV-2569-12-0203">
        <BrandHeader
          business={BUSINESS}
          badge="BILLING NOTE"
          title="ใบวางบิล"
          meta={[
            { label: "เลขที่", value: "INV-2569-12-0203" },
            { label: "วันที่ออก", value: thDateLong("2026-11-25") },
          ]}
        />
        <BillDuePanel label="ยอดที่ต้องชำระ" amount={TOTAL} dueDate="2026-12-05" settled={false} />
        <PartyBoxes partyTitle="ลูกค้า" tenant={TENANT} inv={INV} />
        <ItemsTable items={ITEMS} />
        <div className="mt-6">
          <PayToBox text={"ธนาคารตัวอย่าง 000-0-00000-0\nชื่อบัญชี หอพักบ้านสวน"} />
        </div>
      </Paper>
    </Fit>
  );
}

/** ใบเสร็จจริง: กดรับเงินแล้วได้ทันที */
export function ReceiptScreen() {
  return (
    <Fit width={842}>
      <Paper tone="receipt" title="ใบเสร็จ RC-2569-12-0041">
        <BrandHeader
          business={BUSINESS}
          badge="RECEIPT"
          title="ใบเสร็จรับเงิน"
          meta={[
            { label: "เลขที่", value: "RC-2569-12-0041" },
            { label: "วันที่รับเงิน", value: thDateLong("2026-12-03") },
            { label: "อ้างอิงใบวางบิล", value: "INV-2569-12-0203" },
          ]}
        />
        <PartyBoxes partyTitle="ได้รับเงินจาก" tenant={TENANT} inv={INV} />
        <ItemsTable items={ITEMS} title="รายการตามใบวางบิล INV-2569-12-0203" detailed={false} />
        <div className="mt-6 flex items-start justify-between gap-10">
          <div className="min-w-0 flex-1">
            <PaymentInfoBox>
              <div>
                ชำระโดย <b>โอนเงิน / พร้อมเพย์</b>
              </div>
            </PaymentInfoBox>
            <PaidStamp className="mt-4 ml-3" />
          </div>
          <TotalsBox rows={[]} totalLabel="รับชำระ" total={TOTAL} />
        </div>
      </Paper>
    </Fit>
  );
}

/* ===== ผังห้องพัก (หน้าผังสถานที่จริง โหมดดูสถานะเช่า) ===== */

type Room = { code: string; state: TileState; who?: string; pending?: boolean; x: number; y: number };
const ROOMS: Room[] = [
  { code: "201", state: "occupied", who: "คุณเอ", x: 1, y: 1 },
  { code: "202", state: "available", x: 4, y: 1 },
  { code: "203", state: "occupied", who: "คุณสมชาย", pending: true, x: 7, y: 1 },
  { code: "204", state: "expiring", who: "คุณบี", x: 10, y: 1 },
  { code: "205", state: "overdue", who: "คุณซี", x: 13, y: 1 },
  { code: "206", state: "occupied", who: "คุณดี", x: 16, y: 1 },
  { code: "207", state: "available", x: 1, y: 6 },
  { code: "208", state: "maintenance", x: 4, y: 6 },
  { code: "209", state: "occupied", who: "คุณอี", x: 7, y: 6 },
  { code: "210", state: "available", x: 10, y: 6 },
];
const OBJECTS: { label: string; color: PlanColor; x: number; y: number; w: number; h: number }[] = [
  { label: "ทางเดิน", color: "none", x: 1, y: 4, w: 18, h: 2 },
  { label: "บันได", color: "gray", x: 13, y: 6, w: 3, h: 3 },
  { label: "ลิฟต์", color: "gray", x: 16, y: 6, w: 3, h: 3 },
];
const CELL = 30;

export function PlanScreen() {
  return (
    <Fit width={720}>
      <div className="bg-canvas px-5 pt-4 pb-5 text-ink">
        <h3 className="text-xl font-bold tracking-tight">หอพักบ้านสวน ชั้น 2</h3>
        <div className="mt-3 mb-2 inline-grid grid-cols-2 rounded-xl bg-line/50 p-1">
          <span className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted">
            <Palette className="size-4" /> ผังปกติ
          </span>
          <span className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white shadow-sm">
            <BadgeCheck className="size-4" /> ดูสถานะเช่า
          </span>
        </div>
        <FloorPlanLegend className="mb-2" />
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="relative" style={{ width: 20 * CELL, height: 9.5 * CELL, ...gridBackground(CELL) }}>
            {OBJECTS.map((o) => (
              <PlanObjectBox key={o.label} o={{ ...o, shape: "rect" }} cell={CELL} />
            ))}
            {ROOMS.map((r) => (
              <span
                key={r.code}
                className={clsx(
                  "seq-pop absolute flex flex-col items-center justify-center rounded-md border-2 text-center leading-snug",
                  TILE_CLASS[r.state],
                  r.pending && "ring-[3px] ring-[#f97316] ring-offset-1",
                )}
                style={{ left: r.x * CELL + 1, top: r.y * CELL + 1, width: 3 * CELL - 2, height: 3 * CELL - 2, ["--i" as string]: Number(r.code) % 100 }}
              >
                <span className="max-w-full px-0.5 font-bold" style={labelStyle(15, 3 * CELL - 2, r.who ? 16 : 0)}>
                  {r.code}
                </span>
                {r.who && <span className="w-full truncate px-1 text-xs">{r.who}</span>}
                {r.pending && <PendingBadge size={22} className="absolute -top-1.5 -right-1.5" />}
                {r.state === "overdue" && <OverdueBadge size={22} className="absolute -top-1.5 -right-1.5" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Fit>
  );
}

/* ===== หน้าภาพรวมธุรกิจ (สรุปรายได้ทุกเดือน) ===== */

const MONTHS = ["2026-07", "2026-08", "2026-09", "2026-10", "2026-11", "2026-12"];
const REVENUE = new Map([
  ["2026-07", 41200],
  ["2026-08", 43800],
  ["2026-09", 42500],
  ["2026-10", 46100],
  ["2026-11", 47300],
  ["2026-12", 48600],
]);

export function DashboardScreen() {
  return (
    <Fit width={760}>
      <div className="bg-canvas p-5 text-ink">
        <p className="text-sm text-muted">{thDateLong("2026-12-31")}</p>
        <h3 className="mb-4 text-2xl font-bold tracking-tight">ภาพรวมธุรกิจ</h3>
        <section className="mb-3 overflow-hidden rounded-card bg-ink text-white">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-end gap-8 p-5">
            <div>
              <div className="text-sm text-white/60">รายรับเดือน ธ.ค. 2569</div>
              <div className="tabular mt-1 text-4xl font-bold tracking-tight">{baht(57600)}</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-brand px-3.5 py-2.5 text-ink">
                  <div className="text-xs font-medium text-ink/70">ค่าเช่า</div>
                  <div className="tabular text-xl font-bold">{baht(48600)}</div>
                </div>
                <div className="rounded-xl bg-white/10 px-3.5 py-2.5">
                  <div className="text-xs font-medium text-white/60">เงินประกัน</div>
                  <div className="tabular text-xl font-bold">{baht(9000)}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs text-white/40">ค่าเช่า 6 เดือนล่าสุด</div>
              <RevenueChart months={MONTHS} revenue={REVENUE} current="2026-12" />
            </div>
          </div>
        </section>
        <div className="mb-5 grid grid-cols-3 gap-3">
          <Kpi label="อัตราการเช่า" icon={<Warehouse className="size-4" />} href="#" value="70%">
            <MixBar mix={{ total: 10, occupied: 7, available: 2, maintenance: 1 }} className="mt-2.5" />
            <p className="mt-1.5 text-xs text-muted">มีผู้เช่า 7 จาก 10 ห้อง</p>
          </Kpi>
          <Kpi label="ห้องว่าง" icon={<DoorOpen className="size-4" />} tone="ok" href="#" value={2}>
            <p className="mt-1 text-xs text-muted">พร้อมให้เช่า · ปิดปรับปรุง 1</p>
          </Kpi>
          <Kpi label="ยอดรอรับชำระ" icon={<ReceiptText className="size-4" />} tone="bad" href="#" value={baht(10124)}>
            <p className="mt-1 text-xs text-muted">2 ใบที่ยังไม่ได้รับเงิน</p>
            <p className="mt-0.5 text-xs font-semibold text-bad">เกินกำหนด {baht(4562)}</p>
          </Kpi>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TaskCard
            title="ค้างชำระเกินกำหนด"
            icon={<AlertTriangle className="size-4" />}
            tone="bad"
            count={1}
            href="#"
            empty=""
            rows={[{ key: "a", href: "#", code: "205", title: "คุณซี", sub: "INV-2569-11-0205", amount: money(4562), pill: "เกิน 12 วัน", tone: "bad" }]}
          />
          <TaskCard
            title="สัญญาใกล้หมด"
            icon={<CalendarClock className="size-4" />}
            tone="warn"
            count={1}
            href="#"
            empty=""
            rows={[{ key: "b", href: "#", code: "204", title: "คุณบี", sub: "สิ้นสุด 31 ม.ค. 2570", pill: "อีก 31 วัน", tone: "warn" }]}
          />
        </div>
      </div>
    </Fit>
  );
}
