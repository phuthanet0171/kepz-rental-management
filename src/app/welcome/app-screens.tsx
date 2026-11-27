"use client";

import clsx from "clsx";
import {
  Check,
  Download,
  LayoutDashboard,
  Menu,
  ReceiptText,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

/* ===== จอมือถือ: เลียนแบบหน้าจอจริงของ Kepz ===== */

const NAV: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "home", label: "ภาพรวม", icon: LayoutDashboard },
  { key: "units", label: "ห้องและที่จอด", icon: Warehouse },
  { key: "tenants", label: "ผู้เช่า", icon: Users },
  { key: "bills", label: "ใบวางบิล", icon: ReceiptText },
  { key: "menu", label: "เมนู", icon: Menu },
];
const NAV_FOR: Record<Screen, string> = { bills: "bills", paid: "bills", map: "units", night: "home" };

export type Screen = "bills" | "paid" | "map" | "night";

/** จอมือถือพร้อมหัวแอปและเมนูล่างแบบของจริง */
export function Phone({ screen, time, on }: { screen: Screen; time: string; on: boolean }) {
  const navActive = NAV_FOR[screen];
  return (
    <div className="mx-auto w-[300px] max-w-full rounded-[2.6rem] bg-[#1b1a17] p-2.5 shadow-[0_40px_80px_-34px_rgb(0_0_0/0.55)] lg:mx-0">
      <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[2.1rem] bg-canvas font-sans text-ink">
        {/* แถบสถานะ: เวลาตรงกับช่วงของเรื่อง */}
        <div className="flex h-7 shrink-0 items-center justify-between bg-ink px-6 text-[11px] font-semibold text-white">
          <span className="tabular">{time}</span>
          <span className="h-4 w-16 rounded-full bg-black" />
          <span className="flex gap-0.5">
            <i className="h-2 w-1 rounded-sm bg-white" />
            <i className="h-2.5 w-1 rounded-sm bg-white" />
            <i className="h-3 w-1 rounded-sm bg-white" />
          </span>
        </div>
        {/* หัวแอปจริง: ดำ ขอบล่างเหลือง */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b-[3px] border-brand bg-ink px-3.5">
          <span className="text-xl font-bold tracking-tight text-white">
            kepz<span className="text-brand">.</span>
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-brand text-xs font-bold">ส</span>
        </div>

        <div data-on={on || undefined} className="scr relative min-h-0 flex-1 overflow-hidden px-3 pt-3">
          {screen === "bills" && <BillsScreen />}
          {screen === "paid" && <PaidScreen />}
          {screen === "map" && <MapScreen />}
          {screen === "night" && <NightScreen />}
        </div>

        {/* เมนูล่างจริง */}
        <nav className="grid shrink-0 grid-cols-5 bg-ink pt-1.5 pb-2.5">
          {NAV.map(({ key, label, icon: Icon }) => {
            const act = key === navActive;
            return (
              <span
                key={key}
                className={clsx(
                  "flex flex-col items-center gap-0.5 text-[8.5px] whitespace-nowrap",
                  act ? "text-brand" : "text-white/60",
                )}
              >
                <span className={clsx("grid h-6 w-10 place-items-center rounded-full", act && "bg-brand text-ink")}>
                  <Icon className="size-4" strokeWidth={act ? 2.25 : 1.75} />
                </span>
                {label}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function seq(i: number): CSSProperties {
  return { ["--i" as string]: i };
}

function Card({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={clsx("rounded-2xl border border-line bg-surface", className)} style={style}>
      {children}
    </div>
  );
}

function Tick({ i }: { i: number }) {
  return (
    <span className="tick grid size-[18px] shrink-0 place-items-center rounded-[5px] border-2 border-ink/30" style={seq(i)}>
      <Check className="size-3 text-white" strokeWidth={3.5} />
    </span>
  );
}

function BillsScreen() {
  const rows = [
    ["S-02", "สมชาย ใจดี", "1,600.00"],
    ["S-05", "ร้านป้าแดง", "1,600.00"],
    ["M-01", "บจก. ทวีทรัพย์", "1,700.00"],
    ["P-03", "คุณนิด", "990.00"],
    ["A12", "แผงผลไม้ลุงชัย", "250.00"],
  ];
  return (
    <>
      <div className="text-lg leading-tight font-bold">ใบวางบิล</div>
      <div className="text-[11px] text-muted">ถึงรอบออกบิล 12 รายการ</div>
      <Card className="mt-2.5 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-3 py-2 text-[11px]">
          <span className="flex items-center gap-2 font-medium">
            <Tick i={0} /> เลือกทั้งหมด
          </span>
          <span className="text-[10px] text-muted">วันที่ 1 ธ.ค. 69</span>
        </div>
        <ul className="divide-y divide-line">
          {rows.map(([code, name, amt], i) => (
            <li key={code} className="flex items-start gap-2 px-3 py-2">
              <span className="mt-0.5">
                <Tick i={i + 1} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[12px]">
                  <b>{code}</b>
                  <span className="truncate text-muted">{name}</span>
                </span>
                <span className="block text-[9.5px] text-muted">รอบ 1–31 ธ.ค. · รายเดือน</span>
              </span>
              <span className="tabular text-[12px] font-semibold">{amt}</span>
            </li>
          ))}
        </ul>
      </Card>
      {/* แถบล่างที่โผล่มาหลังเลือก */}
      <div className="rise absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-line bg-surface px-3 py-2.5 shadow-[0_-8px_20px_-12px_rgba(0,0,0,0.25)]" style={seq(7)}>
        <span className="text-[11px]">
          เลือก <b>12</b> รายการ · <b className="tabular">18,450</b> บาท
        </span>
        <span className="rounded-lg bg-ink px-2.5 py-1.5 text-[11px] font-semibold text-white">ออกบิลที่เลือก</span>
      </div>
    </>
  );
}

function PaidScreen() {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-[15px] leading-tight font-bold">INV-2569-0142</span>
        <span className="rounded-full bg-ok-soft px-2 py-0.5 text-[10px] font-medium text-ok ring-1 ring-ok/20 ring-inset">
          ชำระแล้ว
        </span>
      </div>
      <div className="text-[11px] text-muted">S-02 · สมชาย ใจดี</div>
      <Card className="mt-2.5 grid grid-cols-2 divide-x divide-line">
        <div className="px-3 py-2">
          <div className="text-[10px] text-muted">ยอดค้าง</div>
          <div className="tabular text-[15px] font-bold">0.00 บาท</div>
        </div>
        <div className="px-3 py-2">
          <div className="text-[10px] text-muted">ครบกำหนด</div>
          <div className="text-[13px] font-semibold">5 ธ.ค. 69</div>
        </div>
      </Card>
      <Card className="mt-2.5 overflow-hidden">
        <ul className="divide-y divide-line text-[11.5px]">
          <li className="hl flex justify-between px-3 py-2" style={seq(1)}>
            <span>
              <span className="font-medium">ค่าเช่า ธ.ค. 69</span>
              <span className="block text-[9.5px] text-muted">นับเป็นรายได้</span>
            </span>
            <span className="tabular font-medium">1,600.00</span>
          </li>
          <li className="hl flex justify-between px-3 py-2" style={seq(2)}>
            <span>
              <span className="font-medium">เงินประกัน 2 เดือน</span>
              <span className="block text-[9.5px] text-muted">คืนผู้เช่าเมื่อย้ายออก</span>
            </span>
            <span className="tabular font-medium">3,200.00</span>
          </li>
        </ul>
        <div className="space-y-1 border-t border-line bg-canvas/60 px-3 py-2 text-[11.5px]">
          <div className="flex justify-between font-bold">
            <span>รวม</span>
            <span className="tabular">4,800.00</span>
          </div>
          <div className="flex justify-between text-ok">
            <span>รับชำระแล้ว · โอนเงิน</span>
            <span className="tabular">4,800.00</span>
          </div>
        </div>
      </Card>
      <Card className="pop mt-2.5 flex items-center gap-2.5 px-3 py-2.5" style={seq(4)}>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ok text-white">
          <Check className="size-4" strokeWidth={3} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-semibold">ใบเสร็จ RC2569-0031</span>
          <span className="block text-[10px] text-muted">พร้อมส่งให้ลูกค้า</span>
        </span>
        <span className="flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-[10px] font-semibold">
          <Download className="size-3" /> PDF
        </span>
      </Card>
    </>
  );
}

function MapScreen() {
  // a = ว่าง, k = มีผู้เช่า, y = ใกล้หมดสัญญา, r = ค้างชำระ
  const units: [string, string, string][] = [
    ["A1", "k", "สมชาย"], ["A2", "k", "ป้าแดง"], ["A3", "y", "คุณนิด"], ["A4", "a", ""],
    ["A5", "k", "ทวีทรัพย์"], ["A6", "r", "ลุงชัย"], ["A7", "a", ""], ["A8", "k", "มานี"],
    ["A9", "k", "สุดา"], ["A10", "a", ""], ["A11", "k", "วิชัย"], ["A12", "y", "ก้อย"],
    ["A13", "k", "เอก"], ["A14", "a", ""], ["A15", "k", "ปู"], ["A16", "a", ""],
  ];
  const cls: Record<string, string> = {
    a: "border-ok bg-ok-soft",
    k: "border-ink bg-ink text-white",
    y: "border-brand-strong bg-brand",
    r: "border-bad bg-bad text-white",
  };
  return (
    <>
      <div className="text-lg leading-tight font-bold">ห้องและที่จอด</div>
      <div className="mt-2 flex rounded-xl bg-line/70 p-0.5 text-[10.5px] font-semibold">
        <span className="flex-1 py-1 text-center text-muted">ผังปกติ</span>
        <span className="flex-1 rounded-lg bg-surface py-1 text-center shadow-sm">ดูสถานะเช่า</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1 text-[9.5px] text-muted">
        <span className="flex items-center gap-1"><i className="size-2.5 rounded-sm border-2 border-ok bg-ok-soft" />ว่าง</span>
        <span className="flex items-center gap-1"><i className="size-2.5 rounded-sm border-2 border-ink bg-ink" />มีผู้เช่า</span>
        <span className="flex items-center gap-1"><i className="size-2.5 rounded-sm border-2 border-brand-strong bg-brand" />ใกล้หมดสัญญา</span>
        <span className="flex items-center gap-1"><i className="size-2.5 rounded-sm bg-bad" />ค้างชำระ</span>
      </div>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {units.map(([code, s, name], i) => (
          <span
            key={code}
            className={clsx(
              "tile relative flex h-[50px] flex-col justify-between rounded-lg border-2 px-1.5 py-1",
              cls[s],
              code === "A4" && "pick",
            )}
            style={seq(i)}
          >
            {s === "r" && (
              <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded bg-bad text-[9px] font-black text-white ring-2 ring-canvas">
                !
              </span>
            )}
            <b className="text-[11px] leading-none">{code}</b>
            <span className={clsx("truncate text-[8.5px] leading-none", s === "a" && "text-ok")}>{s === "a" ? "ว่าง" : name}</span>
          </span>
        ))}
      </div>
      {/* แผ่นข้อมูลที่เลื่อนขึ้นเมื่อแตะช่องว่าง */}
      <div className="rise absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-line bg-surface px-3.5 pt-2 pb-3 shadow-[0_-10px_24px_-14px_rgba(0,0,0,0.35)]" style={seq(18)}>
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-line" />
        <div className="flex items-center justify-between">
          <span>
            <b className="text-[14px]">A4</b>
            <span className="ml-1.5 rounded-full bg-ok-soft px-1.5 py-0.5 text-[9.5px] font-medium text-ok">ว่าง</span>
            <span className="block text-[10px] text-muted">ห้องเก็บของ 3×4 ม. · ฿1,600/เดือน</span>
          </span>
          <span className="rounded-lg bg-ink px-2.5 py-1.5 text-[10.5px] font-semibold text-white">ทำสัญญาเช่า</span>
        </div>
      </div>
    </>
  );
}

function NightScreen() {
  const bars = [52, 61, 58, 70, 66, 83];
  return (
    <>
      <div className="text-lg leading-tight font-bold">ภาพรวม</div>
      <div className="mt-2.5 rounded-2xl bg-ink p-3.5 text-white">
        <div className="text-[10.5px] text-white/60">รายรับเดือน ธันวาคม 2569</div>
        <div className="tabular text-[26px] leading-tight font-bold">฿48,600</div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <div className="hl-dark rounded-xl bg-brand p-2 text-ink" style={seq(1)}>
            <div className="text-[9.5px] font-medium text-ink/70">ค่าเช่า</div>
            <div className="tabular text-[14px] font-bold">฿41,400</div>
          </div>
          <div className="rounded-xl bg-white/10 p-2">
            <div className="text-[9.5px] font-medium text-white/60">เงินประกัน</div>
            <div className="tabular text-[14px] font-bold">฿7,200</div>
          </div>
        </div>
        <div className="mt-3 mb-1 text-[9px] text-white/40">ค่าเช่า 6 เดือนล่าสุด</div>
        <div className="flex h-14 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className={clsx("bar flex-1 rounded-t", i === bars.length - 1 ? "bg-brand" : "bg-white/25")}
              style={{ ...seq(i), height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <Card className="mt-2.5 p-3">
        <div className="text-[11px] font-semibold">อัตราการเช่าแต่ละสาขา</div>
        {[
          ["สาขาบางนา", 18, 21],
          ["สาขาลาดพร้าว", 9, 14],
        ].map(([name, used, all]) => (
          <div key={name} className="mt-2">
            <div className="flex justify-between text-[10.5px]">
              <span>{name}</span>
              <span className="tabular text-muted">
                {used}/{all}
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-ink" style={{ width: `${(Number(used) / Number(all)) * 100}%` }} />
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}
